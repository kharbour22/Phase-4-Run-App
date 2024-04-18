import { useState, useEffect } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

function SignupProfile() {
    const [signup, setSignup] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const { deleteSignup } = useOutletContext();

    useEffect(() => {
        fetch(`/signups/${id}`)
            .then(response => {
                if (response.ok) {
                    response.json().then(signupData => {
                        setSignup(signupData);
                    });
                } else if (response.status === 404) {
                    response.json().then(errorData => alert(`Error: ${errorData.error}`));
                } else {
                    response.json().then(() => alert("Error: Something went wrong."));
                }
            });
    }, [id]);

    function handleDeleteButtonClick() {
        deleteSignup(signup.id);
        navigate('/');
    }

    return (
        <>
            {signup && (
                <div className="signup-profile">
                    
                    <h2>Signup ID: {signup.id}</h2>
                    <h3>Date: {signup.date}</h3>
                    <button onClick={handleDeleteButtonClick} className="delete-button">Delete Signup</button>
                </div>
            )}
        </>
    );
}

export default SignupProfile;
