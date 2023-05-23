export async function logout(){
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    try {
      const response = await fetch(`${backendUrl}/logout`, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      });
  
      if (!response.ok) {
        throw new Error('Server error');
      }
  
      const data = await response.json();
      const parsedProject = JSON.parse(data);
      console.log(parsedProject)
      return parsedProject;
    } catch (error) {
      throw new Error(error)
    }};