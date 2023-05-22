export const addComment = async (projectId, comment) => {
    try {
      const response = await fetch('http://localhost:8000/comment/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          projectId: projectId,
          comment: comment,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas dodawania komentarza.');
      }
  
      // Przetwarzanie odpowiedzi z serwera (jeśli wymagane)
    } catch (error) {
      console.error(error);
      throw error;
    }
  };