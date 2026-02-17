import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login(){

const [email, setEmail]=useState("");
const [mot_de_passe, setMotDePasse]=useState("");

const navigate=useNavigate();

const login=()=>{
    api.post("/utilisateurs/login",{
        email,
        mot_de_passe
    })
    .then(res=>{
        localStorage.setItem("user",JSON.stringify(res.data.user));
        navigate("/dashboard");
    })
    .catch(()=>alert("Erreur login"));
};

return(

<div>
    <h2>Connexion</h2>
    <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
    <input type="password" placeholder="Mot de passe" onChange={e=>setMotDePasse(e.target.value)}/>
    <button onClick={login}>Se connecter</button>
</div>
);
}