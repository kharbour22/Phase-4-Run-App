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
    fetch('/signups')
    .then(response => response.json())
    .then(signupsData => setSignups(signupsData))
  }, [])

  function addRun(newRunData){
    fetch('/runs',{
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

  function updateRun(id, runDataForUpdate, setRunFromRunProfile){
    
    fetch(`/runs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(runDataForUpdate)
    })
    .then(response => {
        if(response.ok){
            response.json().then(updatedRunData => {
                setRunFromRunProfile(updatedRunData)
                setRuns(runs => runs.map(run => {
                    if(run.id === updatedRunData.id){
                        return updatedRunData
                    }
                    else{
                        return run
                    }
                }))
            })
        }
        else if(response.status === 400 || response.status === 404){
            response.json().then(errorData => {
                alert(`Error: ${errorData.error}`)
            })
        }
        else{
            response.json().then(() => {
                alert("Error: Something went wrong.")
            })
        }
    })
}

function deleteRun(id){
    
    fetch(`/runs/${id}`, {
        method: "DELETE"
    })
    .then(response => {
        if(response.ok){
            setRuns(runs => runs.filter(run => {
                return run.id !== id
            }))
        }
        else if(response.status === 404){
            response.json().then(errorData => alert(`Error: ${errorData.error}`))
        }
    })
}


  return (
    <div>
      <NavBar/>
      <Outlet context={{runs: runs, addRun: addRun, signups: signups, addSignup: addSignup, deleteRun: deleteRun, updateRun: updateRun}}/>
      
    </div>
  )
}

export default App;
