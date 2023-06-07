import React, { useEffect, useState } from 'react';
import { SHA256 } from 'crypto-js';
import {useNavigate} from "react-router-dom";
import {
  validateEmail,
  validatePassword,
  validateAge,
  validatePhoneNumber,
  validateName,
  validateGender
} from "./utils/Validators.ts";
import {First} from "react-bootstrap/PageItem";


interface EditFormProps {
    onCancel: () => void;
    onNext: (data: {
      firstName: string;
      lastName: string;
      password: string;
      gender: string;
      phone: string;
      hashPassword: string;
      age: string;
      email: string
    }) => void;
    tmpData: FormData;
  }
  
  interface FormData {
    first_name: string;
    last_name: string;
    firstName: string;
    lastName: string;
    password: string;
    hashPassword: string;
    age: string;
    gender: string;
    email: string;
    phone: string;
  }
  
const EditForm: React.FC<EditFormProps> = ({ onCancel, onNext, onBack, tmpData }) => {
    const [firstName, setFirstName] = useState(tmpData.first_name || tmpData.firstName);
    const [lastName, setLastName] = useState(tmpData.last_name || tmpData.lastName);
    const [password, setPassword] = useState(tmpData.password);
    const [age, setAge] = useState(tmpData.age);
    const [gender, setGender] = useState(tmpData.gender);
    const [email, setEmail] = useState(tmpData.email);
    const [phone, setPhone] = useState(tmpData.phone);
    const [hashPassword, sethashPassword] = useState('');
    const [error, setError] = useState("");
    const [validFirstName, setValidFirstName] = useState(true);
    const [validLastName, setValidLastName] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [validAge, setValidAge] = useState(true);
    const [validGender, setValidGender] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPhone, setValidPhone] = useState(true);
    const navigate = useNavigate();

    let isValidForm =
        !error &&
        validFirstName &&
        validLastName &&
        validPassword &&
        validAge &&
        validGender &&
        validEmail &&
        validPhone;

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
  };

  const checkEmail = (value) => {
    let valid= validateEmail(value)
    setValidEmail(valid === "")
    return valid
  }

  const checkFirstName = (value) => {
    let valid = validateName(value)
    setValidFirstName(valid === "")
    return valid
  }

  const checkLastName = (value) => {
    let valid = validateName(value)
    setValidLastName(valid === "")
    return valid
  }

  const checkPassword = (value) =>{
    let valid =  validatePassword(value)
    setValidPassword(valid === "")
    return valid
  }

  const checkAge = (value) =>{
    let valid = validateAge(value)
    setValidAge(valid === "")
    return valid
  }

  const checkPhone = (value) =>{
    let valid = validatePhoneNumber(value)
    setValidPhone(valid === "")
    return valid
  }

  const checkGender = (value) => {
    let valid = validateGender(value)
    setValidGender(valid === "")
    return valid
  }

  useEffect(() => {
      if (email !== undefined) checkEmail(email);
      if (firstName !== undefined) checkFirstName(firstName);
      if (lastName !== undefined) checkLastName(lastName);
      if (password !== undefined) checkPassword(password);
      if (age !== undefined) checkAge(age);
      if (gender !== undefined) checkGender(gender);
  }, [])

return(
    <div className="container mt-4">
        {tmpData.email !== "" && <h2>Edit User Data</h2> || <h2>Create User</h2>}
      <form>
        <div className="mb-3">
          <label className="mr-3">First Name: {" "}</label>
          <input
            type="text"
            value={firstName}
            onLoad={(e) => checkFirstName(firstName)}
            onChange={(e) => {
              setFirstName(e.target.value)
              checkFirstName(e.target.value)
            }}
          />
          {!validFirstName && <p className="text-danger">{firstName ? "Invalid" : "Required"}</p>}
        </div>
        <div className="mb-3">
          <label className="mr-3">Last Name: {" "}</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
              checkLastName(e.target.value)
            }}
          />
          {!validLastName && <p className="text-danger">{lastName ? "Invalid" : "Required"}</p>}
        </div>
        <div className="mb-3">
          <label className="mr-3">Password: {" "}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              encryptPassword(e.target.value)
              checkPassword(e.target.value)
            }}
          />
          {!validPassword && <p className="text-danger">{password ? "Invalid" : "Required"}</p>}
        </div>
        <div className="mb-3">
          <label className="mr-3">Age: {" "}</label>
          <input
            type="number"
            value={age}
            onChange={(e) => {
              setAge(e.target.value)
              checkAge(e.target.value)
            }}
          />
          {!validAge && <p className="text-danger">{age ? "Invalid" : "Required"}</p>}
        </div>
        <div className="mb-3">
          <label className="mr-3">Gender: </label>
          <select value={gender} onChange={(e) => {
            setGender(e.target.value)
            checkGender(e.target.value)
          }}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {!validGender && <p className="text-danger">{"Please select"}</p>}
        </div>
        <div className="mb-3">
          <label className="mr-3">Email Address: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              checkEmail(e.target.value)
            }}
          />
          {!validEmail && <p className="text-danger">{email ? "Invalid" : "Required"}</p>}
        </div>
        <div className="mb-3">
          <label className="mr-3">Phone Number:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value)
              checkPhone(e.target.value)
            }}
          />
          {!validPhone && <p className="text-danger">{"Invalid"}</p>}
        </div>
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary me-2" onClick={onBack}>
          Back
        </button>
        <button type="button" className="btn btn-success me-2" onClick={handleNext} disabled={!isValidForm}>
          Submit
        </button>
      </form>
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default EditForm;
