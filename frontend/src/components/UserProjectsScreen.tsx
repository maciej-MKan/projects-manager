import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fetchUser } from './utils/GetUserData.ts';
import { fetchProjectsByUser } from './utils/GetProjects.ts';
import { fetchUsers } from './utils/GetUsers.ts';

const ProjectsScreen: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const emptyProject = {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        author: localStorage.getItem('User_ID'),
        status: 'new',
        users: [],
      };

    useEffect(() => {
        const user_id = localStorage.getItem('User_ID');
            try {
                fetchUser(user_id)
                    .then((res) => setUserData(res));
                fetchProjectsByUser(user_id)
                    .then(res => setProjects(res));
                fetchUsers()
                    .then(res => setUsers(res));
                }
            catch (error) {
                console.error("error" + {error});
                localStorage.setItem('User_ID', 'null');
                navigate('/login')
            }
    }, []);

    if(users === undefined || projects === undefined || userData === undefined){
        return <>Give me 1 second</>
    }

    const getUserName = (user_id) => {
        return users.filter(a => a.id == user_id)[0] || {'name': 'loading..', 'surname': ''};
    }

    function renderProjects(projects) {
        return projects.map((project) => (
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{format(new Date(project.start_date), 'yyyy-MM-dd')}</td>
                <td>{format(new Date(project.end_date), 'yyyy-MM-dd')}</td>
                <td>{project.status}</td>
                <td>{getUserName(project.author).name} {getUserName(project.author).surname}</td>
                <td>
                    <select className="form-select" onChange={(e) => handleProjectActions(e.target.value, project)}>
                        <option value="">Select action</option>
                        <option value="edit">Edit</option>
                        <option value="comment">Add comment</option>
                        <option value="details">Project details</option>
                        <option value="delete">Delete</option>
                    </select>
                </td>
            </tr>
        ));
    }

    const handleEditProfile = () => {
        navigate('/edit-profile', {state: userData});}

    const handleAddProject = () => {
        navigate('/project', {state: emptyProject})
    }

    const handleProjectActions = (target, project) => {
        switch (target) {
            case 'edit':
                navigate('/project', {state: project})
                break;
            case 'comment':
                navigate('/comment', {state: project})
                break;
            case 'details':
                navigate('/project-details', {state: project})
                break;
            case 'delete':
                navigate('/project-delete', {state: project})

        }
    };

    return (
        <div className="container">
            {userData && (
                <div>
                <h2>Hello, {userData.name}! <button className="btn btn-primary" onClick={handleEditProfile}>Edit profile</button></h2>
                </div>
            )}
            <h2 className="mb-4">Your projects: </h2>
            <div className="mb-3">
                <button className="btn btn-success" onClick={handleAddProject}>Add new project</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Author</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody>
                {renderProjects(projects)}
                </tbody>
            </table>
        </div>
      );      
};

export default ProjectsScreen;