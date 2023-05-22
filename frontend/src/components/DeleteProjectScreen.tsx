import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProject } from "./utils/DeleteProject.ts";

const DeleteProjectScreen: React.FC = () => {

    const navigate = useNavigate();
    const { state } = useLocation();


    const handleCancel = () => {
        navigate(-2);
    }

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();

        try{
            await deleteProject(state);
            navigate('/');
        }catch (error) {
        console.error(error);
        // Obsługa błędu podczas tworzenia projektu lub aktualizacji użytkowników
    }
        
    };

    const DeleteProject = (projectData) => {
    return (
        <div>
        <h1>Usuwanie projektu</h1>
        <h2>Nazwa projektu: {projectData.name}</h2>
        <p>Opis: {projectData.description}</p>
        <p>Lista użytkowników:</p>
        <ul>
            {projectData.users.map((user) => (
            <li key={user.id}>{`${user.name} ${user.surname}`}</li>
            ))}
        </ul>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleCancel}>Cancel</button>
        </div>
    );
    };

    console.log("state");
    console.log(state);
    return DeleteProject(state);
};

export default DeleteProjectScreen;