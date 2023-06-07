export async function refreshUser() {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

    try {
        console.log('refresh')
        const response = await fetch(`${backendUrl}/login`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            }
        });
        if (response.ok) {
            const res = await response.json();
            sessionStorage.setItem('user_id', res.user_id)
        } else {
            sessionStorage.removeItem('user_id')
            return {'error': response.status}

        }


    } catch (error) {
        throw new Error(error)
    }
}