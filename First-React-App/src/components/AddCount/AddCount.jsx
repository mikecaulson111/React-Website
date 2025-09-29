import { useState, useEffect } from "react"
import "./AddCount.css"

function randomNum(max) {
  return Math.floor(Math.random() * (max + 1)) - (max/2);
}



export default function AddCount () {
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
        <div className="button-menu">
            <h2>
              Count is {count}
            </h2>
            <button className="count-button" onClick={() => addOneCount()}>
              Add One
            </button>
            <button className="count-button" onClick={() => subtractOneCount()}>
              Subtract One
            </button>
            <button className="count-button" onClick={() => addRandomCount()}>
              Add Random
            </button>
        </div>
        <h2>
          {sentence}
        </h2>
        </>
    );
}