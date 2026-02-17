import { useState, useEffect } from "react";
import api from "../services/api";

export default function Utilisateurs(){

const [utilisateurs, setUsers] = useState([]);

const [nom, setUsername] = useState("");
const [email, setEmail] = useState("");
const [mot_de_passe, setPassword] = useState("");
const [role, setRole]=useState("");

const roles=[

"Administrateur",
"Fournisseur",
"Acheteur",
"Gestionnaire",
"Logisticien"

];

// chargement Utilisateur

const loadUsers = () => {
    api.get("/utilisateurs")
    .then(res => setUsers(res.data))
    .catch(err=>console.log(err));
};

useEffect(()=>{
    loadUsers();
},[]);

// Ajout Utilisateur

const addUser = () => {
    api.post("/utilisateurs",{
        nom,
        email,
        mot_de_passe,
        role
    })
    .then(()=>{
        loadUsers();

        setUsername("");
        setEmail("");
        setPassword("");
        setRole("");
    })
    .catch(err=>console.log(err));
};

return(
<div>
    <h1>Utilisateurs</h1>
    <input placeholder="nom" value={nom} onChange={e=>setUsername(e.target.value)}/>
    <input placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
    <input placeholder="mot de passe" value={mot_de_passe} onChange={e=>setPassword(e.target.value)}/>
    <select value={role} onChange={e=>setRole(e.target.value)}>
        <option value="">Choisir un rôle</option>
        {roles.map(r=>(
            <option key={r} value={r}>
                {r}
            </option>
        ))}
    </select>
    <button onClick={addUser}>Ajouter</button>
    {
    utilisateurs.map(user=>(
        <div key={user._id}>
            {user.nom} - {user.email} - {user.role}
        </div>
    ))
    }
</div>
);
}
