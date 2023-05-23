import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addComment } from './utils/CreateComment.ts';

const CreateComment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [comment, setComment] = useState('');
  const [step, setStep] = useState(1);


  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   // Dodawanie komentarza
    //   await addComment(state.projectId, comment);

    //   // Przekierowanie do ekranu z szczegółami projektu
    //   navigate(`/project-details`, {state: state});
    // } catch (error) {
    //   console.error(error);
    //   // Obsługa błędu dodawania komentarza
    // }
  };

  const handleNext = () => {
    setStep(2);
  }

  const handlePreviousStep = () => {
    setStep(1);
  };

  return (
    <div className="container">
      {step === 1 && (
        <>
          <h1>Add Comment</h1>
          <form onSubmit={handleNext}>
            <textarea
              value={comment}
              onChange={handleInputChange}
              placeholder="Comment content"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary me-2">
              Add Comment
            </button>
            <button className="btn btn-secondary me-2" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </form>
        </>
      )}
      {step === 2 && (
        <div>
          <h1>Confirm Comment Addition:</h1>
          <p>Project Name: {state.name}</p>
          <p>Project Author: {state.author}</p>
          <p>Comment: {comment}</p>
          {/* <p>State: {state.id}</p>
          <p>date: {today.getDate()}</p> */}
          <button className="btn btn-success me-2" onClick={handleSubmit}>
            Submit
          </button>
          <button className="btn btn-primary me-2" onClick={handlePreviousStep}>
            Back
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateComment;