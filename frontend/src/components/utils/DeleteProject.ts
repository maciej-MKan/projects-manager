export const deleteProject = async (projectData) => {
    const project_id = projectData.id;
    try {
      const response = await fetch(`http://localhost:8000/project/delete?project_id=${project_id}`, {
        method: 'DELETE',
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
      const parsedProject = JSON.parse(data);
      console.log(parsedProject)
      return parsedProject;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };