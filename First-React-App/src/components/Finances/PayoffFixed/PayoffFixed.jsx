import { useState } from "react"
import "./PayoffFixed.css"


// This is for calculating total payoff when you pay a fixed amount each montho

export default function PayoffFixed() {
    // These are user inputted
    const [currLoanAmt, setCurrLoanAmt] = useState("");
    const [interest, setInterest] = useState("");
    const [amtPerMonth, setAmtPerMonth] = useState("");
    // Below are for calculating at the end
    const [months, setMonths] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [cantCompute, setCantCompute] = useState("");

    // Other variables
    const [interestColor, setInterestColor] = useState("");

    const handleLoanAmtChange = (e) => {
        setCantCompute("");
        setInterestColor("");
        setCurrLoanAmt(e.target.value);
    }

    const handleInterestChange = (e) => {
        setCantCompute("");
        setInterestColor("");
        setInterest(e.target.value);
    }

    const handleAmtPerMonthChange = (e) => {
        setCantCompute("");
        setInterestColor("");
        setAmtPerMonth(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("Total: " + currLoanAmt);
        // console.log("Interest: " + interest);
        // console.log("Amount per month: " + amtPerMonth);

        // Local variables needed
        let interestHere = parseFloat(interest);
        var currAmt = parseFloat(currLoanAmt);
        var totInterest = 0;
        var month = 0;

        if ((currAmt - amtPerMonth) * ((interestHere / 100.0) / 12) > amtPerMonth) {
            console.error("CAN NEVER PAY THIS OFF");
            setCantCompute("YOU WILL NEVER BE ABLE TO PAY OFF THIS LOAN WITH THESE MONTHLY PAYMENTS");
            return;
        }

        while (currAmt > 0) {
            var holdingAmt = currAmt;
            var dailyInterest = holdingAmt * ((interestHere / 100.0) / 12);
            var accumulatedInterest = 0;

            accumulatedInterest += dailyInterest;
            totInterest += accumulatedInterest;
            currAmt = currAmt + accumulatedInterest - amtPerMonth;

            if (currAmt < 0) {
                currAmt = 0;
            }
            month += 1;
        }

        setTotalInterest(totInterest);
        if (totInterest > 0) {
            setInterestColor("funColors");
        }
        setMonths(month);
    }

    return (
        <>
            <h3>Payoff With Fixed amount each month</h3>

            <div>
                <form onSubmit={handleSubmit}>
                        <label>
                            Loan Amount $
                            <input
                                type="number"
                                value={currLoanAmt}
                                onChange={handleLoanAmtChange}
                            />
                        </label>
                        <label>
                            Interest (as decimal i.e. 8.49) %
                            <input
                                type="number"
                                value={interest}
                                onChange={handleInterestChange}
                            />
                        </label>
                        <label>
                            Amount paid per month $
                            <input
                                type="number"
                                value={amtPerMonth}
                                onChange={handleAmtPerMonthChange}
                            />
                        </label>
                    <button className="submitButton" type="submit">Calculate</button>
                </form>
            </div>

            <h3 className="alertColors">{cantCompute}</h3>
            <h3>Total Payoff Amount: ${currLoanAmt} will be paid off in {months} months, and you will pay $<span className={interestColor}>{totalInterest.toFixed(2)}</span> in interest</h3>
        </>
    );
}