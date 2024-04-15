function Run({run}){
    return (
        <div>
            <img src = {run.image} alt={run.location}/>
            <h2>{run.location}</h2> 
            <h3>{run.link}</h3>
        </div>
    )
}

export default Run