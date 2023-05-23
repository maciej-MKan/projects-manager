export async function addComment(projectId, comment){
  
  const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
  const author = localStorage.getItem('User_ID');
  let date = new Date().toJSON();

    try {
      const response = await fetch(`${backendUrl}/comment/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          project: projectId,
          author: author,
          description: comment,
          date: date
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error when comment adding');
      }
  
    } catch (error) {
      console.error(error);
      throw error;
    }
  };