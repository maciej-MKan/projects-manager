import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const ProjectsScreen: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const enptyProject = {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        author: localStorage.getItem('User_ID'),
        status: 'new',
        users: [],
      };
  

    function renderProjects(projects) {
        return projects.map((project) => (
          <tr key={project.id}>
            {/* <td>{project.id}</td> */}
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{format(new Date(project.start_date), 'yyyy-MM-dd')}</td>
            <td>{format(new Date(project.end_date), 'yyyy-MM-dd')}</td>
            <td>{project.status}</td>
            <td>{project.author}</td>
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
      


    useEffect(() => {
    const fetchUserData = async () => {
        try {
            const user_id = localStorage.getItem('User_ID');
            const response = await fetch(`http://localhost:8000/user?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: 'include',
            mode: 'cors',
            });
    
            if (response.ok) {
                const userDataRaw = await response.json();
                const parseUser = JSON.parse(userDataRaw)
                setUserData(parseUser);
            } else {
            console.log("bad data");
            localStorage.setItem('User_ID', 'null');
            redirect('/')
            // Wystąpił błąd podczas pobierania danych użytkownika, obsłuż go
            }
        } catch (error) {
            console.log("error" + {error});
            localStorage.setItem('User_ID', 'null');
            redirect('/')
            // Wystąpił błąd połączenia lub inny błąd, obsłuż go
        }
        };

        const fetchProjects = async () => {
            try {
                const user_id = localStorage.getItem('User_ID');
                const response = await fetch(`http://localhost:8000/user/self_projects?user_id=${user_id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    credentials: 'include',
                    mode: 'cors',
                });
                console.log(response)
                if (response.ok) {
                    const projectsData = await response.json();
                    const parsedProjects = projectsData.map((project) => JSON.parse(project));
                    setProjects(parsedProjects);
                } else {
                    console.log("bad data")
                    localStorage.setItem('User_ID', 'null');
                    redirect('/')
                    // Wystąpił błąd podczas pobierania danych, obsłuż go
                }
            } catch (error) {
                console.log("error")
                localStorage.setItem('User_ID', 'null');
                navigate('/')
                // Wystąpił błąd połączenia lub inny błąd, obsłuż go
            }
        };

        fetchUserData();
        fetchProjects()

    }, []);

    const handleEditProfile = () => {
        navigate('/edit-profile', {state: userData});}

    const handleAddProject = () => {
        navigate('/project', {state: enptyProject})
    }

    const handleProjectActions = (target, project) => {
        switch (target) {
            case 'edit':
                navigate('/project', {state: project})
                break;
            case 'comment':
                navigate('/comment', {state: project})
                console.log("comment.");
                break;
            case 'details':
                console.log("details.");
                navigate('/project-details', {state: project})
                break;
            case 'delete':
                navigate('/project-delete', {state: project})

        };
    };

    return (
        <div className="container">
            {userData && (
                <div>
                <p><h2>Hello, {userData.name}! <button className="btn btn-primary" onClick={handleEditProfile}>Edit profile</button></h2></p>
                </div>
            )}
            <h2 className="mb-4">Your projects: </h2>
            <div className="mb-3">
                <button className="btn btn-success" onClick={handleAddProject}>Add new project</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    {/* <th>ID</th> */}
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