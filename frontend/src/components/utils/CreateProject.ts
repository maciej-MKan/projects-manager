import {format, parseISO} from 'date-fns';

export async function createProject(projectData) {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

    try {

        const toCreate = {
            'name': projectData.name,
            'description': projectData.description,
            'start_date': projectData.start_date,
            'end_date': projectData.end_date,
        }

        const response = await fetch(`${backendUrl}/projects/`, {
            method: 'POST',
            credentials: 'include',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(toCreate),
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
  