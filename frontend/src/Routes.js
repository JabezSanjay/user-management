import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/navbar';
import Toast from './components/Toast';
import Home from './pages/home';
import Trash from './pages/trash';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Toast />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/trash' element={<Trash />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
