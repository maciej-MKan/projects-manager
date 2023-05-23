export async function getProjectComments(projectData){
    const project_id = projectData.id;
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    try {
      const response = await fetch(`${backendUrl}/comment/by_project?project_id=${project_id}`, {
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
  
      const data = await response.json();
      const parsedComments = data.map((comment) => JSON.parse(comment));
      return parsedComments;

    } catch (error) {
      console.error(error);
      throw error;
    }
  };