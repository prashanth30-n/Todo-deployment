import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Todos()   {
    const[todos,setTodos]=useState([]);
    const[newTodo,setNewTodo]=useState("");
    const navigate=useNavigate();
    const fetchTodos=async()=>{
        try{
            const response=await axios.get("http://localhost:3000/api/todos",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            setTodos(response.data);
        }
        catch(err){
            alert(err.response?.data?.message || "Failed to fetch todos");
            navigate("/login");
        }
    }
   const addTodo=async()=>{
    try{
        await axios.post("http://localhost:3000/api/todos",{
            title: newTodo
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        setNewTodo("");
        fetchTodos();
    }
    catch(err){
        alert("Failed to fetch todos. Please log in again.");
      navigate("/login");
    }
   }
   const deleteTodo =async(id)=>{
    try{
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/todos/${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("token")}`
            }
        });
        fetchTodos();
    }
    catch(err){
        alert("Failed to delete todo");
        
    }
}
useEffect(()=>{
    fetchTodos();
},[])
return (
    <div>
        <h2>MyTodos</h2>
        <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={e=>setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
        <ul>
            {todos.map(todo=>(
                <li key={todo._id}>
                    {todo.title}
                    <button onClick={()=>deleteTodo(todo._id)}>Delete</button>
                </li>
            ))}
        </ul>
         <button onClick={() => {
        localStorage.removeItem("token");
        navigate("/login");
      }}>Logout</button>
    </div>
)
} 
export default Todos;