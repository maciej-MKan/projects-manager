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
          </tr>
        ));
      }
      


    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:8000/projects', {
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
                    console.log(localStorage.getItem('User_ID'))
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
                const userData = await response.json();
                setUserData(JSON.parse(userData));
            } else {
            console.log("bad data");
            localStorage.setItem('User_ID', 'null');
            redirect('/')
            // Wystąpił błąd podczas pobierania danych użytkownika, obsłuż go
            }
        } catch (error) {
            console.log("error");
            localStorage.setItem('User_ID', 'null');
            navigate('/')
            // Wystąpił błąd połączenia lub inny błąd, obsłuż go
        }
        };

        fetchProjects();
        fetchUserData();

    }, []);

    const handleEditProfile = () => {
        navigate('/edit-profile', {state: userData});}

    return (
        <div>
            {userData && (
                <div>
                <p>Hello, {userData.name}!  <button onClick={handleEditProfile}>Edit proffile</button></p>
                </div>
                 )}
          <h1>Projects:</h1>
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