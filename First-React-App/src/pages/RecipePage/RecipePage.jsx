import { useState } from "react"
import RecipeOverview from "../../components/RecipeOverview/RecipeOverview"
import { recipes } from "../../utils/recipeUtils";

export default function RecipePage() {

    const [showingRecipe, setShowingRecipe] = useState(-1);

    function recipeCallback(id) {
        console.log("Button clicked:", id);
    }

    return (
        <>
            <hr />
            <h1>Recipes</h1>
            {/* this will be where I have the components that I will create, and probably get them from the database */}
            {/* <RecipeOverview /> */}
            {recipes.map(recipe => (
                <RecipeOverview key={recipe.id} {...recipe} callback={recipeCallback} />
            ))}
        </>
    )
}
