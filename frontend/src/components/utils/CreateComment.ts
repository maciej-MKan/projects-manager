export async function addComment(projectId, comment){
  
  const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
  const author = localStorage.getItem('User_ID');
  let date = new Date().toJSON();

  const data = {
    'project' : projectId,
    'comment' : comment
  }

    try {
      const response = await fetch(`${backendUrl}/comments/`, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Token ${sessionStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        return await response.json();
      } else {
        return {'error': await response.json()}
      }
    } catch (error) {
      throw new Error(`Connection Fail [${error}]`);
    }
  }