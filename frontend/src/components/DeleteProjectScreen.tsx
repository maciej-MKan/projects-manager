import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteProject } from "./utils/DeleteProject.ts";

const DeleteProjectScreen: React.FC = () => {

    const navigate = useNavigate();
    const { state } = useLocation();


    const handleCancel = () => {
        navigate(-1);
    }

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();

        try{
            await deleteProject(state);
            navigate('/');
        }catch (error) {
        console.error(error);
        navigate('/')
    }
        
    };

    const DeleteProject = (projectData) => {
    return (
        <div className="container">
            <h1>Project Deletion</h1>
            <h2>Project Name: {projectData.name}</h2>
            <p>Description: {projectData.description}</p>
            <button className="btn btn-danger me-2" onClick={handleDelete}>
                Delete
            </button>
            <button className="btn btn-secondary me-2" onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
    };

    return DeleteProject(state);
};

export default DeleteProjectScreen;