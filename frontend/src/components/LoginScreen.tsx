import React, { useState } from 'react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
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
  };

  return (
    <div>
      <h2>Ekran logowania</h2>
      <form>
        <div>
          <label htmlFor="login">Login:</label>
          <input
            type="text"
            id="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Hasło:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Zaloguj się
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;