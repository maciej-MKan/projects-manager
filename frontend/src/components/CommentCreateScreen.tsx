import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addComment } from './utils/CreateComment.ts';

const CreateComment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [comment, setComment] = useState('');

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Dodawanie komentarza
      await addComment(state.projectId, comment);

      // Przekierowanie do ekranu z szczegółami projektu
      navigate(`/project-details`, {state: state});
    } catch (error) {
      console.error(error);
      // Obsługa błędu dodawania komentarza
    }
  };

  return (
    <div>
      <h1>Dodaj komentarz</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={comment} onChange={handleInputChange} placeholder="Treść komentarza" />
        <button type="submit">Dodaj komentarz</button>
        <button onClick={() => navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};

export default CreateComment;