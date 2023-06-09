export async function deleteProject(projectData){
    const project_id = projectData.id;
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    const request_body = {
        body: {'id' : project_id}
    }

    try {
      const response = await fetch(`${backendUrl}/projects/${project_id}`, {
          method: 'DELETE',
          credentials: 'include',
          mode: 'cors',
          headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Token ${sessionStorage.getItem('token')}`
          }
      });

        if (response.ok) {
            return await response.json();
        } else {
            return {'error': response}
        }
    } catch (error) {
        throw new Error(`Connection Fail [${error}]`);
    }
}