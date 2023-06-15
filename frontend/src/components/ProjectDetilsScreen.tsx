import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {format} from 'date-fns';
import {fetchProjectDetails} from "./utils/GetProjects.ts";

const ProjectDetails = () => {
    const {state} = useLocation();
    const [projectData, setProjectData] = useState({
        id: "",
        name: "",
        description: "",
        start_date: 0,
        end_date: 0,
        status: "NEW",
        author: {
            first_name: "",
            last_name: ""
        },
        users: [],
        comments: []
    });
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchProjectDetails(state);
                setProjectData(res);
                const commentsData = res.comments;
                setComments(commentsData.sort((a, b) => a.timestamp > b.timestamp))
            } catch (error) {
                console.log(error);
            }
        };
        if (state.name) {
            fetchData().catch((error) => console.log(error));
        }
    }, []);

    if (users === undefined || comments === undefined) {
        return <>Give me 1 second</>
    }

    return (
        <div className="container" style={{marginLeft: '20px', marginTop: '10px'}}>
            <div className="row">
                <div className="col-md-6">
                    <h2>Project Details</h2>
                    <p>Author: {projectData.author.first_name} {projectData.author.last_name} </p>
                    <p>Name: {projectData.name}</p>
                    <p>Description: {projectData.description}</p>
                    <p>Status: {projectData.status}</p>
                    <p>
                        Assigned Users:{' '}
                        {projectData.users.map((user) => `${user.first_name} ${user.last_name}`).join(', ')}
                    </p>
                </div>
                <div className="col-md-6">
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
                                        <td>{comment.user.first_name} {comment.user.last_name}</td>
                                        <td>{format(new Date(comment.timestamp * 1000), 'yyyy-MM-dd hh:mm')}</td>
                                        <td style={{
                                            maxWidth: 300,
                                            wordWrap: "break-word",
                                            overflowWrap: "break-word"
                                        }}>{comment.comment}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
            <button className="btn btn-secondary mt-2" onClick={() => navigate('/user')}>
                Cancel
            </button>
        </div>

    );
};

export default ProjectDetails;