import React from 'react';
import { BrowserRouter as Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen.tsx';
// import HomeScreen from './HomeScreen';

const AppRouter: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        {/* <Route path="/home" element={<HomeScreen />} /> */}
      </Routes>
  );
};

export default AppRouter;