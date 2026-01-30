import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Home.css'

import AddCount from "../../components/AddCount/AddCount.jsx"
import Finances from "../../components/Finances/Finances.jsx"
import SocialLinks from "../../components/SocialLinks/SocialLinks.jsx"
import Markdown from "../../components/Markdown/Makdown.jsx"
import PhysicsDemos from "../../components/PhysicsDemos/PhysicsDemos.jsx"
import RomanNumeral from "../../components/RomanNumeral/RomanNumeral.jsx"
import Links from "../../components/Links/Links.jsx"
import Weather from "../../components/Weather/Weather.jsx"
import GitHubModule from '../../components/GitHubModule/GitHubModule.jsx'

function Home() {
  
  let options2 = ["", <AddCount />, <Finances />, <Markdown />, <PhysicsDemos />, <RomanNumeral />, <Weather />];
  const [classNames, setClassNames] = useState(["top-button", "top-button", "top-button", "top-button", "top-button", "top-button", "top-button"]);
  const [place2, setPlace2] = useState(0);
  const navigate = useNavigate();
  var lastThreeKeys = "";

  function secondButtonClicked(place) {
    let setClass = true;

    if (place2 === place) {
      setPlace2(0);
      setClass = false;
    } else {
      setPlace2(place);
    }
    
    setClassNames((classNames) => classNames.map((item, i) => (setClass && i === place - 1 ? "top-button-selected" : "top-button")));
  }

  const handleKeyDown = (event) => {
    if ( /^[a-zA-Z]$/.test(event.key) ) {
      if (lastThreeKeys.length === 3) {
        lastThreeKeys = lastThreeKeys.slice(1) + event.key;

      } else {
        lastThreeKeys = lastThreeKeys + event.key;
      }
    }
    if (lastThreeKeys.length === 3 && lastThreeKeys.toLowerCase() === "mia") {
      navigate("/mia-and-me");
    }
  }

  useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
          window.removeEventListener('keydown', handleKeyDown);
      };
  }, []);
  
  return (
    <>
      {/* <Name name="Mia" /> */}
      <p className="personal-paragraph">
        Hi! I'm Michael, a software engineer who loves creating clean, user-centric interfaces. My background is
        in C and JavaScript, and I'm currently expanding my skills in React. I specialize in front-end and UI development
        for large-scale embedded systems, with my work reaching millions of users. I enjoy transforming conceptual ideas
        into fully realized final products. Take a look around my portfolio and see how I have reimagined projects in
        JavaScript and React.
        {/* MJC MJC MJC TODO add this blerb back in when you figure out all of what you want in the professional accomplishments */}
        {/* If you are curious about more of my professional accomplishments, visit my "about me" page
        linked down below. */}
      </p>

      <h3>Links:</h3>
      <SocialLinks />

      <h2 className="intro-h2">
        Below are some mini projects that I have created with more to come:
      </h2>

      <p className="note-paragraph">
        I have only added a couple projects below, the first one is just testing functionality in React, the second created
        to help me do some financial calculations that were needed at the time and continue to be helpful today. The third
        is a markdown editor/creator, and the next is some of the javascript/p5JS physics projects that I have worked on.
        After that is a converter for roman numberals.
        I am still working on adding other projects to this portfolio and will update as time goes on.
      </p>

      <div className="button-menu">
        <button className={classNames[0]} onClick={() => secondButtonClicked(1)}>
          Counter 
        </button>
        <button className={classNames[1]} onClick={() => secondButtonClicked(2)}>
          Finance Tools
        </button>
        <button className={classNames[2]} onClick={() => secondButtonClicked(3)}>
          Markdown Preview
        </button>
        <button className={classNames[3]} onClick={() => secondButtonClicked(4)}>
          Physics Demos
        </button>
        <button className={classNames[4]} onClick={() => secondButtonClicked(5)}>
          Roman Numeral converter
        </button>
        {/* TODO: change the below button to be "other" and redirect to another page */}
        <button className={classNames[5]} onClick={() => secondButtonClicked(6)}>
          Weather
        </button>
        <button className={classNames[6]} onClick={() => navigate("/kanban-board")}>
          Kanban Board
        </button>
      </div>
      {options2[place2]}
      <Links pageName="Home" />
      <div style={{height: "25px"}} />
      <GitHubModule />
    </>
  )
}

export default Home;