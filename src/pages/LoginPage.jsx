import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config/apiConfig';
import { useNavigate } from 'react-router-dom';
import '../pages/styles/LoginPage.css';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import Alert from '../components/Alert';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (username === '' || password === '') {
        setMessage('All fields are required!');
        return;
      }

      const response = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
        
      },
      { withCredentials: true }
    );

      if (response.status === 200) {
        const user = response.data;
        dispatch(login(user));
        navigate('/home');
        console.log(user);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    navigate('/register');
  };
 
  useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  document.addEventListener('keypress', handleKeyPress);

  return () => {
    document.removeEventListener('keypress', handleKeyPress); // cleanup
  };
}, [username, password]); // optional: depends if handleLogin uses state
  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <p>
        Don't have an account?{' '}
        <span onClick={navigateToRegister} style={{ color: '#007bff', cursor: 'pointer' }}>
          Register here
        </span>
      </p>

      {/* Alert box on error */}
      {message && (
        <Alert
          message={message}
          duration={3000}
          onClose={() => setMessage('')}
        />
      )}
    </div>
  );
};

export default LoginPage;
