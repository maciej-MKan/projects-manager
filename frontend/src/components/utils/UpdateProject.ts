export async function updateProject(projectData) {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    const project_id = projectData.id;
    try {

        const toUpdate = {
            'name': projectData.name,
            'description': projectData.description,
            'start_date': projectData.start_date / 1000,
            'end_date': projectData.end_date / 1000,
            'status' : projectData.status,
            'users': projectData.users.map(u => u.id)
        }

        const response = await fetch(`${backendUrl}/projects/${project_id}/`, {
            method: 'PUT',
            credentials: 'include',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            },
            body: JSON.stringify(toUpdate),
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