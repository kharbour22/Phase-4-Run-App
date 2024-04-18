import React from 'react';

function Run({ run }) {
    return (
        <div>
            <img src={run.image} alt={run.location} />
            <h2>{run.location}</h2>
            <a href={run.link}>
    
            </a>
        </div>
    );
}

export default Run;