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
  hashPassword: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
}

const ConfirmEdit: React.FC<ConfirmScreenProps> = ({ onCancel, onBack, onConfirm, formDataValue }) => {

    console.log(formDataValue)
  const handleConfirm = () => {
    onConfirm();
  };

  const handleBack = () => {
    onBack(formDataValue)
  }

  return (
    <div className="container mt-4">
      <p>Please confirm the entered data:</p>
      <div className="mb-3">
        <strong>First Name:</strong> {formDataValue.firstName}
      </div>
      <div className="mb-3">
        <strong>Last Name:</strong> {formDataValue.lastName}
      </div>
      <div className="mb-3">
        <strong>Password:</strong> {formDataValue.password}
      </div>
      <div className="mb-3">
        <strong>Age:</strong> {formDataValue.age}
      </div>
      <div className="mb-3">
        <strong>Gender:</strong> {formDataValue.gender === 'male' ? 'Male' : 'Female'}
      </div>
      <div className="mb-3">
        <strong>Email Address:</strong> {formDataValue.email}
      </div>
      <div className="mb-3">
        <strong>Phone Number:</strong> {formDataValue.phone}
      </div>
      <div>
        <button className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button className="btn btn-primary me-2" onClick={handleBack}>
          Back
        </button>
        <button className="btn btn-success" onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmEdit;
