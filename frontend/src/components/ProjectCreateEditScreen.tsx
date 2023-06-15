import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {fetchUsers} from './utils/GetUsers.ts';
import {createProject} from './utils/CreateProject.ts';
import {updateProject} from './utils/UpdateProject.ts';
import {fetchProjectDetails} from "./utils/GetProjects.ts";
import {format} from "date-fns";
import {validateDate, validateDescription, validateName} from "./utils/Validators.ts";

interface ProjectData {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
    status: string;
    author: string;
    users: [];
}

const CreateProjectScreen: React.FC = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const [step, setStep] = useState(1);
    const [error, setError] = useState("")
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [projectData, setProjectData] = useState({
        id: "",
        name: "",
        description: "",
        start_date: 0,
        end_date: 0,
        status: "NEW",
        author: {},
        users: []
    });
    const validatorsMap = new Map();
    const [isValidForm, setValidForm] = useState(projectData.id !== "");

    validatorsMap.set('name', validateName);
    validatorsMap.set('description', validateDescription);
    validatorsMap.set('start_date', validateDate);
    validatorsMap.set('end_date', validateDate);


    useEffect(() => {
        const fetchData = async () => {
            try {
                    const res = await fetchProjectDetails(state);
                    setProjectData(res);
                    setSelectedUsers(res.users);
            } catch (error) {
                console.log(error);
            }
        };
        if (state.name){
            fetchData().catch((error) => console.log(error));
        }
    }, []);

    useEffect(() => {
        const fetchUsersData = async () =>{
                try {
                    const res_users = await fetchUsers();
                    const user_array = res_users.results.filter(user => !selectedUsers.map(u => u.id).includes(user.id));
                    setUsers(user_array);
                } catch (error) {
                    console.log(error);
                }
            }
        fetchUsersData()
            .catch((error) => console.log(error));
    }, [selectedUsers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        setProjectData({...projectData, [e.target.name]: e.target.value});
        setError(validatorsMap.get(e.target.name)(e.target.value))
    };

    const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProjectData({...projectData, [e.target.name]: (new Date(e.target.value).getTime() / 1000 )});
        // setError(validatorsMap.get(e.target.name)(e.target.value))
    }

    const handleStatusChange = (event) => {
        const {value} = event.target;
        setProjectData({...projectData, status: value});

    }

    const handleNextStep = () => {
        setProjectData({...projectData, users: selectedUsers});
        setStep(2);
    };

    const handlePreviousStep = () => {
        setStep(1);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            let response: { error: string }
            if (!projectData.id) {
                response = await createProject(projectData);
            } else {
                response = await updateProject(projectData);
            }
            if (response.error){
                const errors = response.error;
                const errorMessages = [];
                for (const key in errors) {
                    // const errorArray = errors[key];
                    errorMessages.push(key);
                }
                setError(errorMessages.join(" - IS INVALID, \n"));
                setStep(1)
            } else {
                navigate(-1);
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedIndex = event.target.value;
        const user = users[selectedIndex];
        setSelectedUsers((prevUsers) => [...prevUsers, user]);
        setProjectData({...projectData, users: selectedUsers});
    };

    const handleCancel = () => {
        navigate(-1);
    }


    if (state === null && projectData.id === null) {
        return <>Give me 1 second</>
    }

    function formatData(timestamp) {
        if (timestamp > 0) {
            return format(new Date(timestamp * 1000), 'yyyy-MM-dd');
        }
        return ""
    }

    return (
        <div className="container">
            {step === 1 && (
                <>
                    <div className="mb-3">
                        <h2>Project {projectData.id}</h2>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                {projectData.id && <th>Status</th>}
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        value={projectData.name}
                                        onChange={(e) => {
                                            handleInputChange(e)
                                    }}
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
                                        value={formatData(projectData.start_date)}
                                        onChange={handleDataChange}
                                        placeholder="Start Date"
                                        className="form-control"
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        name="end_date"
                                        value={formatData(projectData.end_date)}
                                        onChange={handleDataChange}
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
                                            <option value="IN_PENDING">In pending</option>
                                            <option value="IN_PROGRESS">In progress</option>
                                            <option value="COMPLETED">completed</option>
                                        </select>
                                    </td>
                                )}
                                {projectData.id && (
                                <td>
                                    <select onChange={handleUserChange} className="form-control">
                                        <option value="">Add User</option>
                                        {users.map((user, index) => {
                                            if (user.first_name !== undefined && !selectedUsers.includes(user)) {
                                                return (
                                                    <option key={index} value={index}>
                                                        {`${user.first_name} ${user.last_name}`}
                                                    </option>
                                                );
                                            }
                                        })}
                                    </select>
                                </td>
                            )}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-3">
                        {selectedUsers.length > 0 &&(
                            <p>
                        <h3>Project Users: </h3>
                        {selectedUsers.map((user, index) => (
                            <div key={index}>
                                <p>{`${user.first_name} ${user.last_name}`}</p>
                            </div>
                        ))}
                        </p>
                        )}
                    </div>
                    <div>
                        <button className="btn btn-secondary me-2" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="btn btn-success me-2" onClick={handleNextStep} disabled={
                            error !== "" || projectData.start_date == "" || projectData.end_date == ""
                        }>
                            Next
                        </button>
                    </div>
                </>
            )}

            {step === 2 && (
                <div>
                    <h1>Confirmation project data</h1>
                    <div className="mb-3">
                        <p>
                            <strong>Project Name:</strong> {projectData.name}
                        </p>
                        <p>
                            <strong>Description:</strong> {projectData.description}
                        </p>
                        <p>
                            <strong>Status:</strong> {projectData.status}
                        </p>
                        <p>
                            <strong>Start Date:</strong> {formatData(projectData.start_date)}
                        </p>
                        <p>
                            <strong>End Date:</strong> {formatData(projectData.end_date)}
                        </p>
                    </div>
                    {selectedUsers.length > 0 && <div className="mb-3">
                        <h3>Project Users:</h3>
                        {selectedUsers.map((user, index) => (
                            <div key={index}>
                                <p>{`${user.first_name} ${user.last_name}`}</p>
                            </div>
                        ))}
                    </div>}
                    <div>
                        <button className="btn btn-secondary me-2" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className="btn btn-primary me-2" onClick={handlePreviousStep}>
                            Back
                        </button>
                        <button className="btn btn-success me-2" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
            {error && <p className="text-danger">{error}</p>}
        </div>

    );
};

export default CreateProjectScreen;
