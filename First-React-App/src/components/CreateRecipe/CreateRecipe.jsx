import { useState } from "react";
import { supabase } from "../../utils/supabase";
import "../../pages/ExpenseTracker/ExpenseTracker.css";

export default function CreateRecipe({callbackFunc}) {
    const [title, setTitle]               = useState("");
    const [time, setTime]                 = useState("");
    const [difficulty, setDifficulty]     = useState("");
    const [image, setImage]               = useState("");
    const [description, setDescription]   = useState("");
    const [ingredients, setIngredients]   = useState("");
    const [instructions, setInstructions] = useState("");
    const [slug, setSlug]                 = useState("");

    const handleAddRecipe = async () => {
        const {data, error} = await supabase
            .from("Recipes")
            .insert([
                {
                    title: title,
                    time: time,
                    difficulty: difficulty,
                    image: image,
                    description: description,
                    ingredients: JSON.parse(ingredients),
                    instructions: JSON.parse(instructions),
                    slug: slug
                }
            ]);
        
            if (error) {
                console.error("failed to save recipe");
            } else {
                console.log("Sent recipe successfully");
                callbackFunc();
            }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        handleAddRecipe();
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleTimeChange = (e) => {
        setTime(e.target.value);
    }
    const handleDifficultyChange = (e) => {
        setDifficulty(e.target.value);
    }
    const handleImageChange = (e) => {
        setImage(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    const handleIngredientsChange = (e) => {
        setIngredients(e.target.value);
    }
    const handleInstructionsChange = (e) => {
        setInstructions(e.target.value);
    }
    const handleSlugChange = (e) => {
        setSlug(e.target.value);
    }

    return (
        <>
            <h3>Enter new Recipe:</h3>
            <form onSubmit={handleSubmit} className="expense-form">
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </label>
                <label>
                    Time it takes
                    <input
                        type="text"
                        value={time}
                        onChange={handleTimeChange}
                    />
                </label>
                <label>
                    Difficulty
                    <input
                        type="text"
                        value={difficulty}
                        onChange={handleDifficultyChange}
                    />
                </label>
                <label>
                    Image
                    <input
                        type="text"
                        value={image}
                        onChange={handleImageChange}
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
                    Ingredients
                    <input
                        type="text"
                        value={ingredients}
                        onChange={handleIngredientsChange}
                    />
                </label>
                <label>
                    Instructions
                    <input
                        type="text"
                        value={instructions}
                        onChange={handleInstructionsChange}
                    />
                </label>
                <label>
                    Slug (use lower case and dashes -)
                    <input
                        type="text"
                        value={slug}
                        onChange={handleSlugChange}
                    />
                </label>
                <div className="button-group">
                    <span className="label-spacer"></span>
                    <button type="submit">Add Expense</button>
                </div>
            </form>
        </>
    )
}
