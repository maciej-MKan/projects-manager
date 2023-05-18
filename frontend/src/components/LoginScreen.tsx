import React, { useState } from 'react';

const LoginScreen: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `login=${login}&password=${password}`
      });

      // Obsłuż odpowiedź z serwera
      if (response.ok) {
        // Pomyślnie zalogowano, wykonaj odpowiednie akcje
      } else {
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