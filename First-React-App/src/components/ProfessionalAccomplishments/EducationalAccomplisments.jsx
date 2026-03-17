import {useRef} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Professional.css"

export default function EducationalAccomplishments() {
    
    const container = useRef();

    useGSAP(() => {
      if (!container.current) return;

      const tl = gsap.timeline();

      // tl.from(".box", {x:-50, opacity: 0, duration: 0.5});
      tl.from(".li-item", {
        x: 100,
        scale: 0.75,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
      });
    }, {scope: container});

    return (
        <div ref={container}>
            <h3>Educational Accomplishments</h3>
            <h4 style={{fontWeight: "bold", marginTop: "30px"}} className="right-side">University of Colorado Boulder:</h4>
            <ul>
                <li className="li-item">
                    For 4th year Lab, my lab partner and I performed the Cavendish Experiment
                </li>
                <li className="li-item">
                    Completed both Quantum Mechanics 1&2 as well as Quantum Computing
                </li>
            </ul>
            {/* <p>I am one of three inventors on a patent related to signal protection for broadcast satellite service</p> */}
        </div>
    );
}
