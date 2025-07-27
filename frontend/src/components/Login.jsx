import {useState} from 'react';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
function Login() {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const handlelogin =async()=>{
        try{
            const response=await axios.post("http://localhost:3000/api/auth/login",{
                username,
                password
            });
            const token=response.data.token;
            localStorage.setItem("token",token);
            alert("Login successful");
            navigate("/todos");
        }
        catch(err){
            alert(err.response?.data?.msg || "Login failed");
        }
    }
    return (
        <div>
            <h2>Login</h2>
            <input 
            type='text'
            placeholder='Username'
            value={username}
            onChange={e=>setUsername(e.target.value)}
            ></input>
            <br />
            <input 
            type="text"
            placeholder='password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
            ></input>   
            <br />
            <button onClick={handlelogin}>Login</button>
        </div>
    );
}
export default Login;