import { supabase } from "../../utils/supabase.js";
import { useState, useEffect } from "react";

import Links from "../../components/Links/Links.jsx";
import PrivateImage from "../../components/PrivateImage/PrivateImage.jsx";
import PrivateGallery from "./PrivateGallery.jsx";
import Login from "../../components/Login/Login.jsx";

import { useAuth } from "../../components/AuthContext/AuthContext.jsx";

import "../../components/Login/Login.css";

const { data } = supabase
    .storage
    .from('Images')
    .getPublicUrl("drawings/me_1.jpg");

function LogOutButton() {
    const handleLogout = async () => {
        const {error} = await supabase.auth.signOut();

        if (error) {
            console.error("Error logging out:", error.message);
        } else {
            console.log("User signed out successfully");
        }
    }

    return (
        <button onClick={handleLogout} className="login-button">
            Log Out
        </button>
    )
}

export default function Drawings() {
    const {session, loading} = useAuth();

    return (
        <>
            <h3>My Drawings</h3>
            <img src={data.publicUrl} style={{width: "35vw", height: "auto", paddingRight: "10px"}} />
            {/* {!session ? <Login /> : <PrivateImage path="test.jpg" />} */}
            {/* <PrivateGallery /> */}
            {!session ? <Login /> : <PrivateGallery />}
            {session ? <LogOutButton /> : ""}
            <Links />
        </>
    )
}
