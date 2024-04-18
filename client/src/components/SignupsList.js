import { useOutletContext } from "react-router-dom";
import Signup from './Signup';

function SignupsList() {
    const { signups, deleteSignup } = useOutletContext();

    const handleDelete = (id) => {
        deleteSignup(id);
    };

    return (
        <ul>
            {signups.map(signup => (
                <Signup key={signup.id} signup={signup} onDelete={() => handleDelete(signup.id)} />
            ))}
        </ul>
    );
}

export default SignupsList;