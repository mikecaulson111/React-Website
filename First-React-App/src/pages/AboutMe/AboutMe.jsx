import myImage from "../../assets/me_2.jpg"
import Links from "../../components/Links/Links.jsx"
import "./AboutMe.css"

export default function AboutMe() {

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
            <img src={myImage} className="me-image" />
            <p>
                I live in denver and have lived in the denver region my entire life. I went to school
                at CU Boulder and graduated in 2022 with a bachelor's in Physics with a minor in Computer
                Science. I enjoy both playing and watching basketball (strongly a Nuggets fan) as well as
                playing video games with my friends. I also love visiting new places with my girlfriend
                around the US and the world.
            </p>
            <Links pageName="About Me" />
        </>
    );
}