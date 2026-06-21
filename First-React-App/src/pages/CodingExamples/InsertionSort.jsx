import React, { useRef } from "react";
import Sketch from "react-p5";

import Links from "../../components/Links/Links";
import "../../components/PhysicsDemos/PhysicsDemos.css";

export default function InsertionSort() {
  // Use a ref to hold all mutable p5 simulation variables
  const stateRef = useRef({
    lines: [],
    colors: [],
    n: 20,
    time: 0,
    completed: false,
    begin: false,
    swapped: false,
    i: 1,
    j: 0,
    key: 0,
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
    state.completed = false;
    
    for (let i = 0; i < state.n; i++) {
      let mapped = p5.map(i, 0, 19, 0, 1);
      state.lines.push(300 * mapped);
      state.colors.push(0);
    }

    state.i = 1;
    state.j = state.i -1;
    state.lines = p5.shuffle(state.lines);

    state.key = state.lines[state.i];
  };

  const draw = (p5) => {
    p5.background(220);
    const state = stateRef.current;

    state.time += 1;

    if (state.begin) {

        // Sorting Step Logic
        // if (state.time % 5 === 0) {
        if (state.time % 8 === 0) {
            state.time = 0;
            if (state.i < state.n) {
                if (state.j >= 0 && state.lines[state.j] > state.key) {
                    state.lines[state.j+1] = state.lines[state.j];
                    state.j = state.j - 1;
                    state.colors[state.j+1] = 1;
                    state.colors[state.j] = 1;
                } else {
                    state.lines[state.j+1] = state.key;
                    state.colors[state.j+1] = 1;
                    state.colors[state.j] = 1;
                    state.i += 1;
                    state.j = state.i - 1;
                    state.key = state.lines[state.i];
                }
            } else {
                state.completed = true;
            }
        }

        // Completion Animation Logic
        if (state.completed && state.time % 4 === 0 && state.placer < state.n) {
          state.colors[state.placer] = 2;
          state.placer++;
        }
    }

    // Rendering Logic
    for (let i = 0; i < state.n; i++) {
      if (state.colors[i] === 1) {
        p5.fill(255, 255, 0);
        if (state.time >= 6) {
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
        <h2>Bubble Sort</h2>
        <Sketch setup={setup} draw={draw} />
        <button className="physics-button" style={{marginTop: "15px"}} onClick={handleBegin}>Begin/Start Over</button>
        <Links />
    </>
  );
}
