import { useState } from "react";
import api from "../services/api";

export default function Register(){

const [nom, setNom]=useState("");
const [email, setEmail]=useState("");
const [mot_de_passe, setMotDePasse]=useState("");
const [role, setRole]=useState("");

const roles=[

"Administrateur",
"Fournisseur",
"Acheteur",
"Gestionnaire",
"Logisticien"

];

const register=()=>{
    api.post("/utilisateurs",{
        nom,
        email,
        mot_de_passe,
        role
    })
    .then(()=>alert("Utilisateur créé"));
};

return(

<div>
    <h2>Inscription</h2>
    <input placeholder="Nom" onChange={e=>setNom(e.target.value)}/>
    <input placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
    <input placeholder="Mot de passe" onChange={e=>setMotDePasse(e.target.value)}/>
    <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="">Choisir un rôle</option>
        {roles.map(r=>(
            <option key={r} value={r}>
                {r}
            </option>
        ))}
    </select>
    <button onClick={register}>S'inscrire</button>
</div>
);
}