import { useState } from "react"
import "./WorstTaxes.css"

const taxValues = [
    [0, 11925, 10],
    [11925, 48475, 12],
    [48475, 103350, 22],
    [103350, 197300, 24],
    [197300, 250525, 32],
    [250525, 626350, 35],
    [626350, 10000000000, 37]
];

const standardDeductionSingle = 15750;
const standardDeductionJoint  = 31500;
const standardDeductionHoH    = 23625;
const numberBrackets = 7;

export default function WorstTaxes() {
    const [income, setIncome] = useState("");
    const [filingStatus, setFilingStatus] = useState("");
    const [taxesTotal, setTaxesTotal] = useState("");

    const handleIncomeChange = (e) => {
        setIncome(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(income);
        console.log(filingStatus);

        var incomeHere = parseFloat(income);
        var totalTaxes = 0;
        var tempValue = 0;
        if (filingStatus === "single") {
            incomeHere -= standardDeductionSingle;
        } else if (filingStatus === "joint") {
            incomeHere -= standardDeductionJoint;
        } else {
            incomeHere -= standardDeductionHoH;
        }

        console.log(incomeHere);

        for (var i = 0; i < numberBrackets; i++) {
            console.log(typeof taxValues[i][0]);
            if (incomeHere > taxValues[i][1]) {
                tempValue = taxValues[i][1] - taxValues[i][0];
                tempValue *= (taxValues[i][2] / 100.0);
                totalTaxes += tempValue;
            } else {
                tempValue = incomeHere - taxValues[i][0];
                tempValue *= (taxValues[i][2] / 100.0);
                totalTaxes += tempValue;
                break;
            }
        }

        totalTaxes = (totalTaxes < 0) ? 0 : totalTaxes;
        setTaxesTotal(totalTaxes);
    }

    return (
    <>
        <h3>This is to calculate worst case tax scenario (with only standard deduction)</h3>

        <form onSubmit={handleSubmit}>
            <label>
                Yearly Income $
                <input
                    type="number"
                    value={income}
                    onChange={handleIncomeChange}
                />
            </label>

            <h4>What is your filing status</h4>

            <label>
                Single
                <input
                    type="radio"
                    name="filingStatus"
                    value="single"
                    checked={filingStatus === "single"}
                    onChange={(e) => setFilingStatus(e.target.value)}
                />
            </label>
            <label>
                Joint
                <input
                    type="radio"
                    name="filingStatus"
                    value="joint"
                    checked={filingStatus === "joint"}
                    onChange={(e) => setFilingStatus(e.target.value)}
                />
            </label>
            <label>
                Head of Household
                <input
                    type="radio"
                    name="filingStatus"
                    value="headOfHousehold"
                    checked={filingStatus === "headOfHousehold"}
                    onChange={(e) => setFilingStatus(e.target.value)}
                />
            </label>
            <button className="submitButton" type="submit">Calculate</button>
        </form>

        <h3>Total taxes (worst case) with annual income of ${income} filing as status: {filingStatus} comes out to: ${taxesTotal}</h3>
    </>
    )
}