import { BrowserRouter,Routes,Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import Utilisateurs from "./pages/utilisateurs";
import './App.css'

function App() {
  return (
   
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/utilisateurs" element={<Utilisateurs/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App