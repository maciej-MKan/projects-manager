export async function fetchUsers(): Promise<[]> {
    try {
      const response = await fetch('http://localhost:8000/users', {
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
        // Mapowanie odpowiedzi na listę użytkowników
        console.log(parsedUsers)
        return parsedUsers;
      } else {
        throw new Error('Błąd pobierania użytkowników');
      }
    } catch (error) {
      throw new Error('Błąd połączenia lub inny błąd');
    }
  }