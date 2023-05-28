import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {getProjectComments} from './utils/GetProjectComments.ts';
import {format, parseISO} from 'date-fns';
import {fetchUsers} from './utils/GetUsers.ts';

const ProjectDetails = () => {
        const location = useLocation();
        const projectData = location.state;
        const [comments, setComments] = useState([]);
        const [users, setUsers] = useState([]);

        const navigate = useNavigate()

        useEffect(() => {
            try {
                fetchUsers()
                    .then(res => setUsers(res));
                getProjectComments(projectData)
                    .then(commentsData => commentsData.sort((a, b) => a.date.localeCompare(b.date)))
                    .then(res => setComments(res))
            } catch (error) {
                console.error("error" + {error});
                localStorage.setItem('User_ID', 'null');
                navigate('/login')
            }
        }, []);

        if (users === undefined || comments === undefined) {
            return <>Give me 1 second</>
        }

        function getUserData(user_id) {
            return users.filter(a => a.id == user_id)[0] || {'name': 'loading..', 'surname': ''};
        }


        return (
            <div className="container" style={{marginLeft: '20px', marginTop: '10px'}}>
                <h2>Project Details</h2>
                <p>Author: {getUserData(projectData.author).name} {getUserData(projectData.author).surname} </p>
                <p>Name: {projectData.name}</p>
                <p>Description: {projectData.description}</p>
                <p>Status: {projectData.status}</p>
                <p>
                    Assigned Users:{' '}
                    {projectData.users.map((user) => `${user.name} ${user.surname}`).join(', ')}
                </p>
                {comments.length !== 0 && (
                    <>
                        <h2>Comments</h2>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Author</th>
                                <th>Date</th>
                                <th>Comment</th>
                            </tr>
                            </thead>
                            <tbody>
                            {comments.map((comment) => (
                                <tr
                                    key={comment.id}
                                    style={comment.author === projectData.author ? {backgroundColor: 'lightblue'} : {}}
                                >
                                    <td>{getUserData(comment.author).name} {getUserData(comment.author).surname}</td>
                                    <td>{format(parseISO(comment.date), "dd-MM-yyyy'  'HH:mm:ss")}</td>
                                    <td>{comment.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                    </>
                )}
                <button className="btn btn-primary mt-2" onClick={() => navigate('/')}>
                    Back
                </button>
            </div>
        );
    };

export default ProjectDetails;