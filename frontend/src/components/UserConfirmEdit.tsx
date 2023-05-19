import React from 'react';

interface ConfirmScreenProps {
  onCancel: () => void;
  onBack: (data: FormDataValue) => void;
  onConfirm: () => void;
  formDataValue: FormDataValue;
}

interface FormDataValue {
  firstName: string;
  lastName: string;
  password: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
}

const ConfirmEdit: React.FC<ConfirmScreenProps> = ({ onCancel, onBack, onConfirm, formDataValue }) => {

  const handleConfirm = () => {
    // Wykonanie operacji i przeniesienie na poprzedni ekran
    onConfirm();
  };

  const handleBack = () => {
    onBack(formDataValue)
  }

  return (
    <div>
      <h2>Ekran potwierdzenia</h2>
      <p>Proszę potwierdzić wprowadzone dane:</p>
      <div>
        <strong>Imię:</strong> {formDataValue.firstName}
      </div>
      <div>
        <strong>Nazwisko:</strong> {formDataValue.lastName}
      </div>
      <div>
        <strong>Hasło:</strong> {formDataValue.password}
      </div>
      <div>
        <strong>Wiek:</strong> {formDataValue.age}
      </div>
      <div>
        <strong>Płeć:</strong> {formDataValue.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}
      </div>
      <div>
        <strong>Adres e-mail:</strong> {formDataValue.email}
      </div>
      <div>
        <strong>Numer telefonu:</strong> {formDataValue.phone}
      </div>
      <button type="button" onClick={onCancel}>
        Anuluj
      </button>
      <button type="button" onClick={handleBack}>
        Powrót
      </button>
      <button type="button" onClick={handleConfirm}>
        Wykonaj
      </button>
    </div>
  );
};

export default ConfirmEdit;
