import {useState} from 'react';

import { useOutletContext } from 'react-router-dom';

function RegisterForm(){

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: ""
    })

    const {registerUser} = useOutletContext()

    function updateFormData(event){
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    function handleSubmit(event){
        event.preventDefault()

        registerUser(formData)
    }

    return (
        <div className="new-run-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <input onChange={updateFormData} type="text" name="username" placeholder="Username" value={formData.username} required />
            <input onChange={updateFormData} type="password" name="password" placeholder="Password" value={formData.password} required />
            <input onChange={updateFormData} type="text" name="first_name" placeholder="First Name" value={formData.first_name} required />
            <input onChange={updateFormData} type="text" name="last_name" placeholder="Last Name" value={formData.last_name} required />
            <button type="submit">Register</button>
        </form>
    </div>
    )
}

export default RegisterForm;