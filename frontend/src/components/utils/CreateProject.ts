import { format, parseISO } from 'date-fns';

export async function createProject(projectData){
  const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

  try {
    projectData.start_date = projectData.start_date / 1000;
    projectData.end_date = projectData.end_date / 1000;

    const response = await fetch(`${backendUrl}/projects/`, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(projectData),
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
  