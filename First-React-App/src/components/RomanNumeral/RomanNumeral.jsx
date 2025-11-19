import { useState } from "react";

import ConvertToRomanNumerals from "./ConvertToRomanNumerals/ConvertToRomanNumerals.jsx";
import ConvertFromRomanNumerals from "./ConvertFromRomanNumerals/ConvertFromRomanNumerals.jsx";

export default function RomanNumeral() {

    const [convertingToNumerals, setConvertingToNumerals] = useState("");
    const [contentForNumerals, setContentForNumerals] = useState("");

    function setStates(val) {
        setConvertingToNumerals(val);
        if (val === "convertToNumerals") {
            setContentForNumerals(<ConvertToRomanNumerals />);
        } else {
            setContentForNumerals(<ConvertFromRomanNumerals />);
        }
    }

    return (
        <>
            {/* <p>{convertingToNumerals}</p> */}
            {/* will want to have radio button here for which type of conversion */}
            <label>
                Converting to Roman Numerals
                <input
                    type="radio"
                    name="convertNumeralsType"
                    value="convertToNumerals"
                    checked={convertingToNumerals === "convertToNumerals"}
                    onChange={(e) => setStates(e.target.value)}
                />
            </label>
            <label>
                Converting from Roman Numerals to decimal
                <input
                    type="radio"
                    name="convertNumeralsType"
                    value="convertFromNumerals"
                    checked={convertingToNumerals === "convertFromNumerals"}
                    onChange={(e) => setStates(e.target.value)}
                />
            </label>
            {contentForNumerals}
        </>
    )
}