import cornerImage from "../../assets/new_logo.png"
import { useNavigate } from "react-router-dom"

import "./CornerImage.css"

export default function CornerImage() {
    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate("/");
    }
    return (
        <button onClick={handleGoHome} className="corner-button corner-image top-right">
            {/* // TODO: need a new image for this and icon */}
            <img src={cornerImage} className="corner-image top-right" />
        </button>
    );
}