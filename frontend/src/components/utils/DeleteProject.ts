export async function deleteProject(projectData){
    const project_id = projectData.id;
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

    try {
      const response = await fetch(`${backendUrl}/project/delete?project_id=${project_id}`, {
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