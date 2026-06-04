import React, { useRef } from "react";
import Sketch from "react-p5";

import Links from "../../components/Links/Links";
import "../../components/PhysicsDemos/PhysicsDemos.css";

export default function SelectionSort() {
  // Use a ref to hold all mutable p5 simulation variables
  const stateRef = useRef({
    lines: [],
    colors: [],
    n: 20,
    time: 0,
    minIndex: 0,
    completed: false,
    placer: 0,
    begin: false,
  });

  let begin = false;

  const shuffler = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        // Generate a random index from 0 to i
        const j = Math.floor(Math.random() * (i + 1));
        // Swap elements at i and j using destructuring assignment
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleBegin = () => {
    const state = stateRef.current;

    for (let i = 0; i < state.n; i++) {
        state.colors[i] = 0;
    }
    state.completed = false;
    state.minIndex = 0;
    state.placer = 0;
    if (state.begin) {
        state.lines = shuffler(state.lines);
    } else {
        state.begin = true;
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    
    // Access the current ref state
    const state = stateRef.current;
    
    // Reset or initialize values (helpful if the component remounts)
    state.lines = [];
    state.colors = [];
    state.time = 0;
    state.minIndex = 0;
    state.completed = false;
    state.placer = 0;

    for (let i = 0; i < state.n; i++) {
      let mapped = p5.map(i, 0, 19, 0, 1);
      state.lines.push(300 * mapped);
      state.colors.push(0);
    }

    state.lines = p5.shuffle(state.lines);
  };

  const draw = (p5) => {
    p5.background(220);
    const state = stateRef.current;

    state.time += 1;

    if (state.begin) {

        // Sorting Step Logic
        if (state.time % 20 === 0) {
          state.time = 0;
          if (state.minIndex < state.n) {
            let minner = state.minIndex;
            for (let j = state.minIndex + 1; j < state.n; j++) {
              if (state.lines[j] < state.lines[minner]) {
                minner = j;
              }
            }
            if (minner !== state.minIndex) {
              state.colors[state.minIndex] = 1;
              state.colors[minner] = 1;
              [state.lines[state.minIndex], state.lines[minner]] = [
                state.lines[minner],
                state.lines[state.minIndex],
              ];
            }
            state.minIndex += 1;
          } else if (state.minIndex === state.n && !state.completed) {
            console.log("COMPLETED!!");
            state.completed = true;
          }
        }

        // Completion Animation Logic
        if (state.completed && state.time % 10 === 0 && state.placer < state.n) {
          state.colors[state.placer] = 2;
          state.placer++;
        }
    }

    // Rendering Logic
    for (let i = 0; i < state.n; i++) {
      if (state.colors[i] === 1) {
        p5.fill(255, 255, 0);
        if (state.time > 10) {
          state.colors[i] = 0;
        }
      } else {
        if (state.completed && state.colors[i] === 2) {
          p5.fill(0, 255, 255);
        } else {
          p5.fill(255, 255, 255);
        }
      }
      p5.rect(50 + i * 15, 350 - state.lines[i], 5, 5 + state.lines[i]);
    }
  };

  return (
    <>
        <h2>Selection Sort</h2>
        <Sketch setup={setup} draw={draw} />
        <button className="physics-button" style={{marginTop: "15px"}} onClick={handleBegin}>Begin/Start Over</button>
        <Links />
    </>
  );
}
