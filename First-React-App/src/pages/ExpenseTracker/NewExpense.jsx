import { useState } from "react";
import "./ExpenseTracker.css";

export default function NewExpense({callbackFunction}) {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");

    const categories = [
        {value: "food", label: "Food"},
        {value: "home", label: "Home"},
        {value: "utilities", label: "Utilities"},
        {value: "transportation", label: "Transportation"},
        {value: "groceries", label: "Groceries"}
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        callbackFunction({
            date: date,
            amount: amount,
            description: description,
            category: category
        });
    }

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="expense-form">
                <label>
                    Date 
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                    />
                </label>
                <label>
                    Description
                    <input
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </label>
                <label>
                    Amount $
                    <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </label>
                <label>
                    Category:
                    <select
                        id="category-select"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="">--Select a Category--</option>
                        {categories.map((categ) => (
                            <option key={categ.value} value={categ.value}>
                                {categ.label}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="button-group">
                    <span className="label-spacer"></span>
                    <button type="submit">Add Expense</button>
                </div>
            </form>
        </>
    )
}
