import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Services from './components/pages/Services';
// import Products from './components/pages/Products';
import Contact from './components/pages/Contact';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import PrivateComponent from './components/pages/PrivateComponent';
import Textify from './components/pages/Textify';
import Imaginex from './components/pages/Imaginex';
import History from './components/pages/History';
import Profile from './components/pages/Profile';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route element={<PrivateComponent />}>
            <Route path='/textify' element={<Textify/>} />
            <Route path='/imaginex' element={<Imaginex/>} />
            <Route path='/history' element={<History/>} />
            <Route path='/profile' element={<Profile/>} />
          </Route>
          <Route path='/contact' element={<Contact />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
