import {useRef} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./Professional.css"

export default function ProfessionalAccomplishments() {
    
    const container = useRef();

    useGSAP(() => {
      if (!container.current) return;

      const tl = gsap.timeline();

      // tl.from(".box", {x:-50, opacity: 0, duration: 0.5});
      tl.from(".li-item", {
        x: -100,
        scale: 0.75,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4
      });
    }, {scope: container});

    return (
        <div ref={container}>
            <h3>Professional Accomplishments</h3>
            <h4 style={{fontWeight: "bold", marginTop: "30px"}}>Dish/Echostar:</h4>
            <ul>
                <li className="li-item">
                    I am one of three inventors on a patent related to signal protection for broadcast satellite service
                </li>
                <li className="li-item">
                    I have aided in reducing api calls by over 20% for certain calls by optimizing code
                </li>
            </ul>
            {/* <p>I am one of three inventors on a patent related to signal protection for broadcast satellite service</p> */}
        </div>
    );
}
