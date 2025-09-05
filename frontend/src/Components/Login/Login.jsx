import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validEmail = 'admin';
  const validPassword = 'admin';

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === validEmail && password === validPassword) {
      login();
      navigate('/');
    } else {
      setError('Incorrect credentials. Please try again.');
    }
  };

  return (
    <div className="login-container">
      {/* Moved outside login-box */}
      <button className="back-btn top-left-btn" onClick={() => navigate('/')}>
        ← Back to Homepage
      </button>

      <div className="login-box">
        <h2>Member Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <p className="login-note">This portal is for authorized members only.</p>
      </div>
    </div>
  );
};

export default Login;
