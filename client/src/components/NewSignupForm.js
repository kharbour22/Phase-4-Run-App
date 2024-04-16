import { forwardRef, useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"


function NewSignupForm(){
    

    const [formData, setFormData] = useState({
        date: "",
    
    })

    const {runs, addSignup} = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if(runs.length > 0 ){
            setFormData({...formData, run_id: runs[0].id})
        }
    }, [runs])

    const optionsElements = runs.map(run => {
        return <option key = {run.id} value={run.id}>{run.id}: {run.location}</option>
    })

    function updateFormData(event){
        if(event.target.name === 'date' || event.target.name == "run_id"){
            setFormData({...formData, [event.target.name]: Number(event.target.value)})
        }
        else{
            setFormData({...formData, [event.target.name]: event.target.value})
        }
    }

    function handleSubmit(event){
        event.preventDefault()
        addSignup(formData)
        navigate('/signups_list')
       
    }

    

return (
    <>
        {runs.length > 0 ? (
            <form onSubmit={handleSubmit}>
                <h2>Add New Signup</h2>
                <select onChange={updateFormData} name="run_id">
                    {optionsElements}
                </select>
                <input onChange={updateFormData} type="datetime-local" name="date" placeholder="Start Time" value={formData.date ? formData.date : ''} />
                <input type="submit" value="Add Run" />
            </form>
        ) : (
            <h2>There are no runs to signup for.</h2>
        )}
    </>
);


}
export default NewSignupForm