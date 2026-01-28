import { useState } from "react";

import "../RomanNumerals.css";

export default function ConvertToRomanNumerals() {
    const romanLetters = ['I', "IV", 'V', "IX", 'X', "XL", 'L', "XC", 'C', "CD", 'D', "CM", 'M'];
    const romanVals    = [ 1, 4, 5, 9, 10, 40, 50, 90, 100, 400, 500, 900, 1000];

    const [numberToConvert, setNumberToConvert] = useState("");
    const [convertedNumber, setConvertedNumber] = useState("");

    const handleSetNumberToConvert = (e) => {
        setNumberToConvert(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var currVal = numberToConvert;
        var place = romanLetters.length - 1;
        var romanTot = "";
        var counter = 0;
    
        while (currVal > 0 && counter < 100) {
            if (currVal - romanVals[place] >= 0) {
                romanTot += romanLetters[place];
                currVal -= romanVals[place];
            } else {
                if (place !== 0) {
                    place -= 1;
                }
            }
            counter += 1;
        }
        setConvertedNumber(romanTot);
    }

    return (
        <>
            <h2 className="section-name-roman">Converting to roman numerals</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>
                        Number to convert to Roman Numerals: 
                    </p>
                    <input
                        type="number"
                        value={numberToConvert}
                        onChange={handleSetNumberToConvert}
                    />
                </label>
                <button className="submitButton">Convert</button>
            </form>
            <h3>Here is the converted number: {convertedNumber}</h3>
        </>
    )
}