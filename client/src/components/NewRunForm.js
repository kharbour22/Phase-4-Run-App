import { forwardRef, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"


function NewRunForm(){

    const [formData, setFormData] = useState({
        location: "",
        image: "",
        link:""
    })

    const {addRun} = useOutletContext()
    const navigate = useNavigate()

    function updateFormData(event){
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()
        addRun(formData)
        navigate('/')
       
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add a new run!</h2>
            <input onChange = {updateFormData} type="text" name="location" placeholder="Run location" value={formData.location}/>
            <input onChange = {updateFormData} type="text" name="image" placeholder="Add Image" value= {formData.image}/>
            <input onChange = {updateFormData} type="text" name="link" placeholder="URL Link" value = {formData.link}/>
            <input type= "submit" value="Add Run"/>
        </form>
    )

}
export default NewRunForm