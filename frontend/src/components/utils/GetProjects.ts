const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

export async function fetchProjectsByUser(user_id): Promise<[]> {

    try {
        const response = await fetch(`${backendUrl}/user/self_projects?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: 'include',
            mode: 'cors',
        });
        if (response.ok) {
            const projectsData = await response.json();
            const parsedProjects = projectsData.map((project) => JSON.parse(project));
            return parsedProjects;
        } else {
            throw new Error('Error when projects get');
        }
    } catch (error) {
        throw new Error(error);
    }

}

export async function fetchProjectDetails(projectData){
    const project_id = projectData.id;
    try {
        const response = await fetch(`${backendUrl}/projects/${project_id}/`, {
            method: 'GET',
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
            return {'error': response.status}
        }
    } catch (error) {
        throw new Error(`Connection Fail [${error}]`);
    }
}