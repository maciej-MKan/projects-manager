import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjectComments } from './utils/GetProjectComments.ts';

const ProjectDetails = () => {
  const location = useLocation();
  const projectData = location.state;
  const [comments, setComments] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const commentsData = await getProjectComments(projectData);
      const sortedComments = commentsData.sort((a, b) => a.date.localeCompare(b.date));
      setComments(sortedComments);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(comments.length) 

  return (
    <div className="container" style={{ marginLeft: '20px', marginTop: '10px'}}>
      <h2>Project Details</h2>
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
                  style={comment.author === projectData.author ? { backgroundColor: 'lightblue' } : {}}
                >
                  <td>{comment.author}</td>
                  <td>{comment.date}</td>
                  <td>{comment.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <button className="btn btn-primary mt-2" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default ProjectDetails;