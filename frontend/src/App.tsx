import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectsScreen from './components/ProjectScreen.tsx';
import LoginScreen from './components/LoginScreen.tsx';
import UserEditScreen from './components/UserEditScreen.tsx';
import UserProjectsScreen from './components/UserProjectsScreen.tsx';
import CreateProjectScreen from './components/ProjectCreateEditScreen.tsx';
import DeleteProjectScreen from './components/DeleteProjectScreen.tsx';
import ProjectDetails from './components/ProjectDetilsScreen.tsx';
import CreateComment from './components/CommentCreateScreen.tsx';

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
      <div className="container">
        <Routes>
          <Route path="/" element={isLoggedIn ? <UserProjectsScreen /> : <LoginScreen onLogin={handleLogin} />}/>
          <Route path="/edit-profile" element={isLoggedIn ? <UserEditScreen /> : <LoginScreen onLogin={handleLogin} />} />
          <Route path='/project-details' element={isLoggedIn ? <ProjectDetails /> : <LoginScreen onLogin={handleLogin} />} />
          <Route path='/project' element={isLoggedIn ? <CreateProjectScreen /> : <LoginScreen onLogin={handleLogin} />} />
          <Route path='/project-delete' element={isLoggedIn ? <DeleteProjectScreen /> : <LoginScreen onLogin={handleLogin} />} />
          <Route path='/comment' element={isLoggedIn ? <CreateComment /> : <LoginScreen onLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;