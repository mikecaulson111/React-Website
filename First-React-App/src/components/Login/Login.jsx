import {useState} from "react";
import { supabase } from "../../utils/supabase";
import NewUser from "./NewUser";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [creatingAccout, setCreatingAccount] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault()
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert(error.message);
    } else {
      console.log('Logged in as:', data.user.email);
    }
  }

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <p>Enter Login Information to access Images</p>
      {!creatingAccout ?
      <div>
        <form className="login-form" onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        <button className="new-user" onClick={() => setCreatingAccount(true)}>Create account</button>
      </div>
      :
      <NewUser callback={setCreatingAccount} />
      }
    </div>
  );
}
