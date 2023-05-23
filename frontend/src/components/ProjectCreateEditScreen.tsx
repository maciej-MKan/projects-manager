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
            await createProject(projectData);
        } else {
            await updateProject(projectData);
        }
        setProjectData({
            name: '',
            description: '',
            start_date: '',
            end_date: '',
            author: localStorage.getItem('User_ID'),
            status: 'new',
            users: [],
        });
    navigate(-1);
    } catch (error) {
        console.error(error);
    }
    };

  const [selectedUsers, setSelectedUsers] = useState([...state.users]);
  const [users, setUsers] = useState([]);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.value;
    const user = users[selectedIndex];
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
    setProjectData({ ...projectData, users: selectedUsers });
  };

  const handleCancel = () =>{
    navigate(-1);
  }

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
    <div className="container">
      {step === 1 && (
        <>
          <div>
            <h2>Project {projectData.id}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  {projectData.id && <th>Status</th>}
                  <th> </th>
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
                      placeholder="Project Name"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={projectData.description}
                      onChange={handleInputChange}
                      placeholder="Description"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="start_date"
                      value={projectData.start_date.substring(0, 10)}
                      onChange={handleInputChange}
                      placeholder="Start Date"
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="end_date"
                      value={projectData.end_date.substring(0, 10)}
                      onChange={handleInputChange}
                      placeholder="End Date"
                      className="form-control"
                    />
                  </td>
                  {projectData.id && (
                    <td>
                      <select
                        name="status"
                        value={projectData.status}
                        onChange={handleStatusChange}
                        className="form-control"
                      >
                        <option value="NEW">NEW</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </td>
                  )}
                  <td>
                    <select onChange={handleUserChange} className="form-control">
                      <option value="">Add User</option>
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
              <h3>Project Users:</h3>
              {selectedUsers.map((user, index) => (
                <div key={index}>
                  <p>{`${user.name} ${user.surname}`}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <button className="btn btn-primary me-2" onClick={handleNextStep}>
              Next
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <div>
          <h1>Confirmation project data</h1>
          <p>Project Name: {projectData.name}</p>
          <p>Description: {projectData.description}</p>
          <p>Status: {projectData.status}</p>
          <p>Start Date: {projectData.start_date}</p>
          <p>End Date: {projectData.end_date}</p>
          <div>
            <h3>Project Users:</h3>
            {selectedUsers.map((user, index) => (
              <div key={index}>
                <p>{`${user.name} ${user.surname}`}</p>
              </div>
            ))}
          </div>
          <button className="btn btn-success me-2" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn btn-primary me-2" onClick={handlePreviousStep}>
            Back
          </button>
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateProjectScreen;
