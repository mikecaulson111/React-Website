import { useState } from "react";
import PayoffFixed from './PayoffFixed/PayoffFixed.jsx'
import PayoffMinimum from './PayoffMinimum/PayoffMinimum.jsx'
import WorstTaxes from './WorstTaxes/WorstTaxes.jsx'
import { useNavigate } from "react-router-dom";

import "./Finances.css"


export default function() {
    const [place, setPlace] = useState(0);
    const [thisClassName, setThisClassName] = useState(["myButton","myButton","myButton", "myButton"]);

    const navigate = useNavigate();

    let options = ["", <PayoffFixed />, <PayoffMinimum />, <WorstTaxes />, ""];

    function buttonClicked(tempPlace) {
      setPlace(tempPlace);
      setThisClassName((thisClassName) => thisClassName.map((item, i) => (i === tempPlace -1 ? "myButtonSelected" : "myButton")));
    }

    return (
      <>
        <div className="button-menu">
          <button className={thisClassName[0]} onClick={() => buttonClicked(1)}>
            Total Payoff Amount
          </button>
          <button className={thisClassName[1]} onClick={() => buttonClicked(2)}>
            Minimum to payoff loan in x time
          </button>
          <button className={thisClassName[2]} onClick={() => buttonClicked(3)}>
            Worst case taxes
          </button>
          <button className={thisClassName[3]} onClick={() => navigate("/expense-tracker")}>
            Expense Tracker
          </button>
        </div>
      {options[place]}
      </>
    );
}
