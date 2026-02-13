import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";

import NewExpense from "./NewExpense";

export default function ExpenseTracker() {
    const [expenseData, setExpenseData] = useState([]);

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

    getInitialData();

    return (
        <>
            <h2>Expense Tracker</h2>
            <table>
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
                                <p>{element.date}</p>
                            </td>
                            <td>
                                <p>{element.description}</p>
                            </td>
                            <td>
                                <p>{element.amount}</p>
                            </td>
                            <td>
                                <p>{element.category}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <NewExpense callbackFunction={callbacker}/>
        </>
    );
}