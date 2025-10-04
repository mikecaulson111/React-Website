import { useState } from "react"

import Links from "../../components/Links/Links.jsx"

import hawaiiImage from "../../assets/hawaiiImage.jpg"
import cruise1 from "../../assets/cruise1.jpg"
import mexico from "../../assets/mexico.jpg"
import cruise2 from "../../assets/cruise2.jpg"

import "./MiaAndMe.css"

function OurInfo() {
    return (
        <>
            <h2>Our Anniversary:</h2>
            <p>06/25/2020</p>
            <h2>All of our trips</h2>
            <ul className="trip-list">
                <li className="trip-item">Hawaii - Aug 2022</li>
                <img src={hawaiiImage} className="me-image" />
                <li>Cruise 1 (Bahamas) - Oct 2023</li>
                <img src={cruise1} className="me-image" />
                <li>Mexico all inclusive - May 2023</li>
                <img src={mexico} className="me-image" />
                <li>Cruise 2 (California/Mexico) - Nov/Dec 2024</li>
                <img src={cruise2} className="me-image" />
                <li>Italy - Oct 2025</li>
            </ul>
        </>
    )
}

export default function MiaAndMe() {
    const [displayInfo, setDisplayInfo] = useState(false)

    const toggleInfo = () => {
      if (displayInfo) {
        setDisplayInfo(false);
      }   else {
        setDisplayInfo(true);
      }
    }

    return (
        <>
            <h2> Me and Mia </h2>
            {/* I was thinking about putting in some images here */}
            <button onClick={toggleInfo}>Toggle Info</button>
            {displayInfo ? <OurInfo /> : ""}
            <Links pageName="MiaAndMe" />
        </>
    )
}