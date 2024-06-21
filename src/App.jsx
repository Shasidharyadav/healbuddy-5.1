import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Hero from './Components/Hero/Hero';
import Companies from './Components/Companies/Companies';
import Residencies from './Components/Residencies/Residencies';
import Component from './Components/Component/Component';
import Value from './Components/Value/Value';
import Pain from './Components/Pain/Pain';
import Contact from './Components/Contact/Contact';
import Footer from './Components/Footer/Footer';
import AssesHome from './Components/Assessment/AssesHome/AssesHome';
import Auth from './Components/Auth/Auth';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

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
          <Route path="/auth" element={<Auth />} />
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
