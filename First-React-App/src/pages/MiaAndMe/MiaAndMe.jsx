import { useState } from "react"

import Links from "../../components/Links/Links.jsx"

import hawaiiImage from "../../assets/hawaiiImage.jpg"
import cruise1 from "../../assets/cruise1.jpg"
import mexico from "../../assets/mexico.jpg"
import cruise2 from "../../assets/cruise2.jpg"
import proposal from "../../assets/Proposal.jpg"
import kissing from "../../assets/Kissing.jpg"
import boatItaly from "../../assets/Boat.jpg"
import margaritaville1 from "../../assets/Margaritaville1.jpg"
import margaritaville2 from "../../assets/Margaritaville2.jpg"
import californiaWedding from "../../assets/CaliforniaWedding.jpg"


import "./MiaAndMe.css"

function OurInfo() {
    return (
        <>
            <h2>Our Anniversary:</h2>
            <p>06/25/2020</p>
            <h2>All of our trips</h2>
            <ul className="trip-list">
                <li className="trip-item">
                    <p className="trip-title">Hawaii - Aug 2022</p>
                    <div className="image-gallery">
                        {/* <img src={hawaiiImage} className="me-image vertical-image" /> */}
                        <img src={hawaiiImage} className="new-me-image" />
                    </div>
                </li>
                <li className="trip-item">
                    <p className="trip-title">Cruise 1 (Bahamas) - Oct 2023</p></li>
                    <div className="image-gallery">
                        <img src={cruise1} className="new-me-image" />
                    </div>
                <li className="trip-item">
                    <p className="trip-title">Mexico all inclusive - May 2024</p>
                    <div className="image-gallery">
                        <img src={mexico} className="new-me-image" />
                    </div>
                </li>
                <li className="trip-item">
                    <p className="trip-title">Cruise3 (Margaritaville/Bahamas stay trip) Jul/Aug 2024</p>
                    <div className="image-gallery">
                        <img src={margaritaville1} className="new-me-image" />
                        <img src={margaritaville2} className="new-me-image" />
                    </div>
                </li>
                <li className="trip-item">
                    <p className="trip-title">Cruise 2 (California/Mexico)(Mike KP wedding) - Nov/Dec 2024</p>
                    <div className="image-gallery">
                        <img src={cruise2} className="new-me-image" />
                        <img src={californiaWedding} className="new-me-image" />
                    </div>
                </li>
                <li className="trip-item">
                    <p className="trip-title">Italy - Oct 2025</p>
                    <div className="image-gallery">

                        <img src={proposal} className="new-me-image" />
                        <img src={kissing} className="new-me-image" />
                        <img src={boatItaly} className="new-me-image" />
                    </div>
                    <p>I may have broken my Maui Jimmies here by hitting my freaking head on a door frame in ITALY 2X</p>
                </li>
                <li className="trip-item">
                    <p className="trip-title">Cruise 4 back to the bahamas (THIS WAS SHIT WE BOTH GOT THE FLU)(Quarantined)</p>
                    <p>Also the boat kinda sucked, no cruise director, no shows in the theater, sinking ship testing!!!</p>
                </li>
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