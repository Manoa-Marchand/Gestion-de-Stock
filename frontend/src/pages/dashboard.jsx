import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){

const navigate=useNavigate();

useEffect(()=>{
    const user=localStorage.getItem("user");
    if(!user) navigate("/");
},[]);

const logout=()=>{
    localStorage.removeItem("user");
    navigate("/");
};

return(

<div>
    <h1>Dashboard</h1>
    <button onClick={logout}>Logout</button>
</div>
);
}
