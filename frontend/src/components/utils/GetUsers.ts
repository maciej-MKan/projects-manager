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
          return data.map((user) => JSON.parse(user));
      } else {
        throw new Error('Error when users get');
      }
    } catch (error) {
      throw new Error(error);
    }
  }