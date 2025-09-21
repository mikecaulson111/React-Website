import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import AddCount from "./components/AddCount/AddCount.jsx"
import Finances from "./components/Finances/Finances.jsx"


function Name({name}) {
  return (
    <h1>{name}</h1>
  );
}

function App() {
  
  let options2 = ["", <AddCount />, <Finances />];
  const [classNames, setClassNames] = useState(["top-button", "top-button"]);
  const [place2, setPlace2] = useState(0);
  // const [buttonName, setButtonName] = useState("Press to open count thingy")

  

  

  function secondButtonClicked(place) {
    if (place === 1) {
      if (place2 === 1) {
        setPlace2(0)
      } else {
        setPlace2(1)
      }
    } else if (place === 2) {
      setPlace2(2);
    }
    
    setClassNames((classNames) => classNames.map((item, i) => (i === place - 1 ? "top-button-selected" : "top-button")));
  }
  
  return (
    <>
      <Name name="Michael" />
      <Name name="Mia" />

      <div className="button-menu">
        <button className={classNames[0]} onClick={() => secondButtonClicked(1)}>
         Fun Counter 
        </button>
        <button className={classNames[1]} onClick={() => secondButtonClicked(2)}>
          Finance Tools
        </button>
      </div>
      {options2[place2]}
    </>
  )
}

export default App
