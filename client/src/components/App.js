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
  return (
    <div>
      <NavBar/>
      <Outlet/>
      
    </div>
  )
}

export default App;
