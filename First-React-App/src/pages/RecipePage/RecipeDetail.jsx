import { useState, useEffect} from "react"
import { supabase } from "../../utils/supabase.js"
import { useParams, Link } from "react-router-dom"
import { recipes } from "../../utils/recipeUtils"
import backImage from "../../assets/back-arrow.svg"
import Links from "../../components/Links/Links.jsx"
import "./RecipeDetail.css"

export default function RecipeDetail() {
    const { recipeSlug } = useParams();

    // var recipe;

    const [recipe, setRecipe] = useState();
    const getRecipeData = async () => {
        const {data, error} = await supabase
            .from("Recipes")
            .select("*")
            .eq("slug", recipeSlug);

        if (error) {
            console.error("failed to get recipe:", recipeSlug, error);
        } else {
            setRecipe(data[0]);
        }
    }
    // const recipe = recipes.find((r) => r.slug === recipeSlug);

    useEffect(() => {
        getRecipeData();
    }, []);

    if (!recipe) return <h2>Recipe Not Found!</h2>

    return (
        <div className="recipe-div-v2">
            <hr />
            <Link to={"/recipes"}><img src={backImage} style={{width: "30px", height: "auto", marginTop: "10px"}} /></Link>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} style={{width: "45%", maxWidth: "350px", height: "auto"}}/>
            <h3>Description:</h3>
            <p>{recipe.description}</p>
            <p style={{textDecoration: "underline"}}>Total Time: {recipe.time}</p>
            <div className="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    {recipe.ingredients && recipe.ingredients.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="directions">
                <h3>Directions:</h3>
                <ol>
                    {recipe.instructions && recipe.instructions.map((instruction) => (
                        <li key={instruction}>{instruction}</li>
                    ))}
                </ol>
            </div>
            <Links />
        </div>
    )
}
