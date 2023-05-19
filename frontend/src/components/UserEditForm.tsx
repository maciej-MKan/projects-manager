import React, { useState } from 'react';

interface EditFormProps {
    onCancel: () => void;
    onNext: (data: FormData) => void;
    tmpData: FormData;
  }
  
  interface FormData {
    firstName: string;
    lastName: string;
    password: string;
    age: string;
    gender: string;
    email: string;
    phone: string;
  }
  
const EditForm: React.FC<EditFormProps> = ({ onCancel, onNext, tmpData }) => {
    const [firstName, setFirstName] = useState(tmpData.firstName);
    const [lastName, setLastName] = useState(tmpData.lastName);
    const [password, setPassword] = useState(tmpData.password);
    const [age, setAge] = useState(tmpData.age);
    const [gender, setGender] = useState(tmpData.gender);
    const [email, setEmail] = useState(tmpData.email);
    const [phone, setPhone] = useState(tmpData.phone);


  const handleNext = () => {
    // Walidacja danych i przeniesienie do ekranu potwierdzenia
    onNext({
      firstName,
      lastName,
      password,
      age,
      gender,
      email,
      phone,
    });
  };

  return (
    <div>
      <h2>Formularz edycji danych użytkownika</h2>
      <form>
        <div>
          <label>Imię:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Nazwisko:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Hasło:</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Wiek:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Płeć:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Wybierz</option>
            <option value="male">Mężczyzna</option>
            <option value="female">Kobieta</option>
          </select>
        </div>
        <div>
          <label>Adres e-mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Numer telefonu:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="button" onClick={onCancel}>
          Anuluj
        </button>
        <button type="button" onClick={handleNext}>
          Dalej
        </button>
      </form>
    </div>
  );
};

export default EditForm;
