import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import {validateEmail, validatePassword} from "./utils/Validators.ts";

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  sessionStorage.removeItem('token');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isLoginFormValid = login.trim() !== '' && password.trim() !== '';

  const handleLogin = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_SERVER;
    cleanUpUsername(login);
    try {
      const response = await fetch(`${backendUrl}/login/`, {
        method: "POST",
        credentials: 'include',
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept" : "application/json"

        },
        body: JSON.stringify({ username: login, password: password }),
      });

      if (response.ok) {
        setPassword("");
        setError("");
        const res_json = await response.json();
        sessionStorage.setItem('token', res_json.token);
        sessionStorage.setItem('user_id', res_json.user_id)
        navigate('/user')

      } else {
        if (response.status === 403){
          setError('No access to api');
        }
        if (response.status === 401){
          setError('Permission Denied');
        }
        if (response.status === 400){
          setError('Wrong login or password');
        }
        setPassword("");
        sessionStorage.removeItem('token');
      }
    } catch (error) {
      console.log(error)
      setLogin("")
      setPassword("")
      sessionStorage.removeItem('token');
      navigate('/login')
    }
  };

  const handleSignIn = async () => {
    navigate('/edit-profile')
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && isLoginFormValid) {
      handleLogin().catch(error => setError(error));
    }
  };

  const checkEmail = (value) =>{
    if (value !== "") {
      return validateEmail(value)
    }
    return ""
  }

  const  checkPassword = (value) =>{
    if (value !== "") {
      return validatePassword(value)
    }
    return ""
  }

  const cleanUpUsername = (username) => {
    const cleanedValue = username.replace(/\s/g, '');
    setLogin(cleanedValue);
  };

  return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="container" style={{ width: '400px' }}>
          <h2 className="mb-4">Please login:</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="login" className="form-label">Username:</label>
              <input
                  type="text"
                  className="form-control"
                  id="login"
                  value={login}
                  onChange={(e) => {
                    setLogin(e.target.value)
                    setError("")
                  }}/>
                  {checkEmail(login) && <p className="text-danger">{checkEmail(login)}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  onKeyUp={handleKeyUp}
              />
              {checkPassword(password) && <p className="text-danger">{checkPassword(password)}</p>}
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="d-flex justify-content-between">
              <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginRight: '10px' }}
                  onClick={handleLogin}
                  disabled={!isLoginFormValid}
              >
                Log In
              </button>
              <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ marginRight: '10px' }}
                  onClick={handleSignIn}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default LoginScreen;