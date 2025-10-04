import React from "react"
import Sketch from "react-p5"

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
    
    
    
    
    
    
    //Some dampening on y velocity:
    this.velocity.y *= 0.995;
    //console.log(this.velocity.y);
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
    //(8);
    p5.stroke(255);
    p5.fill(this.color[0], this.color[1], this.color[2]);
    p5.rect(this.position.x, this.position.y, 20, 20);
  }
}

export default function BouncingBlock() {
    let blocks = [];
    let n = 10;


    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(400, 400).parent(canvasParentRef);
      for(let i = 0; i < n; i++) {
        //blocks[i] = new Block();
        blocks.push(new Block(p5));
      }
      //frameRate(1);
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
      // if(key === ' ') {
      //   for(let i; i < n; i++) {
      //     blocks[i].jump();
      //   }
      // }
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

    const draw = (p5) => {
      p5.background(0);
      for(let i = 0; i < blocks.length; i++) {
        //This to calculate if bounce off each other
        // for(let j = 0; j < blocks.length; j++) {
        //   if(j != i) {
        //     blocks[i].bounceEachother(blocks[j]);
        //   }
        // }
        blocks[i].update();
        blocks[i].show(p5);
      }
    }

    return <Sketch setup={setup} draw={draw} />
}