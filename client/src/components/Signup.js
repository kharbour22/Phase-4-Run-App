import Run from "./Run";

function Signup({signup}){
    return(
        <li>
            <h3>Signup # {signup.id}</h3>
            <h3>Date: {signup.date}</h3>
            <h3> Run Info:</h3>
            <Run run={signup.run}/>
        </li>
    )
}
export default Signup