import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase.js";
import RecipeOverview from "../../components/RecipeOverview/RecipeOverview";
import CreateRecipe from "../../components/CreateRecipe/CreateRecipe.jsx";
import Links from "../../components/Links/Links.jsx";
import { useAuth } from "../../components/AuthContext/AuthContext.jsx";
import Login from "../../components/Login/Login.jsx";
import { recipes } from "../../utils/recipeUtils";

function ShowSuccess({ isFadingOut }) {
    return (
    <div style={{
        padding: '15px',
        backgroundColor: '#d4edda',
        color: '#155724',
        borderRadius: '5px',
        textAlign: 'center',
        transition: 'opacity 0.5s ease-out',
        opacity: isFadingOut ? 0 : 1
    }}>
        <h3>Successfully added Recipe!!!</h3>
    </div>
    );
}

export default function RecipePage() {

    const [showSuccess, setShowSuccess] = useState(false);
    const [recipeData, setRecipeData] = useState();
    const [isFadingOut, setIsFadingOut] = useState(false);

    const {user, loading} = useAuth();

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

    const callbacker = () => {
        setShowSuccess(true);
        getInitialData();

        setTimeout(() => {
            setIsFadingOut(true);
        }, 2500);

        setTimeout(() => {
            setShowSuccess(false);
            setIsFadingOut(false);
        }, 3000);
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
            <div style={{paddingTop: "80px"}}>
                <hr />
                {!user && 
                <>
                    <h3>Please Sign In</h3>
                    <Login />
                </>
                }
                {user && ( !showSuccess ?
                <CreateRecipe callbackFunc={callbacker}/> : <ShowSuccess  isFadingOut={isFadingOut}/>)}
            </div>
            <Links />
        </>
    )
}
