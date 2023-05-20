import React, { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const ProjectsScreen: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
  

    function renderProjects(projects) {
        return projects.map((project) => (
          <tr key={project.id}>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.description}</td>
            <td>{format(new Date(project.start_date), 'yyyy-MM-dd')}</td>
            <td>{format(new Date(project.end_date), 'yyyy-MM-dd')}</td>
            <td>{project.status}</td>
            <td>{project.author}</td>
            <td>
                <select onChange={(e) => handleProjectActions(e.target.value)}>
                <option value="">Wybierz akcję</option>
                <option value="edit">Edycja</option>
                <option value="comment">Dodaj komentarz</option>
                <option value="details">Szczegóły projektu</option>
                <option value="delete">Usuń</option>
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
                console.log(parseUser)
                setUserData(parseUser);
                const projectsData = parseUser.projects
                console.log(projectsData)
                setProjects(projectsData);
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

        fetchUserData();

    }, []);

    const handleEditProfile = () => {
        navigate('/edit-profile', {state: userData});}

    const handleAddProject = () => {
        navigate('/add-project')
    }

    const handleProjectActions = (target) => {
        console.log(target)
    }

    return (
        <div>
            {userData && (
                <div>
                <p>Hello, {userData.name}!  <button onClick={handleEditProfile}>Edit proffile</button></p>
                </div>
                 )}
          <h1>Projects:</h1>
          <div>
            <button onClick={handleAddProject}>Add new project</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
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