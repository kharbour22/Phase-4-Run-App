import { useEffect, useState } from "react";
import { Switch, Route, Outlet, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./NavBar";

function App() {

  const [runs, setRuns] = useState([])
  const [signups, setSignups] = useState([])
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  
  useEffect(() => {
    // GET request - Retrieve all hotels and update the 'hotels' state with the hotel data.
    fetch('/runs')
        .then(response => {
            if(response.ok){
                response.json().then(runsData => setRuns(runsData))
            }
        })
  }, [user])

  useEffect(() => {
    // GET request - Check if the user is logged in
    fetch('/check_session')
    .then(response => {
        if(response.ok){
            response.json().then(userData => {
                setUser(userData)
            })
        }
        else if(response.status === 401){
            navigate('/login')
        }
    })
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


function logInUser(loginData){
  // POST request - Log in a user.
  fetch('/login', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(loginData)
  })
  .then(response => {
      if(response.ok){
          response.json().then(userData => {
              setUser(userData)
              navigate('/')
          })
      }
      else if(response.status === 401){
          response.json().then(errorData => alert(`Error: ${errorData.error}`))
      }
  })
}

function logOutUser(){
  // DELETE request - Log out a user.
  fetch('/logout', {
      method: "DELETE"
  })
  .then(response => {
      if(response.ok){
          setUser(null)
      }
      else{
          alert("Error: Unable to log user out!")
      }
  })
}

function registerUser(registerData){
  fetch('/register', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
      },
      body: JSON.stringify(registerData)
  })
  .then(response => {
      if(response.ok){
          response.json().then(userData => {
              setUser(userData)
              navigate('/')
          })
      }
      else if(response.status === 400){
          response.json().then(errorData => alert(`Error: ${errorData.error}`))
      }
  })
}

  return (
    <div className="app">
      <NavBar user = {user} logOutUser = {logOutUser}/>
      {user ? <h2>Welcome {user.username}!</h2> : null}
      <Outlet context={{runs: runs, addRun: addRun, signups: signups, addSignup: addSignup, deleteRun: deleteRun, updateRun: updateRun, logInUser: logInUser, registerUser:registerUser}}/>
      
    </div>
  )
}

export default App;
