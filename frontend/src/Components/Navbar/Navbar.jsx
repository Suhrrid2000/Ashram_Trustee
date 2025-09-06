import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '@/assets/Logo.png';
import { useAuth } from '../../AuthContext.jsx';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const scrollToSection = (id) => {
    const goToSection = () => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    };

    if (!isHome) {
      navigate(`/#${id}`);
      setTimeout(goToSection, 100);
    } else {
      goToSection();
    }

    setShowDropdown(false);
    setMenuOpen(false);
  };

  const handleAboutClick = () => {
    setShowDropdown(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    const handleScroll = () => {
      setShowDropdown(false);

      if (isHome) {
        const sections = ['leaders', 'about', 'motive'];
        for (let id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const top = el.getBoundingClientRect().top;
            if (top >= -100 && top <= 200) {
              setActiveSection(id);
              return;
            }
          }
        }
        setActiveSection('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    if (isHome) {
      if (location.hash) {
        setActiveSection(location.hash.replace('#', ''));
      } else {
        setActiveSection('');
      }
    } else {
      setActiveSection('');
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location, isHome]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo-title-wrapper">
          <img src={logo} alt="logo" className="logo" />
          <span className="site-title">Tridandi Swami Parankush Sevak Sangha</span>
        </div>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(prev => !prev)}>
        ☰
      </div>

      <div className={`navbar-right ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li className="dropdown" ref={dropdownRef}>
            <span
              className="about-us-link hover-underline"
              onClick={handleAboutClick}
            >
              About Us
            </span>
            <span
              className="dropdown-arrow hover-underline"
              onClick={handleAboutClick}
            >
              ▾
            </span>

            {showDropdown && (
              <ul className="dropdown-menu">
                <li
                  className={isHome && activeSection === 'leaders' ? 'active' : ''}
                  onClick={() => scrollToSection('leaders')}
                >
                  Paramparas
                </li>
                <li
                  className={isHome && activeSection === 'about' ? 'active' : ''}
                  onClick={() => scrollToSection('about')}
                >
                  History
                </li>
                <li
                  className={isHome && activeSection === 'motive' ? 'active' : ''}
                  onClick={() => scrollToSection('motive')}
                >
                  Motive
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              to="/events"
              className={location.pathname === '/events' ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Announcements & Events
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={location.pathname === '/contact' ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link
                to="/manage"
                className={location.pathname === '/manage' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Manage Site
              </Link>
            </li>
          )}

          <li>
            {isLoggedIn ? (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={location.pathname === '/login' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Member Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
