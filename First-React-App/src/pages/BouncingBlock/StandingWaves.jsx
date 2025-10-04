import Sketch from "react-p5"

let n = 400;
let t = 0;
let del;
let lambda;
let w;
let w2;
let slider;

let width = 400;
let height = 400;

export default function StandingWaves() {
    const setup = (p5, canvasParentRef) => {
      p5.createCanvas(400, 400).parent(canvasParentRef);
      del = width/n;
      w = p5.TWO_PI * 0.25;
      w2 = p5.TWO_PI * 0.26;
      slider = p5.createSlider(0,3,2);
    }

    function siner(x,t,r,p5) {
      return (2 * 50 * p5.sin(p5.TWO_PI * x / lambda) * p5.cos(r * t)) + height/2;
      //return (2 * 50 * sin(TWO_PI * x / lambda) * cos(r * t))+height/4;
    }

    const draw = (p5) => {
      var j = p5.map(slider.value(), 0, 3, 0.5, 2);
      //console.log(j);
      lambda = 400 * j;
      p5.background(220);
      p5.strokeWeight(4);
      p5.noFill();
      p5.beginShape(p5.LINES);
      for(let i = 0; i < n; i++) {
        //vertex(i * del, siner(i*del,t,w)+siner(i*del,t,w2));
        p5.vertex(i * del, siner(i*del,t,w, p5));
      }
      p5.endShape();
      t += 0.03;
      // if(t >= TWO_PI) {
      //   t = 0;
      // }
    }
    return <Sketch setup={setup} draw={draw} />;
}