import React, {useState} from 'react';
import UserEditForm from './UserEditForm.tsx';
import UserConfirmEdit from './UserConfirmEdit.tsx';
import {useLocation, useNavigate} from 'react-router-dom';

const UpdateUserData = (data, state) => {
    if (!data.password || data.password == '**********') {
        data.password = '';
    }
    const user_id =  sessionStorage.getItem('user_id');
    const mappedData = {
        first_name: data.first_name || data.firstName,
        last_name: data.last_name || data.lastName,
        password: data.password,
        age: data.age,
        gender: data.gender === 'male' ? 'Mr' : 'Ms',
        email: data.email,
        phone_number: data.phone,
    };
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;

    const link = user_id ? `${backendUrl}/users/${user_id}/` : `${backendUrl}/users/`;

    const METHOD = user_id ? 'PUT' : 'POST';

    const token = sessionStorage.getItem('token');

    const header_auth = token ? {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Token ${token}`
    } : {
        "Content-Type": "application/json",
        "Accept": "application/json"
    };


    fetch(`${link}`, {
        method: `${METHOD}`,
        headers: header_auth,
        credentials: 'include',
        body: JSON.stringify(mappedData),
    })
        .then((response) => {
            if (response.ok) {
                console.log('Correct update data.');
                return
            } else {
                console.error(response);
                return(response)
            }
        })
        .catch((error) => {
            console.error('Network Error: ', error);
            return(error)
        });
};

const EditUserData: React.FC = () => {
    const {state} = useLocation();
    const [currentScreen, setCurrentScreen] = useState('form');
    const [error, setError] = useState("");
    const [formData, setFormData] = useState(
        state ? {
                first_name: state.first_name,
                last_name: state.last_name,
                password: '**********',
                age: state.age,
                gender: state.gender === 'Mr' ? 'male' : 'female',
                email: state.email,
                phone: state.phone_number,
            } :
            {
                first_name: "",
                last_name: "",
                firstName: "",
                lastName: "",
                password: "",
                age: "",
                gender: "",
                email: "",
                phone: "",
            });
    const navigate = useNavigate();

    const handleNext = (data) => {
        setFormData(data);
        setCurrentScreen('confirmation');
    };

    const handleConfirm = () => {
        const response = UpdateUserData(formData, state);
        if(response){
            setError(response)
        } else {
        setCurrentScreen('form');
        navigate('/');
        }
    };

    const handleCancel = () => {
        // setCurrentScreen('form');
        navigate('/user')
        // window.location.href = '/';
    };

    const handleBack = (data) => {
        setFormData(data)
        setCurrentScreen('form');
    };

    const handleBackFromEdit = () => {
        navigate(-1)
    }

    return (
        <div className="container" style={{marginLeft: '20px', marginTop: '10px'}}>
            {currentScreen === 'form' && (
                <UserEditForm
                    onCancel={handleCancel}
                    onNext={handleNext}
                    onBack={handleBackFromEdit}
                    tmpData={formData}/>
            )}
            {currentScreen === 'confirmation' && (
                <UserConfirmEdit
                    onCancel={handleCancel}
                    onBack={handleBack}
                    onConfirm={handleConfirm}
                    formDataValue={formData}
                />
            )}
             {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default EditUserData;