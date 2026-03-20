import { Link } from "react-router-dom"
import "./RecipeOverview.css"
// MJC might need to add the function parameters to accept all the info to be displayed
export default function RecipeOverview({id, title, time, difficulty, image, slug}) {
    return (
        <div className="recipe-div">
            <img src={image} alt={title} className="recipe-image" />
            <div className="recipe-details">
                <h3>{title}</h3>
                <p>⏱ {time} | 👨‍🍳 {difficulty}</p>
                {/* <button className="view-button" onClick={() => callback(id)}>View Recipe</button> */}
                <Link to={`/recipes/${slug}`} className="view-button">View Recipe</Link>
            </div>
        </div>
    )
}
