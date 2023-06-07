import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {fetchUser} from './utils/GetUserData.ts';
import {refreshUser} from "./utils/Login.ts";
import {logout} from "./utils/Logout.ts";

const ProjectsScreen: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    const emptyProject = {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        author: '',
        status: 'NEW',
        users: [],
    };

    useEffect(() => {
        if (sessionStorage.getItem('user_id') === null){
            refreshUser()
                .then((res) =>{
                    if (res != null){
                        navigate('/login')
                    }
                })
                .catch((error) => console.log(error));
        }
        const user_id = sessionStorage.getItem('user_id');
        try {
            fetchUser(user_id)
                .then((res) => {
                    if (res.error != null){
                        navigate('/login')
                    }
                    setUserData(res)
                })
                .catch((error) => {
                    setError(error);
                    sessionStorage.removeItem('token');
                    navigate('/login');
                });
        } catch (error) {
            setError(error);
            sessionStorage.removeItem('token');
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        if (userData != null) {
            setProjects(userData.projects)
            console.log('...')
        }
    }, [userData])

    if (users === undefined || projects === undefined || userData === null) {
        return <>Give me 1 second</>
    }


    function renderProjects(projects) {
        return projects.map((project) => (
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{format(new Date(project.start_date * 1000), 'yyyy-MM-dd')}</td>
                <td>{format(new Date(project.end_date * 1000), 'yyyy-MM-dd')}</td>
                <td>{project.status}</td>
                <td>{project.author.first_name} {project.author.last_name}</td>
                <td>
                    <select className="form-select custom-select"
                            onChange={(e) => handleProjectActions(e.target.value, project)}>
                        <option value="">Select action</option>
                        <option value="comment">Add comment</option>
                        <option value="details">Project details</option>
                        {userData && userData.id === project.author.id && (
                            <>
                                <option value="edit">Edit</option>
                                <option value="delete">Delete</option>
                            </>
                        )}
                    </select>
                </td>
            </tr>
        ));
    }

    const handleEditProfile = () => {
        navigate('/edit-profile', {state: userData});
    }

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

    const handleLogout = async () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user_id')
        try{
            await logout();
        } catch (error){
            console.log(error);
        }
        navigate('/login');
    }

    return (
        <div className="container">
            <div className="row justify-content-end">
                <div className="col-auto">
                    <button className="btn btn-secondary" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
            {userData && (
                <div className="row">
                    <div className="col">
                        <h2>
                            Hello, {userData.first_name}! {"  "}
                            <button className="btn btn-primary" onClick={handleEditProfile}>
                                Edit profile
                            </button>
                        </h2>
                    </div>
                </div>
            )}
            {userData && (
                <div className="row mt-4">
                    <div className="col">
                        <h2 className="d-flex align-items-center justify-content-between">
                            <span>Your projects:</span>
                            <button className="btn btn-success" onClick={handleAddProject}>
                                Add new project
                            </button>
                        </h2>
                    </div>
                </div>
            )}
            {userData && (
                <div className="row mt-3">
                    <div className="col">
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
                            <tbody>{renderProjects(projects)}</tbody>
                        </table>
                    </div>
                </div>
            )}
            {error && (
                <div className="row">
                    <div className="col">
                        <p className="text-danger">{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsScreen;