import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PayoffFixed from './components/PayoffFixed.jsx'
import PayoffMinimum from './components/PayoffMinimum.jsx'
import WorstTaxes from './components/WorstTaxes.jsx'


function Name({name}) {
  return (
    <h1>{name}</h1>
  );
}

function randomNum(max) {
  return Math.floor(Math.random() * max) - (max/2);
}



function App() {
  const [count, setCount] = useState(0)

  const [sentence, setSentence] = useState("")

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [thisClassName, setThisClassName] = useState(["myButton","myButton","myButton"]);

  let options = ["", <PayoffFixed />, <PayoffMinimum />, <WorstTaxes />];
  const [place, setPlace] = useState(0);

  useEffect(() => {
    let timer;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds <= 0) {
      clearInterval(timer);
      setIsRunning(false);
      setSentence("");
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  function startTimer() {
    setSeconds(5);
    if (!isRunning) {
      setIsRunning(true);
    }
  }

  function stopTimer() {
    setIsRunning(false);
  }

  function addOneCount() {
    setCount((count) => count + 1);
    setSentence((sentence) => sentence = "Added 1 to count");
    startTimer();
  }

  function subtractOneCount() {
    setCount((count) => count - 1);
    setSentence((sentence) => sentence = "Subtracted 1 from count");
    startTimer();
  }
  
  function addRandomCount() {
    var num = randomNum(10);
    setCount((count) => count + num);
    setSentence((sentence) => sentence = "Added " + num + " to count");
    startTimer();
  }

  // TODO: Cant get this to work correctly 
  function buttonClicked(tempPlace) {
    setPlace(tempPlace);
    setThisClassName((thisClassName) => thisClassName.map((item, i) => (i === tempPlace -1 ? "myButtonSelected" : "myButton")));
  } 
  

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Name name="Michael" />
      <Name name="Mia" />
      <menu>
        <h2>
          Count is {count}
        </h2>
        <button onClick={() => addOneCount()}>
          Add One
        </button>
        <button onClick={() => subtractOneCount()}>
          Subtract One
        </button>
        <button onClick={() => addRandomCount()}>
          Add Random
        </button>
        <button onClick={() => setThisClassName("hello")}>
          change class
        </button>
      </menu>
      <h2>
        {sentence}
      </h2>
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
