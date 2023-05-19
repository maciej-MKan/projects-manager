import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectsScreen from './components/ProjectScreen.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import UserEditScreen from './components/UserEditScreen.tsx';
import UserProjectsScreen from './components/UserProjectsScreen.tsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const userId = parseInt(localStorage.getItem('User_ID'), 10);
    if (!isNaN(userId)) {
      console.log(userId)
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    };
    console.log(isLoggedIn)

  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? <UserProjectsScreen /> : <LoginScreen onLogin={handleLogin} />}/>
          <Route path="/edit-profile" element={isLoggedIn ? <UserEditScreen /> : <LoginScreen onLogin={handleLogin} />} />
          <Route path='/project-details' element={isLoggedIn ? <div /> : <LoginScreen onLogin={handleLogin} />} />
          <Route path='/project-create' element={isLoggedIn ? <div /> : <LoginScreen onLogin={handleLogin} />} />
        </Routes>
    </Router>
  );
}

export default App;