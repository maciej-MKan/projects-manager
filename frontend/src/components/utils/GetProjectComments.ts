export const getProjectComments = async (projectData) => {
    const project_id = projectData.id;
    try {
      const response = await fetch(`http://localhost:8000/comment/by_project?project_id=${project_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        mode: 'cors',
      });
  
      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas tworzenia projektu.');
      }
  
      const data = await response.json();
      const parsedComments = data.map((comment) => JSON.parse(comment));
      return parsedComments;

    } catch (error) {
      console.error(error);
      throw error;
    }
  };