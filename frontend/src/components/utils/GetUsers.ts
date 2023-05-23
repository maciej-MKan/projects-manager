export async function fetchUsers(): Promise<[]> {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

    try {
      const response = await fetch(`${backendUrl}/users`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: 'include',
            mode: 'cors',
        });
      if (response.ok) {
        const data = await response.json();
        const parsedUsers = data.map((user) => JSON.parse(user));
        return parsedUsers;
      } else {
        throw new Error('Błąd pobierania użytkowników');
      }
    } catch (error) {
      throw new Error('Błąd połączenia lub inny błąd');
    }
  }