import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App() {

  const [runs, setRuns] = useState([])
  
  useEffect (() => {
    fetch('/runs')
    .then(resonse => resonse.json())
    .then(runsData => setRuns(runsData))
  }, [])

  function addRun(newRunData){
    fetch('runs',{
      method: "Post",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newRunData)
    })
    .then(response => response.json())
    .then(newRunData => setRuns([...runs, newRunData]))
  }

  return (
    <div>
      <NavBar/>
      <Outlet context={{runs: runs, addRun: addRun}}/>
      
    </div>
  )
}

export default App;
