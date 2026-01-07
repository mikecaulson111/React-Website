import { useRef, useLayoutEffect } from "react"

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import myImage from "../../assets/me_2.webp";
import myImageCompressed from "../../assets/me_2_compressed.webp";
import Links from "../../components/Links/Links.jsx";
import BlurUpImage from "../../components/BlurUpImage/BlurUpImage.jsx";
import "./AboutMe.css";

export default function AboutMe() {

    // const [nuggetsClass, setNuggetsClass] = useState("");

    const sectionRef = useRef(null);
    const imageRef   = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(imageRef.current, {
                x: "-50%",
                rotateZ: 180,
                opacity: 0,

                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "50px 350px",
                    end: "50% 125px",
                    scrub: 0,
                    pin: false,
                    // toggleActions: "play none none none",
                    markers: true,
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <>
            <p>
                Hi I'm Mike, I currently work as a software engineer on an embedded system
                in both C/C++ and Java. I consider this position to be full stack as I have
                tasks where I have to work from the UI(Qt) to the back-end and ensure they work
                together for a great user experience.
                I have also taken a interest in React and found that it is really enjoyable and
                something I really like coding with. I am continually working on this website
                and other personal projects which are generally tracked in my github account
                that can be access from the home page.
            </p>
            <h2>More about my personal life</h2>
            <section
                ref={sectionRef}
                style={{height: "240px"}}
            >
                <div ref={imageRef} style={{transform: "translate(0%, 0%)", opacity: 1}}>
                    {/* <img src={myImage} className="me-image" /> */}
                    <BlurUpImage tinySrc={myImageCompressed} largeSrc={myImage} alt={"Image of me in Denver"} myClassName="me-image"/>
                </div>
            </section>
            <p>
                I live in Denver and have lived in the Denver region my entire life. I went to school
                at CU Boulder and graduated in 2022 with a bachelor's in Physics with a minor in Computer
                Science. I enjoy both playing and watching basketball (<span className="nuggets-class">Go Nuggets!</span>) as well as
                playing video games with my friends. I also love visiting new places with my fiancée
                around the US and the world.
            </p>
            <h3>Thanks again for visiting my page!</h3>
            <Links pageName="About Me" />
            <section style={{height: "45vh"}} />
        </>
    );
}