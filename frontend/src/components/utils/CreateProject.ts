import { format, parseISO } from 'date-fns';

export const createProject = async (projectData) => {
    try {
        projectData.start_date = format(parseISO(projectData.start_date), "yyyy-MM-dd'T'HH:mm:ss");
        projectData.end_date = format(parseISO(projectData.end_date), "yyyy-MM-dd'T'HH:mm:ss");

      const response = await fetch('http://localhost:8000/project/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
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
  