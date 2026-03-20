import { useParams } from "react-router-dom"
import { recipes } from "../../utils/recipeUtils"
import "./RecipeDetail.css"

export default function RecipeDetail() {
    const { recipeSlug } = useParams();
    const recipe = recipes.find((r) => r.slug === recipeSlug);

    if (!recipe) return <h2>Recipe Not Found!</h2>

    return (
        <div className="recipe-div-v2">
            <hr />
            <h1>{recipe.title}</h1>
            <img src={recipe.image} style={{width: "25%", height: "auto"}}/>
            <h3>Description:</h3>
            <p>{recipe.description}</p>
            <div className="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    {recipe.ingredients.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="directions">
                <h3>Directions:</h3>
                <ol>
                    {recipe.instructions.map((instruction) => (
                        <li key={instruction}>{instruction}</li>
                    ))}
                </ol>
            </div>
        </div>
    )
}