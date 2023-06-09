export async function fetchUser(user_id) {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

    try {
        const response = await fetch(`${backendUrl}/users/${user_id}/`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }});

        if (response.ok){
            return await response.json();
        } else {
            sessionStorage.removeItem('user_id')
            return {'error': response.status}
        }

    } catch (error) {
        throw new Error(`Connection Fail [${error}]`);
    }
}