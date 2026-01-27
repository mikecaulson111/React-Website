import { useState } from "react"
import "./WorstTaxes.css"

const taxValuesSingle = [
    [0, 11600, 10],
    [11601, 47150, 12],
    [47151, 100525, 22],
    [100526, 191950, 24],
    [191951, 243725, 32],
    [243726, 609350, 35],
    [609351, 10000000000, 37]
];

const taxValuesJoint = [
    [0, 23200, 10],
    [23201, 94300, 12],
    [94301, 201050, 22],
    [201051, 383900, 24],
    [383901, 487450, 32],
    [487451, 731200, 35],
    [731201, 10000000000, 37]
];

const taxValuesHoH = [
    [0, 16550, 10],
    [16551, 63100, 12],
    [63101, 100500, 22],
    [100501, 191950, 24],
    [191951, 243700, 32],
    [243701, 609350, 35],
    [609351, 10000000000, 37]
];

const standardDeductionSingle = 15750;
const standardDeductionJoint  = 31500;
const standardDeductionHoH    = 23625;
const numberBrackets = 7;

export default function WorstTaxes() {
    const [income, setIncome] = useState("");
    const [filingStatus, setFilingStatus] = useState("");
    const [taxesTotal, setTaxesTotal] = useState(0);

    const handleIncomeChange = (e) => {
        setIncome(e.target.value);
        // const rawValue = e.target.value;
        // const numericVal = rawValue.replace(/[$,]/g, '');
        // if (!isNaN(numericVal) && numericVal !== '') {
        //     setIncome(parseFloat(numericVal));
        // } else if (numericVal === '') {
        //     setIncome(0);
        // }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var incomeHere = parseFloat(income);
        var totalTaxes = 0;
        var tempValue = 0;
        var taxValues = [];
        if (filingStatus === "single") {
            incomeHere -= standardDeductionSingle;
            taxValues = [...taxValuesSingle];
        } else if (filingStatus === "joint") {
            incomeHere -= standardDeductionJoint;
            taxValues = [...taxValuesJoint];
        } else {
            incomeHere -= standardDeductionHoH;
            taxValues = [...taxValuesHoH];
        }

        for (var i = 0; i < numberBrackets; i++) {
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

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(value);
    };

    const updateFilingStatus = (value) => {
        setFilingStatus(value);
        setTaxesTotal(0);
    }

    return (
    <>
        <h3>This is to calculate worst case tax scenario (with only standard deduction)</h3>

        <form onSubmit={handleSubmit}>
            <label>
                Yearly Income $
                <input
                    type="number"
                    // value={formatCurrency(income)}
                    value={income}
                    onChange={handleIncomeChange}
                    // placeholder="$0.00"
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
                    onChange={(e) => updateFilingStatus(e.target.value)}
                />
            </label>
            <label>
                Joint
                <input
                    type="radio"
                    name="filingStatus"
                    value="joint"
                    checked={filingStatus === "joint"}
                    onChange={(e) => updateFilingStatus(e.target.value)}
                />
            </label>
            <label>
                Head of Household
                <input
                    type="radio"
                    name="filingStatus"
                    value="headOfHousehold"
                    checked={filingStatus === "headOfHousehold"}
                    onChange={(e) => updateFilingStatus(e.target.value)}
                />
            </label>
            <button className="submitButton" type="submit">Calculate</button>
        </form>

        <h3>Total taxes (worst case) with annual income of {formatCurrency(income)} filing as status: {filingStatus} comes out to: {taxesTotal ? formatCurrency(taxesTotal) : ""}</h3>
    </>
    )
}