import { useState } from "react";
import "./KanbanAddItem.css";

export default function KanbanAddItem({callback}) {
    const [addingItem, setAddingItem] = useState(false);

    // Kanban items:
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState(-1);

    const options = [
        {label: "--Select--", value: -1},
        {label: "In Progress", value: 0},
        {label: "Code Review", value: 1},
        {label: "Done", value: 2},
    ]

    const buttonStyle = {
        backgroundColor: "lightBlue",
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleOptionsChange = (e) => {
        setPlace(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setAddingItem(false);
        callback({title: title, description: description}, place);
    }

    const handleButtonClick = () => {
        if (addingItem) {
            setAddingItem(false);
        } else {
            setAddingItem(true);
            setTitle("");
            setDescription("");
            setPlace(-1);
        }
    }

    return (
        <>
            <button style={buttonStyle} onClick={handleButtonClick}>{addingItem ? "Close" : "Add Item"}</button>
            {addingItem && (
                <>
                    <form onSubmit={handleSubmit} className="kanban-form">
                        <label>
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Enter title here"
                                className="kanban-form-input"
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter Description"
                                className="kanban-form-input kanban-form-description"
                            />
                            {/* <input
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter Description"
                                className="kanban-form-input kanban-form-description"
                            /> */}
                        </label>
                        <label>
                            What state is it in:
                            <select value={place} onChange={handleOptionsChange} className="kanban-form-input">
                                {options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button style={buttonStyle} type="submit">Create</button>
                    </form>
                </>
            )}
        </>
    );
}
