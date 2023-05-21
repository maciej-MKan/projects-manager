import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchUsers } from './utils/GetUsers.ts';
import { createProject } from './utils/CreateProject.ts';
import { updateProject } from './utils/UpdateProject.ts';

const CreateProjectScreen: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [projectData, setProjectData] = useState(state);
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setProjectData({ ...projectData, status: value });

  }

  const handleNextStep = () => {
    setProjectData({ ...projectData, users: selectedUsers });
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
        if(!projectData.id){
            const updatedProject = await createProject(projectData);
        } else {
            const updatedProject = await updateProject(projectData);
        }
        // Wyczyszczenie danych formularza
        setProjectData({
            name: '',
            description: '',
            start_date: '',
            end_date: '',
            author: localStorage.getItem('User_ID'),
            status: 'new',
            users: [],
        });
    // Przeniesienie na ekran z którego nastąpiło wejście na funkcjonalność
    navigate(-1);
    } catch (error) {
        console.error(error);
        // Obsługa błędu podczas tworzenia projektu lub aktualizacji użytkowników
    }
    };

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([...state.users]);
  const [users, setUsers] = useState([]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    const user = users[selectedIndex]; // Uzyskanie pełnego obiektu użytkownika na podstawie indeksu
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
    setProjectData({ ...projectData, users: selectedUsers });
    // setSelectedUser(user);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error(error);
      }
    };
  
    getUsers();
  }, []);

  return (
    <div>
      {step === 1 && (
        <>
            <div>
                <h1>Project {projectData.id}</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Nazwa projektu</th>
                      <th>Opis</th>
                      <th>Data rozpoczęcia</th>
                      <th>Data zakończenia</th>
                      {projectData.id && <th>Status</th>}
                      <th>Użytkownik</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={projectData.name}
                          onChange={handleInputChange}
                          placeholder="Nazwa projektu"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name="description"
                          value={projectData.description}
                          onChange={handleInputChange}
                          placeholder="Opis"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="start_date"
                          value={projectData.start_date.substring(0, 10)}
                          onChange={handleInputChange}
                          placeholder="Data rozpoczęcia"
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name="end_date"
                          value={projectData.end_date.substring(0, 10)}
                          onChange={handleInputChange}
                          placeholder="Data zakończenia"
                        />
                      </td>
                      {projectData.id && (
                        <td>
                          <select
                            name="status"
                            value={projectData.status}
                            onChange={handleStatusChange}
                          >
                            <option value="NEW">NEW</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                        </td>
                      )}
                      <td>
                        <select onChange={handleUserChange}>
                          <option value="">Wybierz użytkownika</option>
                          {users.map((user, index) => {
                            if (!selectedUsers.includes(user)) {
                              return (
                                <option key={index} value={index}>
                                  {`${user.name} ${user.surname}`}
                                </option>
                              );
                            }
                          })}
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div>
                    <h3>Wybrani użytkownicy:</h3>
                    {selectedUsers.map((user, index) => (
                    <div key={index}>
                        <p>{`${user.name} ${user.surname}`}</p>
                    </div>
                    ))}
                </div>
            </div>
            <div>
                <button onClick={handleNextStep}>Dalej</button>
                <button onClick={() => navigate(-1)}>Anuluj</button>
            </div>
        </>
      )}

      {step === 2 && (
        <div>
          <h1>Ekran potwierdzający</h1>
          <p>Nazwa projektu: {projectData.name}</p>
          <p>Opis: {projectData.description}</p>
          <p>Status: {projectData.status}</p>
          <p>Data rozpoczęcia: {projectData.start_date}</p>
          <p>Data zakończenia: {projectData.end_date}</p>
          <div>
                <h3>Wybrani użytkownicy:</h3>
                {selectedUsers.map((user, index) => (
                <div key={index}>
                    <p>{`${user.name} ${user.surname}`}</p>
                </div>
                ))}
          </div>
          <button onClick={handleSubmit}>Wykonaj</button>
          <button onClick={handlePreviousStep}>Powrót</button>
          <button onClick={() => navigate(-1)}>Anuluj</button>
        </div>
      )}
    </div>
  );
};

export default CreateProjectScreen;
