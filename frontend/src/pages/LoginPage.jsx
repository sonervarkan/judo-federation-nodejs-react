import {login} from "../api/auth.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login(email, password);
            
        
            const { user, token } = response; 

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

          
            if (user.role === "Admin") navigate("/admin");
            else if (user.role === "Athlete") navigate("/athlete");
            else if (user.role === "Coach") navigate("/coach");

        } catch (error) {
           
            console.error("Login failed:", error);
            setError(error.response?.data?.message || "Login failed");
        }
    }

    return(
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
            <h2>Login Page</h2>
            <form onSubmit={handleLogin} style={{ padding: "30px", background: "white", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", width: "350px" }}>
                <h2 style={{ textAlign: "center" }}>Please login</h2>
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required style={inputStyle}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={inputStyle}/>
                <button type="submit" style={buttonStyle}>Login</button>
            </form>
        </div>
    )
}

const inputStyle = { width: "100%", padding: "12px", marginBottom: "15px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" };
const buttonStyle = { width: "100%", padding: "12px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" };