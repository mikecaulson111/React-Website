import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase.js";
import RecipeOverview from "../../components/RecipeOverview/RecipeOverview";
import Links from "../../components/Links/Links.jsx";
import { recipes } from "../../utils/recipeUtils";

export default function RecipePage() {

    const [showingRecipe, setShowingRecipe] = useState(-1);
    const [recipeData, setRecipeData] = useState();

    const getInitialData = async () => {
        const {data, error} = await supabase
            .from("Recipes")
            .select("id, title, time, difficulty, image, slug");
        
        if (error) {
            console.error("error: ", error);
        } else {
            setRecipeData(data);
        }
    }

    function recipeCallback(id) {
        console.log("Button clicked:", id);
    }

    useEffect(() => {
        getInitialData();
    }, []);

    return (
        <>
            <hr />
            <h1>Recipes</h1>
            {/* this will be where I have the components that I will create, and probably get them from the database */}
            {/* <RecipeOverview /> */}
            {/* {recipes.map(recipe => (
                <RecipeOverview key={recipe.id} {...recipe} callback={recipeCallback} />
            ))} */}
            {recipeData && recipeData.map(recipe => (
                <RecipeOverview key={recipe.id} {...recipe} callback={recipeCallback} />
            ))}
            <Links />
        </>
    )
}
