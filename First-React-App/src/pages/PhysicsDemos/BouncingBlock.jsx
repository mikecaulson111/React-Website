import { useState, useRef } from "react"
import Sketch from "react-p5"

import Links from "../../components/Links/Links.jsx"
import "./PhysicsDemos.css";

let width = 400;
let height = 400;

class Block {
  constructor(p5) {
    this.position = p5.createVector(p5.random(0,width-20), p5.random(0, height-20));
    this.velocity = p5.createVector(p5.floor(p5.random(-9,10)), p5.floor(p5.random(-9,10)));
    this.acceleration = p5.createVector(0, 1);
    
    //Adds a random color in r g b in color[0,1,2]
    this.color = [];
    for(let i = 0; i < 3; i++) {
      this.color.push(p5.floor(p5.random(0,255)));
    }
  }
  

  //This was going to see if it needs to bounce off another block given 'other' block BELOW DOES NOT WORK, NEED TO RETHINK
  bounceEachother(other) {
    if(abs(this.position.x - other.position.x) < 20 || abs(this.position.y - other.position.y) < 20 ) {
      //let betw = createVector(this.position.x - other.position.x, this.position.y - other.position.y);
      
      let temp = p5.createVector(this.velocity.x, this.velocity.y);
      this.velocity = other.velocity;
      other.velocity = temp;
      
    }
  }

  // TODO: need to update so that there is also acceleration in the x direction so that it slows down
  
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //For bounce x:
    if(this.position.x > width - 20 || this.position.x < 0) {
      this.velocity.x *= -1;
      if(this.position.x < 0) {
        this.position.x = 0;
      } else {
        this.position.x = width-20;
      }
    }
    //For bounce y:
    if(this.position.y > height-20) {
      this.velocity.y *= -1;
      this.position.y = height-20;
    }
    
    //Some dampening on x and y velocities:
    this.velocity.y *= 0.995;
    if (Math.abs(this.velocity.x) > 0.01)
    {
      this.velocity.x *= 0.99;
    } else {
      this.velocity.x = 0;
    }
  }
  
  jump(value) {
    this.velocity.y = -1 * value;
  }
  
  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
  
  incx(value) {
    this.velocity.x += value;
  }
  
  show(p5) {
    // p5.stroke(255);
    p5.noStroke();
    p5.fill(this.color[0], this.color[1], this.color[2]);
    p5.rect(this.position.x, this.position.y, 20, 20);
  }
}

export default function BouncingBlock() {
    let n = 10;

    const blocksRef = useRef([]);

    function mapUp(val, newMin, newMax) {
      return (val * (newMax - newMin)) + newMin;
    }

    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(400, 400).parent(canvasParentRef);
      const blocks = [];
      for(let i = 0; i < n; i++) {
        blocks.push(new Block(p5));
      }
      blocksRef.current = blocks;
    }

    function keyPressed() {
      if(keyCode === UP_ARROW) {
        let num = p5.floor(p5.random(0,n));
        blocks[num].jump(25);
      } else if(keyCode === RIGHT_ARROW) {
        for(let i = 0; i < n; i++) {
          blocks[i].incx(p5.floor(p5.random(-10,10)));
        }
      } else if(keyCode === LEFT_ARROW) {
        for(let i = 0; i < n; i++) {
          blocks[i].incx(10);
        }
      }
    }

    function keyTyped() {
      if(key === ' ') {
        for(let i =0; i < n; i++) {
          blocks[i].jump(p5.floor(p5.random(10,30)));
        }
      } else if(key === 'a') {
        for(let i = 0; i < n; i++) {
          blocks[i].jump(25);
        }
      } else if(key === 'S') {
        for(let i = 0; i < n; i++) {
          blocks[i].stop();
        }
      }
    }

    function allJump() {
      const blocks = blocksRef.current;

      if (blocks.length === 0) {
        console.warn("Blocks are not ready yet (uninitialized)");
        return;
      }
      for(let i =0; i < n; i++) {
        blocks[i].jump(Math.floor(mapUp(Math.random(), 10, 30)));
      }
    }

    function allStop() {
      const blocks = blocksRef.current;
      for (var i = 0; i < n; i++) {
        blocks[i].velocity.x = 0;
        blocks[i].velocity.y = 0;
      }
    }

    function allRainbow() {
      const blocks = blocksRef.current;
      for(let i =0; i < n; i++) {
        blocks[i].jump(Math.floor(mapUp(Math.random(), 10, 30)));
        blocks[i].velocity.x = Math.floor(mapUp(Math.random(), -8, 8));
      }
    }

    const draw = (p5) => {
      const blocks = blocksRef.current;
      p5.background(0);
      for(let i = 0; i < blocks.length; i++) {
        blocks[i].update();
        blocks[i].show(p5);
      }
    }

    return (
      <>
        <Sketch setup={setup} draw={draw} />
        <button className="blocks-button" onClick={allJump}>Jump</button>
        <button className="blocks-button" onClick={allStop}>Stop them all</button>
        <button className="blocks-button" onClick={allRainbow}>Random Jump</button>
        <Links />
      </>
    );
}
