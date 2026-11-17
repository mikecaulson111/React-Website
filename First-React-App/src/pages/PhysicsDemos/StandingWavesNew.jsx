import { useState } from "react"
import Sketch from "react-p5"

import Links from "../../components/Links/Links.jsx"

let n = 1200;
let t = 0;
let del;
let lambda;
let w;

let width = 400;
let height = 400;

let jVals = [4, 2, 1, 0.5, 0.25, 0.125];
let textVals = ["400", "200", "100", "50", "25", "12.5", "6.25"];

// equation: y(x,t) = 2A sin(kx)cos(wt)
// A is amplitude
// k = wave number = 2PI/lambda (lambda is wave length)
// w = angular frequency = 2PI f (f is frequency)

export default function StandingWavesNew() {

    const [position, setPosition] = useState(3);
    const [wavelengthText, setWavelengthText] = useState(textVals[3]);

    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(width, height).parent(canvasParentRef);
      del = width/n;
      w = 1;
    }

    function siner(x,t,r,p5) {
      return (2 * 50 * p5.sin(p5.TWO_PI * x / lambda) * p5.cos(r * t)) + height/2;
    }

    const draw = (p5) => {
      var j = jVals[position];
      lambda = width * j;
      p5.background(220);
      p5.strokeWeight(4);
      p5.stroke(0);
      p5.noFill();
      p5.beginShape(p5.LINES);
      for(let i = 0; i < n; i++) {
        p5.vertex(i * del, siner(i*del,t,w, p5));
      }
      p5.endShape();
      t += 0.03;

      if (t >=  6.28) {
        t = 0;
      }

      p5.strokeWeight(1);
      p5.textAlign(p5.CENTER, p5.CENTER);

      // Line and text to show full width of screen
      p5.line(0, height - height/16, width, height - height/16);
      p5.text("Total Width = 100", width/2, 31*height/32);
      // Text to show what lambda is (wavelength)
      var posForText = lambda / 2 >= width ? width/2 : lambda <= 50 ? 50 : lambda / 2;
      p5.text("Wavelength = " + wavelengthText, posForText, height - height/8);
      p5.text("Number of waves on screen: " + 1/jVals[position], width/2, height - 3*height/16);

      // Line and text to actually show the wavelength
      p5.strokeWeight(2);
      p5.stroke("blue");
      p5.line(0, height * 0.85, lambda, height * 0.85);
      p5.line(lambda, height * 0.86, lambda, height * 0.84);
      p5.strokeWeight(1);
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
                onChange={(e) => {
                  setPosition(Number(e.target.value));
                  setWavelengthText(textVals[Number(e.target.value)]);
                }}
            />
            <p>Move slider above to change number of waves</p>
            <Links />
        </>
    );
}