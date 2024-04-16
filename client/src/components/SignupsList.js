import { useOutletContext } from "react-router-dom";
import Signup from './Signup'

function SignupsList(){
    const{signups} = useOutletContext()

    const signupComponents = signups.map(signup => {
        return <Signup key = {signup.id} signup = {signup}/>
    })

    return <ul>{signupComponents}</ul>
    
    
}
export default SignupsList