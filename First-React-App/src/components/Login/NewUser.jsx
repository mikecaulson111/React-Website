import { useState } from "react";
import "./Login.css";
import { supabase } from "../../utils/supabase";

export default function NewUser( { callback } ) {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (password1 !== password2) {
            setPasswordsMatch(false);
            return;
        } else {
            setPasswordsMatch(true);
        }

        const { error } = await supabase.auth.signUp({
            email,
            password1
        });

        if (error) alert(error.message);
        else alert("Success! Please verify your email.");

        if (!error) {
            callback(false);
        }
    }

    return (
        <>
            {!passwordsMatch && <h3 style={{color: "red"}}>ENSURE PASSWORDS MATCH</h3>}
            <form className="login-form" onSubmit={handleSignUp}>
              <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword1(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder="Repeat Password" 
                onChange={(e) => setPassword2(e.target.value)} 
              />
              <button type="submit" className="login-button">Sign Up</button>
            </form>
        </>
    );
}
