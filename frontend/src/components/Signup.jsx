import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup(){
const[username,setUsername]=useState("");
const[password,setPassword]=useState("");
const navigate=useNavigate();
const handleSignup=async()=>{
    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`,{
            username,
            password
        });
        alert("signup successful");
         navigate("/login");
    }
    catch(err){
     alert(err.response?.data?.message || "Signup failed");
    
    }
}

return(
    <div>
        <h2>Signup</h2>
        <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e=>setUsername(e.target.value)}
    />
    <br />
    
    <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
    />
    <br />
    <button onClick={handleSignup}>Signup</button>
    </div>
)
};
export default Signup;