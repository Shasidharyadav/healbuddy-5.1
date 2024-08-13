import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/LandingPage/Header/Header';
import Hero from './Components/LandingPage/Hero/Hero';
import Companies from './Components/LandingPage/Companies/Companies';
import Residencies from './Components/LandingPage/Residencies/Residencies';
import Component from './Components/LandingPage/Component/Component';
import Value from './Components/LandingPage/Value/Value';
import Pain from './Components/LandingPage/Pain/Pain';
import Contact from './Components/LandingPage/Contact/Contact';
import Footer from './Components/LandingPage/Footer/Footer';
import AssesHome from './Components/Application/Assessment/AssesHome/AssesHome';
import Auth from './Components/Application/Auth/Auth';
import Dashboard from './Components/Application/Dashboard/Dashboard';
import PrivateRoute from './Components/Application/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Hero />
              <Companies />
              <Residencies />
              <Component />
              <Value />
              <Pain />
              <Contact />
              <Footer />

            </>
          } />
          <Route path="/assessment-home" element={<AssesHome />} />
          <Route path="/auth" element={<div className="auth-body">
            <Auth /> </div>} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
