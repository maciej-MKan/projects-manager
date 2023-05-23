import { format, parseISO } from 'date-fns';

export async function updateProject(projectData){
  const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    try {
        projectData.start_date = format(parseISO(projectData.start_date), "yyyy-MM-dd'T'HH:mm:ss");
        projectData.end_date = format(parseISO(projectData.end_date), "yyyy-MM-dd'T'HH:mm:ss");

      const response = await fetch(`${backendUrl}/project/update`, {
        method: 'PUT',
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify(projectData),
      });
  
      if (!response.ok) {
        throw new Error('Wystąpił błąd podczas tworzenia projektu.');
      }
  
      const data = await response.json();
      const parsedProject = JSON.parse(data);
      console.log(parsedProject)
      return parsedProject;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };