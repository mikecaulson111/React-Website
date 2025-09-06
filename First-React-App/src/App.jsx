import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PayoffFixed from './components/PayoffFixed.jsx'
import PayoffMinimum from './components/PayoffMinimum.jsx'


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

  let options = ["", <PayoffFixed />, <PayoffMinimum />];
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
      </menu>
      <h2>
        {sentence}
      </h2>
      <menu>
        <button onClick={() => setPlace((place) => place = 1)}>
          Total Payoff Amount
        </button>
        <button onClick={() => setPlace((place) => place = 2)}>
          Minimum to payoff loan in x time
        </button>
      </menu>
      {options[place]}
    </>
  )
}

export default App
