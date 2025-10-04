import { useNavigate } from "react-router-dom"

import "./PhysicsDemos.css"

export default function PhysicsDemos() {
    const navigate = useNavigate();

    const handleStandingWaves = () => {
        navigate("/standing-waves");
    }

    const handleBouncingBlocks = () => {
        navigate("/bouncing-blocks");
    }

    return (
        <div className="button-menu">
            <button className="physics-button" onClick={handleStandingWaves}>Standing Waves</button>
            <button className="physics-button" onClick={handleBouncingBlocks}>Bouncing Blocks</button>
        </div>
    );
}