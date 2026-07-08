import { useState } from "react";
import "./MathFunctions.css";

import ChangeOfBasisCalculator from "./ChangeOfBasisCalculator";
import RowReductionCalculator from "./RowReductionCalculator";

const functions = ["", <ChangeOfBasisCalculator />, <RowReductionCalculator />];

export default function MathFunctions() {
    const [displayer, setDisplayer] = useState(0);
    const setFunction = (number) => {
        setDisplayer(number);
    }
    return (
        <>
            <button className="math-button" onClick={() => setFunction(1)} >
                Change of Basis
            </button>
            <button className="math-button" onClick={() => setFunction(2)} >
                Row Reduction Echelon Form
            </button>
            <div style={{"paddingTop": "25px"}}>
                {functions[displayer]}
            </div>
        </>
    )
}