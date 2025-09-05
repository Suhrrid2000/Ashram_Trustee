import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import Leaders from './Components/Leaders/Leaders';
import About from './Components/About/About';
import Motive from './Components/Motive/Motive'; 
import Login from './Components/Login/Login';
import Manage from './Components/Manage/Manage';
import Contact from './Components/Contact/Contact';
import Events from './Components/Events/Events';
import Footer from './Components/Footer/Footer';

import ManageEvents from './Components/ManageEvents/ManageEvents';
import ManageAnnouncements from './Components/ManageAnnouncements/ManageAnnouncements';
import ManageNews from './Components/ManageNews/ManageNews';

import { useAuth } from './AuthContext.jsx';


const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return null;
};

const Home = () => {
  const leadersRef = useRef(null);
  const motiveRef = useRef(null);

  const scrollToLeaders = () => {
    leadersRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onExploreClick={scrollToLeaders} />

      {/* Leaders Section with id */}
      <div id="leaders" ref={leadersRef}>
        <Leaders />
      </div>

      {/* About Section with id */}
      <div id="about">
        <About />
      </div>

      {/* Motive Section with id */}
      <div id="motive" ref={motiveRef}>
        <Motive />
      </div>
    </>
  );
};

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <ScrollToHash />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/manage" element={<ProtectedRoute element={<Manage />} />} />
            <Route path="/manage/events" element={<ProtectedRoute element={<ManageEvents />} />} />
            <Route path="/manage/announcements" element={<ProtectedRoute element={<ManageAnnouncements />} />} />
            <Route path="/manage/news" element={<ProtectedRoute element={<ManageNews />} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
