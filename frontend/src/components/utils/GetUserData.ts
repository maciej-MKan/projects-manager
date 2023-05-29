export async function fetchUser(user_id) {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

    try {
        const response = await fetch(`${backendUrl}/user?user_id=${user_id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: 'include',
        mode: 'cors',
        });

        if (response.ok) {
            const userDataRaw = await response.json();
            return JSON.parse(userDataRaw);
        } else {
            throw new Error('Błąd pobierania użytkowników');
        }
    } catch (error) {
        throw new Error(`Connection Fail [${error}]`);
    }
};