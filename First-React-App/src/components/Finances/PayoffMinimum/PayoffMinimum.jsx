import { useState } from "react"
import "./PayoffMinimum.css"

export default function PayoffMinimum() {
    // These are to be entered by the user
    const [loanAmt, setLoanAmt] = useState("");
    const [interest, setInterest] = useState("");
    const [months, setMonths] = useState("");
    // To be calculated
    const [payoffAmt, setPayoffAmt] = useState(0);


    const handleSubmit = (e) => {
        e.preventDefault();
        let doubleInterest = parseFloat(interest) / 100.0 / 12.0;
        let pow = Math.pow(1 + doubleInterest, parseInt(months));
        setPayoffAmt(loanAmt * (doubleInterest * pow) / (pow - 1));

    }

    const handleLoanAmtChange = (e) => {
        setLoanAmt(e.target.value);
    }

    const handleInterestChange = (e) => {
        setInterest(e.target.value);
    }

    const handleMonthsChange = (e) => {
        setMonths(e.target.value);
    }

    return (
        <>
            <h3>This is for calculating minimum needed to pay off loan in x months</h3>

            <form onSubmit={handleSubmit}>
                <label>
                    Loan Amount $
                    <input
                        type="number"
                        value={loanAmt}
                        onChange={handleLoanAmtChange}
                    />
                </label>
                <label>
                    Interest on loan (i.e. 8.49)%
                    <input
                        type="number"
                        value={interest}
                        onChange={handleInterestChange}
                    />
                </label>
                <label>
                    Number of months loan is for #
                    <input
                        type="number"
                        value={months}
                        onChange={handleMonthsChange}
                    />
                </label>
                <button className="submitButton" type="submit">Calculate</button>
            </form>

            <h3>Minimum monthly payments to pay off ${loanAmt} at {interest}% in {months} months is: ${payoffAmt.toFixed(2)}</h3>
        </>
    )
}