import React, { useEffect, useState } from 'react';
import { SHA256 } from 'crypto-js';

interface EditFormProps {
    onCancel: () => void;
    onNext: (data: FormData) => void;
    tmpData: FormData;
  }
  
  interface FormData {
    firstName: string;
    lastName: string;
    password: string;
    hashPassword: string;
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
    const [hashPassword, sethashPassword] = useState('');


  const handleNext = () => {
    onNext({
      firstName,
      lastName,
      password,
      hashPassword,
      age,
      gender,
      email,
      phone,
    });
  };

  const encryptPassword = (password) => {
    setPassword(password);
    sethashPassword(SHA256(password).toString())
  }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setMaskedPassword(password.replace(/./g, '*'));
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [password]);

  return (
    <div className="container mt-4">
      <h2>Edit User Data Form</h2>
      <form>
        <div className="mb-3">
          <label className="mr-3">First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mr-3">Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mr-3">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => encryptPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mr-3">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mr-3">Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="mr-3">Email Address:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mr-3">Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary me-2" onClick={handleNext}>
          Next
        </button>
      </form>
    </div>
  );
};

export default EditForm;
