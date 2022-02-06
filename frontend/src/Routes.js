import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/navbar';
import Home from './pages/home';
import Trash from './pages/trash';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' index element={<Home />} />
        <Route path='/trash' element={<Trash />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
