import { useRef, useLayoutEffect, useState } from "react"

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import myImage from "../../assets/me_2.webp";
import myImageCompressed from "../../assets/Compressed/me_2_compressed.webp";
import Links from "../../components/Links/Links.jsx";
import BlurUpImage from "../../components/BlurUpImage/BlurUpImage.jsx";
import ProfessionalAccomplishments from "../../components/ProfessionalAccomplishments/ProfessionalAccomplishments.jsx";
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
                    markers: false,
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const [professional, setProfessional] = useState(false);
    const [profText, setProfText] = useState("Show Professional Accomplishments");

    const [school, setSchool] = useState(false);
    const [schoolText, setSchoolText] = useState("Show Education Accomplisments");

    function updateProfessional() {
        setSchoolText("Show Education Accomplishments");
        setSchool(false);

        if (!professional) {
            setProfText("Hide Professional Accomplishments");
            setProfessional(true);
        } else {
            setProfText("Show Professional Accomplishments");
            setProfessional(false);
        }
    }

    function updateSchool() {
        setProfText("Show Professional Accomplisments");
        setProfessional(false);

        if (!school) {
            setSchoolText("Hide Education Achievements");
            setSchool(true);
        } else {
            setSchoolText("Show Education Accomplishments");
            setSchool(false);
        }
    }

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
            <div className="button-menu">
                <button style={{backgroundColor: "#E5E4E2"}} onClick={updateProfessional}>{profText}</button>
                <button style={{backgroundColor: "#E5E4E2"}} onClick={updateSchool}>{schoolText}</button>
            </div>
            {professional ? <ProfessionalAccomplishments /> : ""}
            {/* {school ? <SchoolAccomplisments /> : ""} */}
            <Links pageName="About Me" />
            <section style={{height: "45vh"}} />
        </>
    );
}