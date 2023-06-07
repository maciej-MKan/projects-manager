export async function logout() {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    try {
        const response = await fetch(`${backendUrl}/login`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }
        });
        return await response.json();

    } catch (error) {
        throw new Error(error)
    }
}