import { useState, useEffect } from "react";
import Sketch from "react-p5";
import { useNavigate } from "react-router-dom";

import Links from "../../components/Links/Links.jsx";

import "./PhysicsDemos.css";

let k = 0.02;
let g = 0.6;


let grav = false;
let siner = true;

var moveX = false;

let time = 0;

let TWO_PI = 2 * 3.1415;


class Dot {
  constructor(x,y, p5) {
    this.x = x;
    this.y = y;
    this.velocity = 0;
    this.velocityx = 0;
    this.mass = 1;
    this.acc = 0;
    this.accx = 0;
    this.color = [];
    for(let i = 0; i < 3; i++) {
      this.color.push(p5.floor(p5.random(0,255)));
    }
  }
  
  change(){
    if(siner) {
      siner = false;
    } else {
      siner = true;
      //g = -g;
    }
  }
  
  updatediff(del_y) {
    this.acc = 0;
    //this.pos = height/2 + del_y;
  }
  
  
  update1(offset, timeinc, posy, posx, p5) {
    // this.acc = -1 * y_diff * k;
    // this.velocity += this.acc;
    // this.y += this.velocity;
    
    if(siner) {
      //this.y = mouseY+offset;
      this.y = height/2 + 200*p5.sin(time)+offset;
    } else {
    //   this.y = mouseY + offset;
        this.y = posy - offset;
        if (moveX) {
            this.x = posx;
        }
    }
    
    time += timeinc;
    if(time >= TWO_PI) {
      time = 0;
    }
  }
  
  update(del_y, del_x) {
    //F = m*a = -k * dely
    
    if(grav) {
      this.acc = -1 * k * del_y + g;
    } else {
      this.acc = -1 * k * del_y;
    }
    this.velocity += this.acc;
    this.velocity *= 0.85;
    this.y += this.velocity;

    this.accx = -1 * k * del_x;
    this.velocityx += this.accx;
    this.velocityx *= 0.85;
    this.x += this.velocityx;
  }
  
  show(p5) {
    //fill(100,10,50);
    p5.fill(this.color[0],this.color[1],this.color[2]);
    p5.ellipse(this.x, this.y, 40);
  }
}


let dots = [];
let n = 10;
let timeinc;
let slider;
let button;

let changeEND = false;

var width = 400;
var height = 400;

const buttonTexts = ["Press to hold last ball", "Press to release last ball"];

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined') {
            return;
        }

        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        const isMobileDevice = /android|webOS|iPhone|iPad|iPod|blackberry|IEMobile|Opera Mini/i.test(userAgent);

        setIsMobile(isMobileDevice);

    }, []);

    return isMobile;
}


export default function SpringWave() {

    const [position, setPosition] = useState(3);
    const [buttonText, setButtonText] = useState(0);
    const [globalPosition, setGlobalPosition] = useState( {x: 0, y: 0} );

    var lastThreeKeys = "";

    const navigate = useNavigate();
    
    const isMobile = useIsMobile();
    if (isMobile) {
        width = 350;
        height = 350;
    }

    const size = isMobile ? 350 : 400;

    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(400, 400).parent(canvasParentRef);
      let divisor = width / n;

      if (!dots[1]) {
        for(let i = 0; i < n; i++) {
            dots.push(new Dot(i*divisor + (divisor/2), height/2, p5));
        } 
      }
    }

    function keyTyped() {
        dots[0].change();
    }

    const handleKeyDown = (event) => {
        if (event.key === 's') {
            keyTyped();
        } else if (event.key === 'x') {
            moveX = !moveX;
        }

        if (lastThreeKeys.length === 3) {
            lastThreeKeys = lastThreeKeys.slice(1) + event.key;
            if (lastThreeKeys.toLowerCase() === "mia") {
                // navigate to mia-and-me
                navigate("/mia-and-me");
            }
        } else {
            lastThreeKeys = lastThreeKeys + event.key;
        }
    }

    const handleGlobalMouseMove = (event) => {
        setGlobalPosition(
            {
                x: event.clientX,
                y: event.clientY
            }
        );
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleGlobalMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
        };
    }, []);

    function changeEnd() {
      if(changeEND) {
        changeEND = false;
      } else {
        changeEND = true;
      }
    }

    const draw = (p5) => {
      p5.background(220);

      const mouseX = p5.mouseX;
      const mouseY = p5.mouseY;

      var timeinc = p5.map(position, 0, 10, 0.01,0.1);
      for(let i = 0; i < dots.length-1; i++) {

        if(i == 0) {
          dots[i].update1(0,timeinc,mouseY,mouseX,p5);
        
        
          //Difference between next dot's y and current's y 
          let ydiff = dots[i+1].y - dots[i].y;
          let xdiff = dots[i+1].x - dots[i].x;
          dots[i+1].update(ydiff, moveX ? xdiff : 0);
        } else {
          if(changeEND == true && i == dots.length-2) {
            dots[i+1].updatediff(0);
          } else {
            let ydiff = dots[i+1].y - dots[i].y;
            let xdiff = dots[i+1].x - dots[i].x;

            dots[i+1].update(ydiff, moveX ? xdiff : 0);
          }
        }

      }
      for(let i = 0; i < dots.length; i++) {
        dots[i].show(p5);
        if(i > 0) {
          p5.line(dots[i-1].x, dots[i-1].y, dots[i].x, dots[i].y);
        }
      }
    }

    function handleButtonClick() {
        changeEnd();
        setButtonText(buttonText === 0 ? 1 : 0);
    }

    const handleMouseMove = (event) => {
        setGlobalPosition({
            x: event.clientX,
            y: event.clientY
        });
    }

    const resetScene = () => {
        moveX = false;
        setButtonText(0);
        changeEND = false;
        let divisor = width / n;
        for (var i = 0; i < n; i++) {
            dots[i].x = i*divisor + (divisor / 2);
            dots[i].y = height/2;
        }
    }

    return (
        <>
            <h2>Here is the Spring Wave example:</h2>
            <Sketch setup={setup} draw={draw} />
            <input 
                type="range"
                min="0"
                max="10"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
            />
            <button className="blocks-button" onClick={handleButtonClick}>{buttonTexts[buttonText]}</button>
            <button className="blocks-button" onClick={() => {moveX ? moveX = false : moveX = true}}>Click to move x</button>
            <button className="blocks-button" onClick={resetScene}>Reset</button>
            <p>Move slider above to change number of waves</p>
            <Links />
        </>
    )
}