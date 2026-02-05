import { supabase } from "../../utils/supabase.js";
import { useState, useEffect } from "react";

import Links from "../../components/Links/Links.jsx";
import PrivateImage from "../../components/PrivateImage/PrivateImage.jsx";
import PrivateGallery from "./PrivateGallery.jsx";

const { data } = supabase
    .storage
    .from('Images')
    .getPublicUrl("drawings/Initial woman.jpg");

const { data: data2 } = supabase
    .storage
    .from('Images')
    .getPublicUrl("drawings/Tall skinny woman.jpg");

    // not working
// const fetcher = async () => {
//     const {data, err} = await supabase
//         .storage
//         .from('PrivateImages')
//         .list('');
    
//     console.log(data.length);
// }

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert(error.message)
    } else {
      console.log('Logged in as:', data.user.email)
      // The session is now saved in local storage automatically!
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  )
}

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
        <button onClick={handleLogout}>
            Log Out
        </button>
    )
}

export default function Drawings() {
    const [session, setSession] = useState(null)

    // fetcher();

    useEffect(() => {
      // 1. Check current session on load
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })

      // 2. Listen for login/logout events
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }, [])

    return (
        <>
            <h3>My Drawings</h3>
            <img src={data.publicUrl} style={{width: "35vw", height: "auto", paddingRight: "10px"}} />
            <img src={data2.publicUrl} style={{width: "35vw", height: "auto"}} />
            {/* <PrivateImage path="test.jpg" /> */}

            {/* {!session ? <Login /> : <PrivateImage path="test.jpg" />} */}
            <PrivateGallery />
            {!session ? <Login /> : <PrivateGallery />}
            {session ? <LogOutButton /> : ""}
            <Links />
        </>
    )
}