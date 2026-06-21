import { useNavigate } from "react-router-dom";
import "../PhysicsDemos/PhysicsDemos.css";

export default function CodingExamples() {
    const navigate = useNavigate();

    const handleSelection = () => {
        navigate("/selection-sort");
    }

    const handleBubble = () => {
        navigate("/bubble-sort");
    }

    const handleInsertion = () => {
        navigate("/insertion-sort");
    }

    const handleBinary = () => {
        navigate("/binary-tree");
    }

    return (
        <>
            <h3>Coding Examples:</h3>
            <button className="physics-button" style={{marginTop: "10px"}} onClick={handleSelection}>Selection Sort</button>
            <button className="physics-button" style={{marginTop: "10px"}} onClick={handleBubble}>Bubble Sort</button>
            <button className="physics-button" style={{marginTop: "10px"}} onClick={handleInsertion}>Insertion Sort</button>
            <button className="physics-button" style={{marginTop: "10px"}} onClick={handleBinary}>Binary Tree</button>
        </>
    )
}
