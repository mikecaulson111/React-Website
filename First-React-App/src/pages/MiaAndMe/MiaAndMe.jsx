import { useState } from "react"

// Components
import Links from "../../components/Links/Links.jsx"
import BlurUpImage from "../../components/BlurUpImage/BlurUpImage.jsx"

// Images
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
import cruise4 from "../../assets/cruise4.jpeg"
import fluCruise from "../../assets/with_the_flu.jpeg"

//Compressed Images
import hawaiiImageCompressed from "../../assets/Compressed/hawaiiImage_compressed.webp"
import cruise1Compressed from "../../assets/Compressed/cruise1_compressed.webp"
import mexicoCompressed from "../../assets/Compressed/mexico_compressed.webp"
// import cruise2Compressed from "../../assets/Compressed/cruise2_compressed.webp"
// import proposalCompressed from "../../assets/Compressed/Proposal_compressed.webp"
// import kissingCompressed from "../../assets/Compressed/Kissing_compressed.webp"
// import boatItalyCompressed from "../../assets/Compressed/Boat_compressed.webp"
// import margaritaville1Compressed from "../../assets/Compressed/Margaritaville1_compressed.webp"
// import margaritaville2Compressed from "../../assets/Compressed/Margaritaville2_compressed.webp"
// import californiaWeddingCompressed from "../../assets/Compressed/CaliforniaWedding_compressed.webp"
// import cruise4Compressed from "../../assets/Compressed/cruise4_compressed.webp"
// import fluCruiseCompressed from "../../assets/Compressed/with_the_flu_compressed.webp"



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
                        <BlurUpImage tinySrc={hawaiiImageCompressed} largeSrc={hawaiiImage} myClassName="new-me-image" />
                    </div>
                </li>
                <li className="trip-item">
                    <p className="trip-title">Cruise 1 (Bahamas) - Oct 2023</p></li>
                    <div className="image-gallery">
                        <BlurUpImage tinySrc={cruise1Compressed} largeSrc={cruise1} myClassName="new-me-image" />
                    </div>
                <li className="trip-item">
                    <p className="trip-title">Mexico all inclusive - May 2024</p>
                    <div className="image-gallery">
                        <BlurUpImage tinySrc={mexicoCompressed} largeSrc={mexico} myClassName="new-me-image" />
                    </div>
                </li>
                <li className="trip-item">
                    <p className="trip-title">Cruise 2 (Margaritaville/Bahamas stay trip) Jul/Aug 2024</p>
                    <div className="image-gallery">
                        <img src={margaritaville1} className="new-me-image" />
                        <img src={margaritaville2} className="new-me-image" />
                    </div>
                </li>
                <li className="trip-item">
                    <p className="trip-title">Cruise 3 (California/Mexico)(Mike KP wedding) - Nov/Dec 2024</p>
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
                    <div className="image-gallery">
                        <img src={cruise4} className="new-me-image" />
                        <img src={fluCruise} className="new-me-image" />
                    </div>
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
            <button onClick={toggleInfo} className="mia-button">Toggle Info</button>
            {displayInfo ? <OurInfo /> : ""}
            <Links pageName="MiaAndMe" />
        </>
    )
}