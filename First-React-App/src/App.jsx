import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import AddCount from "./components/AddCount/AddCount.jsx"
import Finances from "./components/Finances/Finances.jsx"
import SocialLinks from "./components/SocialLinks/SocialLinks.jsx"


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
    let setClass = true;
    if (place === 1) {
      if (place2 === 1) {
        setPlace2(0)
        setClass = false;
      } else {
        setPlace2(1)
      }
    } else if (place === 2) {
      if (place2 === 2) {
        setPlace2(0);
        setClass = false;
      } else {
        setPlace2(2);
      }
    }
    
    setClassNames((classNames) => classNames.map((item, i) => (setClass && i === place - 1 ? "top-button-selected" : "top-button")));
  }
  
  return (
    <>
      <Name name="Michael Caulson" />
      {/* <Name name="Mia" /> */}
      <p className="personal-paragraph">
        Hi! I'm Michael, a software engineer who loves creating clean, user-centric interfaces. My background is
        in C and JavaScript, and I'm currently expanding my skills in React. I specialize in front-end and UI development
        for large-scale embedded systems, with my work reaching millions of users. I enjoy transforming conceptual ideas
        into fully realized final products. Take a look around my portfolio and see how I have reimagined projects in
        JavaScript and React.
      </p>

      <h3>Links:</h3>
      <SocialLinks />

      <h2 className="intro-h2">
        Below are some mini projects that I have created with more to come:
      </h2>

      <p className="note-paragraph">
        I have only added 2 projects below, the first one is just testing functionality in React, the second created
        to help me do some financial calculations that were needed at the time and continue to be helpful today. I am still working
        on adding other projects to this portfolio and will update as time goes on.
      </p>

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
