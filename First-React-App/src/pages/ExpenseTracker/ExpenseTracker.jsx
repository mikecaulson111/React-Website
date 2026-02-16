import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { formatCurrency } from "../../utils/currencyUtils";

import NewExpense from "./NewExpense";
import "./ExpenseTracker.css";
import { useAuth } from "../../components/AuthContext/AuthContext";
import Login from "../../components/Login/Login.jsx";
import Links from "../../components/Links/Links.jsx";

export default function ExpenseTracker() {
    const [expenseData, setExpenseData] = useState([]);
    const [showNewExpense, setShowNewExpense] = useState(false);

    const {user, loading} = useAuth();

    const updateNewExpense = () => {
        setShowNewExpense(!showNewExpense);
    }

    const handleAddExpense = async (vals) => {
        const {data, error} = await supabase
            .from('budget_tracker')
            .insert([
                {
                    amount: parseFloat(vals.amount),
                    category: vals.category,
                    description: vals.description,
                    date: vals.date
                }
            ])
            .select('amount, description, date, category, id');

        if (error) {
            console.error("Error:", error)
        } else if (data) {
            setExpenseData((prev) => [...prev, data[0]]);
            setShowNewExpense(false);
        }
    }

    const getInitialData = async () => {
        const {data, error} = await supabase
            .from('budget_tracker')
            .select('amount, description, date, category, id');

        if (error) {
            console.error("error:", error);
        } else if (data) {
            setExpenseData(data);
        }
    }


    const callbacker = (vals) => {
        handleAddExpense(vals);
    }

    useEffect(() => {
        getInitialData();
    }, []);

    useEffect(() => {
        if (!loading && user) {
            getInitialData();
        }
    }, [user, loading])


    return (
        <>
            <h2>Expense Tracker</h2>
            {user &&
            <div>
            <div className="table-container">
                <table className="modern-table">
                    <thead>
                        <tr>
                            <th>Date:</th>
                            <th>Description:</th>
                            <th>Amount:</th>
                            <th>Category:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseData && expenseData.map((element) => (
                            <tr key={element.id}>
                                <td>
                                    {element.date}
                                </td>
                                <td>
                                    {element.description}
                                </td>
                                <td className="amount-cell">
                                    {formatCurrency(element.amount)}
                                </td>
                                <td>
                                    <span className={`badge-${element.category.toLowerCase()}`}>
                                        {element.category}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button
                onClick={updateNewExpense}
                style={{marginTop: "20px", marginBottom: "15px", backgroundColor: "#b9c9c1"}}
            >
                {showNewExpense ? "Hide new expense" : "Add new expense"}
            </button>
            {showNewExpense && <NewExpense callbackFunction={callbacker}/>}
            </div>
            }
            {!user && 
            <div>
                <h3>Please sign in</h3>
                <Login />
            </div>}
            <Links />
        </>
    );
}
