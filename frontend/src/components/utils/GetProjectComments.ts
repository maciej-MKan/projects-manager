export async function getProjectComments(projectData){
    const project_id = projectData.id;
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    try {
      const response = await fetch(`${backendUrl}/comments/${project_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        credentials: 'include',
        mode: 'cors',
      });
  
      if (!response.ok) {
        throw new Error('Error when fetch comment data');
      }

      return await response.json();

    } catch (error) {
      console.error(error);
      throw error;
    }
  };