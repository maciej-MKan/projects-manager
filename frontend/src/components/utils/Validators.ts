export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const containsSpaces = /\s/.test(value);

    if (value === "") {
        return 'Type Email.';
    }
    if (value.length > 100) {
        return 'Password too long.';
    }
    if (!emailRegex.test(value)) {
        return 'It doesn\'t look like an email';
    }
    if (containsSpaces) {
        return 'Username cannot contain spaces.';
    }
    return '';
};

export const validatePassword = (value) => {
    if (value.trim() === '') {
        return 'Password is required.';
    }
    if (value.length > 100) {
        return 'Password too long';
    }
    if (value.length < 3) {
        return 'Password probably too short'
    }
    return '';
};

export const validateName = (value) => {
    if (value.trim() === '') {
        return 'Name is required.';
    }
    if (!/^[a-zA-Z]{3,30}$/.test(value)) {
        return 'Name should contain only letters and be between 3 and 30 characters long.';
    }
    return '';
};

export const validateDescription = (value) => {
    if (value.trim() === '') {
        return 'Description is required.';
    }
    if (!/^[a-zA-Z]{10,30}$/.test(value)) {
        return 'Description should contain only letters and be between 10 and 30 characters long.';
    }
    return '';
};

export const validateAge = (value) => {
    if (value === null) {
        return 'Age is required.';
    }
    if (!/^(1[89]|[2-9][0-9]|100)$/.test(value)) {
        return 'Age should be a number between 18 and 100.';
    }
    return '';
};

export const validatePhoneNumber = (value) => {
    if (value.trim() === '') {
        return '';
    }
    if (!/^(\+\d{2,3}(\s)?)?\d{9}$/.test(value)) {
        return 'Invalid phone number. It should start with a "+" sign, followed by a country code (1-3 digits) and then 9 digits.';
    }
    return '';
};

export const validateGender = (value) => {
    if (value.trim() === '') {
        return 'Please select gender';
    }
    return '';
};