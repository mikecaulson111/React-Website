import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PayoffFixed from './components/PayoffFixed.jsx'
import PayoffMinimum from './components/PayoffMinimum.jsx'
import WorstTaxes from './components/WorstTaxes.jsx'
import AddCount from "./components/AddCount.jsx"


function Name({name}) {
  return (
    <h1>{name}</h1>
  );
}

function App() {
  
  const [thisClassName, setThisClassName] = useState(["myButton","myButton","myButton"]);

  let options = ["", <PayoffFixed />, <PayoffMinimum />, <WorstTaxes />];
  let options2 = ["", <AddCount />];
  const [place, setPlace] = useState(0);
  const [place2, setPlace2] = useState(0);
  const [buttonName, setButtonName] = useState("Press to open count thingy")

  

  // TODO: Cant get this to work correctly 
  function buttonClicked(tempPlace) {
    setPlace(tempPlace);
    setThisClassName((thisClassName) => thisClassName.map((item, i) => (i === tempPlace -1 ? "myButtonSelected" : "myButton")));
  }

  function secondButtonClicked() {
    if (place2) {
      setPlace2(0);
      setButtonName("Press to open count thingy");
    } else {
      setPlace2(1);
      setButtonName("Press to get rid of button thingy");
    }
  }
  
  return (
    <>
      <Name name="Michael" />
      <Name name="Mia" />

      <button onClick={() => secondButtonClicked()}>
       {buttonName} 
      </button>
      {options2[place2]}
      
      <div className="button-menu">
        <button className={thisClassName[0]} onClick={() => buttonClicked(1)}>
          Total Payoff Amount
        </button>
        <button className={thisClassName[1]} onClick={() => buttonClicked(2)}>
          Minimum to payoff loan in x time
        </button>
        <button className={thisClassName[2]} onClick={() => buttonClicked(3)}>
          Worst case taxes
        </button>
      </div>
      {options[place]}
    </>
  )
}

export default App
