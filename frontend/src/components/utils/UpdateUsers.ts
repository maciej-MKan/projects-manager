export const updateUsers = async (users) => {
  console.log("users")
  console.log(users)
  console.log("users")
    try {
      const requests = users.map((user) =>
        fetch('http://localhost:8000/user/update', {
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