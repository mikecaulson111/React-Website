import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


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
      <div className="container">
        <ul>
          {/* <button onClick={() => setCount((count) => count + 1)}> */}
            {/* Caluclate payoff amount */}
          {/* </button> */}
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
        </ul>
      </div>
      <h2>
        {sentence}
      </h2>
    </>
  )
}

export default App
