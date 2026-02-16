import "./App.css";
import CornerImage from "./components/CornerImage/CornerImage";

import { useAuth } from "./components/AuthContext/AuthContext";
import { supabase } from "./utils/supabase";

import "./components/Login/Login.css";

function Name({name}) {
  return (
    <h1>{name}</h1>
  );
}

const logOut = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) {
        console.error("Error logging out:", error.message);
    } else {
        console.log("User signed out successfully");
    }
}

export default function ConstHeader() {
    const {user, loading} = useAuth();
    return (
     <main>
       <CornerImage />
       <Name name="Michael Caulson" />
       {user && <button
         style={{
           position: "absolute",
           top: 0,
           right: 0,
           padding: "10px",
           margin: "10px",
         }}
         className="login-button"
         onClick={logOut}
       >
         Log Out
       </button>}
     </main>   
    )
}
