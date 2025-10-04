import { useNavigate } from "react-router-dom"

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
            <button onClick={handleStandingWaves}>Standing Waves</button>
            <button onClick={handleBouncingBlocks}>Bouncing Blocks</button>
        </div>
    );
}