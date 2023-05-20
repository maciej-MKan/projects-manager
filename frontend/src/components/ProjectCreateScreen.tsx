import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from './utils/GetUsers.ts';
import { createProject } from './utils/CreateProject.ts';
import { updateUsers } from './utils/UpdateUsers.ts';

const CreateProjectScreen: React.FC = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    author: localStorage.getItem('User_ID'),
    status: 'new',
    users: [],
  });
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleNextStep = () => {
    setStep(2);
  };

  const handlePreviousStep = () => {
    setStep(1);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log('projectData')
    console.log(selectedUser)
    console.log('projectData')


    try {
        // Tworzenie projektu
        const createdProject = await createProject(projectData);


        // Aktualizacja użytkowników

        console.log("selectedUser")
        console.log(selectedUsers.projects)
        console.log("selectedUser")
        
        const updatedUsers = selectedUsers.map((user) => ({
        ...user,
        projects: [...user.projects, createdProject],
        }));
        await updateUsers(updatedUsers);

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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    const user = users[selectedIndex]; // Uzyskanie pełnego obiektu użytkownika na podstawie indeksu
    setSelectedUser(user);
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

  const handleAddUser = () => {
    if (selectedUser) {
      setSelectedUsers((prevUsers) => [...prevUsers, selectedUser]);
      setSelectedUser(null);
    }
  };
  

  return (
    <div>
      {step === 1 && (
        <>
            <div>
                <h1>Formularz tworzenia projektu</h1>
                <input type="text" name="name" value={projectData.name} onChange={handleInputChange} placeholder="Nazwa projektu" />
                <input type="text" name="description" value={projectData.description} onChange={handleInputChange} placeholder="Opis" />
                <input type="date" name="start_date" value={projectData.start_date} onChange={handleInputChange} placeholder="Data rozpoczęcia" />
                <input type="date" name="end_date" value={projectData.end_date} onChange={handleInputChange} placeholder="Data zakończenia" />
                <select onChange={handleUserChange}>
                    <option value="">Wybierz użytkownika</option>
                        {users.map((user, index) => (
                            <option key={index} value={index}>
                                {`${user.name} ${user.surname}`}
                            </option>
                    ))}
                </select>
                <button onClick={handleAddUser} disabled={!selectedUser}>
                Dodaj użytkownika
                </button>

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
