import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        credentials: 'include',
        mode: 'cors',
        body: `login=${login}&password=${password}`
      });

      // Obsłuż odpowiedź z serwera
      if (response.ok) {
        const user_id = await response.json();
        console.log(user_id.result);
        localStorage.setItem('User_ID', user_id.result);
        onLogin(); // Wywołaj funkcję onLogin po pomyślnym zalogowaniu
      } else {
        console.log("bad login");

        // Wystąpił błąd podczas logowania, obsłuż go
      }
    } catch (error) {
      // Wystąpił błąd połączenia lub inny błąd, obsłuż go
    }

    onLogin();
    navigate('/');
  };

  return (
    <div className="container" style={{ marginLeft: '20px', marginTop: '10px'}}>
      <h2 className="mb-4">Please login: </h2>
      <form>
        <div className="mb-3">
          <label htmlFor="login" className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" style={{ marginRight: '10px' }} onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;