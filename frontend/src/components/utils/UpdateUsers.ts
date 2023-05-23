export async function updateUsers(users){
  const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    try {
      const requests = users.map((user) =>
        fetch(`${backendUrl}/user/update`, {
          method: 'PUT',
          credentials: 'include',
          mode: 'cors',
          body: JSON.stringify(user),
        })
      );
  
      const responses = await Promise.all(requests);
  
      for (const response of responses) {
        if (!response.ok) {
          throw new Error('Wystąpił błąd podczas aktualizowania użytkowników.');
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };