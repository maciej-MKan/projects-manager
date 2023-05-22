import React, { useEffect, useState } from 'react';
import UserEditForm from './UserEditForm.tsx';
import UserConfirmEdit from './UserConfirmEdit.tsx';
import { useLocation, useNavigate } from 'react-router-dom';


const UpdateUserData = (data, state) => {
    if (!data.password || data.password == '**********' || data.password.lenght < 3){
        data.password = '';
    };
    console.log(data.password)
    console.log(state.password)
    console.log(state.projects)
    const mappedData = {
      id: localStorage.getItem('User_ID'),
      name: data.firstName,
      surname: data.lastName,
      password: data.password,
      age: data.age,
      gender: data.gender,
      email: data.email,
      phone_number: data.phone,
      projects: state.projects,
    };
  
    fetch(`${backendUrl}/user/update`, {
      method: 'PUT',
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(mappedData),
    })
      .then((response) => {
        if (response.ok) {
          // Obsłuż sukces
          console.log('Dane użytkownika zostały zaktualizowane.');
        } else {
          // Obsłuż błąd
          console.error('Wystąpił błąd podczas aktualizacji danych użytkownika.');
        }
      })
      .catch((error) => {
        // Obsłuż błąd sieciowy
        console.error('Wystąpił błąd sieciowy:', error);
      });
  };

const EditUserData: React.FC = () => {
  const { state } = useLocation();
  const [currentScreen, setCurrentScreen] = useState('form');
  const [formData, setFormData] = useState({
    firstName: state.name,
    lastName: state.surname,
    password: '**********',
    age: state.age,
    gender: state.gender,
    email: state.email,
    phone: state.phone_number,
  });
  const navigate = useNavigate();

  const handleNext = (data) => {
    setFormData(data);
    setCurrentScreen('confirmation');
  };

  const handleConfirm = () => {
    // Wykonanie operacji na danych
    console.log('Dane użytkownika zostały zaktualizowane:', formData);
    UpdateUserData(formData, state);
    // Powrót do ekranu poprzedniego
    setCurrentScreen('form');
  };

  const handleCancel = () => {
    // Powrót do ekranu poprzedniego
    setCurrentScreen('form');
    navigate('/')
    // window.location.href = '/';
  };

  const handleBack = (data) => {
    setFormData(data)
    // Powrót do ekranu edycji
    setCurrentScreen('form');
  };

  const handleLogout = () => {
    document.cookie = "auth_tkt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.setItem('User_ID', "NaN");
    navigate('/login');
  }


  return (
    <div className="container" style={{ marginLeft: '20px', marginTop: '10px'}}>
      <div className='text-end'>
        <button className="btn btn-primary me-2" onClick={handleLogout}>
            Logout
        </button>
      </div>
      {currentScreen === 'form' && (
        <UserEditForm onCancel={handleCancel} onNext={handleNext} tmpData={formData}/>
      )}
      {currentScreen === 'confirmation' && (
        <UserConfirmEdit
          onCancel={handleCancel}
          onBack={handleBack}
          onConfirm={handleConfirm}
          formDataValue={formData}
        />
      )}
    </div>
  );
};

export default EditUserData;