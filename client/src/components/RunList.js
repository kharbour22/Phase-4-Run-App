import React from "react";
import { Link } from "react-router-dom"; // Import Link component from React Router
import { useOutletContext } from "react-router-dom";
import Run from "./Run";

function RunList() {
    const { runs, user } = useOutletContext();

    const runsComponents = runs.map(run => (
        
        <Link key={run.id} to={`/runs/${run.id}`}>
            <Run
                run={run}
            />
        </Link>
    ));

    function displayRunInfo() {
        if (user && user.type === 'admin') {
            return <h1>Here are all of the runs:</h1>;
        } else if (user && user.type === 'user' && runs.length > 0) {
            return <h1>Here are the runs that you've signed up for:</h1>;
        } else if (user && user.type === 'user' && runs.length === 0) {
            return <h1>You haven't signed up for any runs yet.</h1>;
        } else {
            return null;
        }
    }

    return (
        <>
            <br />
            {user ? displayRunInfo() : null}
            <ul className="run-list">{runsComponents}</ul>
        </>
    );
}

export default RunList;
