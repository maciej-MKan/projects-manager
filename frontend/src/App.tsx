import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen.tsx';
import UserEditScreen from './components/UserEditScreen.tsx';
import UserProjectsScreen from './components/UserProjectsScreen.tsx';
import CreateProjectScreen from './components/ProjectCreateEditScreen.tsx';
import DeleteProjectScreen from './components/DeleteProjectScreen.tsx';
import ProjectDetails from './components/ProjectDetilsScreen.tsx';
import CreateComment from './components/CommentCreateScreen.tsx';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('token') != null);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };


  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={!isLoggedIn ? <LoginScreen onLogin={handleLogin} /> : <UserProjectsScreen  />}/>
          <Route path="/login" element={<LoginScreen onLogin={handleLogin} /> } />
          <Route path="/user" element={<UserProjectsScreen />} />
          <Route path="/edit-profile" element={<UserEditScreen />} />
          <Route path='/project-details' element={<ProjectDetails />} />
          <Route path='/project' element={<CreateProjectScreen />} />
          <Route path='/project-delete' element={<DeleteProjectScreen />} />
          <Route path='/comment' element={<CreateComment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;