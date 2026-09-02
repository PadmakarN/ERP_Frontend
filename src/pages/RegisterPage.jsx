import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../Config/apiConfig';
import { useNavigate } from 'react-router-dom';
import '../pages/Styles/RegisterPage.css';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
     setRegister(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {username,password});
      if (response.status === 200) {
        alert(`User ${username} Registered Sucessfully`)
        navigate('/login');  // Redirect to login page after successful registration
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage('Error Register User:',error.response.data.message)
        alert(error.response.data.message);
      }
      else{
        setMessage('Error registering user'+error);
      }
      
    }
    finally{
        setRegister(false);
      }
  };
  const navigateToLogin =()=>{
    navigate('/login')//
  };
  return (
    <div className="register-container">
      <h2>Register</h2>
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
      <button onClick={handleRegister}>
        {register?'Registering...':'Register'} </button>
      {message && <p>{message}</p>}
      <p>Already have an account? <span onClick={navigateToLogin}>Login here</span></p>
    </div>
  );
};

export default RegisterPage;
