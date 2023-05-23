import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getProjectComments } from './utils/GetProjectComments.ts';
import { format, parseISO } from 'date-fns';
import { fetchUser } from './utils/GetUserData.ts';

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
    const [authorName, setAuthorName] = useState('');
  
    const fetchAuthorName = async (user_id) => {
      try {
        const data = await fetchUser(user_id);
        setAuthorName(`${data.first_name} ${data.last_name}`);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      fetchAuthorName(projectData.author);
    }, [projectData.author]);

  console.log(comments.length) 

  return (
    <div className="container" style={{ marginLeft: '20px', marginTop: '10px'}}>
      <h2>Project Details</h2>
      <p>Author: {projectData.author}</p>
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