import './App.css'
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Todos from './components/Todos';

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/todos" element={<Todos/>} />
    </Routes>
    

      
  )
}

export default App
