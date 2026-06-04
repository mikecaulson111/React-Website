import { useNavigate } from "react-router-dom";
import "../PhysicsDemos/PhysicsDemos.css";

export default function CodingExamples() {
    const navigate = useNavigate();

    const handleSelection = () => {
        navigate("/selection-sort");
    }

    return (
        <>
            <h3>Coding Examples:</h3>
            <button className="physics-button" onClick={handleSelection}>Selection Sort</button>
        </>
    )
}