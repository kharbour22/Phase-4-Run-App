import React, { useEffect, useState } from "react";
import { Switch, Route, Outlet } from "react-router-dom";
import NavBar from "./NavBar";

function App() {

  const [runs, setRuns] = useState([])
  const [signups, setSignups] = useState([])
  
  useEffect (() => {
    fetch('/runs')
    .then(response => response.json())
    .then(runsData => setRuns(runsData))
  }, [])

  useEffect(() => {
    fetch('signups')
    .then(response => response.json())
    .then(signupsData => setSignups(signupsData))
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

  function addSignup(newSignup){
    fetch('/signups', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSignup)
    })
    .then(response => response.json())
    .then(newSignupData => setSignups([...signups, newSignupData]))
  }

  return (
    <div>
      <NavBar/>
      <Outlet context={{runs: runs, addRun: addRun, signups: signups, addSignup: addSignup}}/>
      
    </div>
  )
}

export default App;
