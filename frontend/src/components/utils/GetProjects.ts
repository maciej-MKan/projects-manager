export async function fetchProjectsByUser(user_id): Promise<[]> {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

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