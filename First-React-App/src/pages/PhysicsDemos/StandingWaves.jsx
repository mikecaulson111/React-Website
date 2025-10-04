import { useState } from "react"
import Sketch from "react-p5"

import Links from "../../components/Links/Links.jsx"

let n = 1200;
let t = 0;
let del;
let lambda;
let w;
let w2;
let slider;

let width = 400;
let height = 400;

export default function StandingWaves() {

    const [position, setPosition] = useState(3);

    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(400, 400).parent(canvasParentRef);
      del = width/n;
      w = p5.TWO_PI * 0.25;
      w2 = p5.TWO_PI * 0.26;
    }

    function siner(x,t,r,p5) {
      return (2 * 50 * p5.sin(p5.TWO_PI * x / lambda) * p5.cos(r * t)) + height/2;
    }

    const draw = (p5) => {
      var j = p5.map(position, 0, 5, 0.125, 2);
      lambda = 400 * j;
      p5.background(220);
      p5.strokeWeight(4);
      p5.noFill();
      p5.beginShape(p5.LINES);
      for(let i = 0; i < n; i++) {
        p5.vertex(i * del, siner(i*del,t,w, p5));
      }
      p5.endShape();
      t += 0.03;
    }
    return (
        <>
            <h2>Here is a standing waves example:</h2>
            <Sketch setup={setup} draw={draw} />
            <input 
                type="range"
                min="0"
                max="5"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
            />
            <p>Move slider above to change number of waves</p>
            <Links />
        </>
    );
}