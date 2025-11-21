import { useState } from "react";

import "../RomanNumerals.css";

export default function ConvertFromRomanNumerals() {
    const romanLetters = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
    const romanVals    = [ 1,   5,   10,  50,  100, 500, 1000];

    const [numberToConvert, setNumberToConvert] = useState("");
    const [convertedNumber, setConvertedNumber] = useState("");

    const handleSetNumberToConvert = (e) => {
        setNumberToConvert(e.target.value);
    }

    function getVal(character, nextChar = 'B') {
        character = character.toUpperCase();
        nextChar = nextChar.toUpperCase();
        for(var j = 0; j < romanLetters.length; j++) {
            if (romanLetters[j] === character) {
                // if (nextChar !== 'B') {
                //     for (var k = 0; k < romanLetters.length; k++) {
                //         if (nextChar === romanLetters[k]) {
                //             if (k > j+1) {
                //                 console.error("HERE: ", character, nextChar);
                //                 return -2;
                //             }
                //             break;
                //         }
                //     }
                // }
                return romanVals[j];
            }
        }
        return -1;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var calculatedVal = 0;

        for (var i = numberToConvert.length - 1; i >= 0; i--) {
            console.log(numberToConvert[i], calculatedVal);
            var currVal = getVal(numberToConvert[i]);
            if (currVal === -1) {
                setConvertedNumber("Error Character not allowed: " + numberToConvert[i]);
                return;
            }
            calculatedVal += currVal;
            if (i !== 0) {
                var prevVal = getVal(numberToConvert[i-1], numberToConvert[i]);
                if (prevVal === -1) {
                    setConvertedNumber("Error Character not allowed: " + numberToConvert[i - 1]);
                    return;
                } else if (prevVal === -2) {
                    setConvertedNumber("Error You must enter only valid Roman Numerals, " + numberToConvert[i - 1] + " cannot be followed by " + numberToConvert[i]);
                }
                if (prevVal < currVal) {
                    calculatedVal -= prevVal; 
                    i -= 1;
                }
            }
        }

        setConvertedNumber(calculatedVal);
    }

    return (
        <>
            <h2 className="section-name-roman">Converting from roman numerals</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>
                        Roman Numerals to convert back to integer: 
                    </p>
                    <input
                        type="text"
                        value={numberToConvert}
                        onChange={handleSetNumberToConvert}
                    />
                </label>
                <button className="submitButton">Convert</button>
            </form>

            <h3>Here is the converted value: {convertedNumber}</h3>
        </>
    )
}