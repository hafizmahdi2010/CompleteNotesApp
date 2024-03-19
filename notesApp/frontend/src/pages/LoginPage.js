import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import functions from '../functions/functions';

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  let { togglePwd,clickable } = functions()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emError, setEmError] = useState('');
  const [psError, setPsError] = useState('');

  const sendData = async () => {
    try {
      const response = await fetch('http://localhost:8000/login', {
        mode:"cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify({
          email:email,
          password:password
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      
      if(responseData.fale === 1){
        setError(responseData.msg)
      }
      else{
      setError("")
      setData(responseData);
      alert("Successfull Submited.")
      localStorage.setItem("username",responseData.username);
      localStorage.setItem("email",responseData.email);
      localStorage.setItem("userId",responseData.userId);
      localStorage.setItem("userLogin",true);
      clickable(".logoText")
    }

    } catch (error) {
      setError(error);
    }
  }

  function submitForm() {
    if (email === '') {
      setEmError('Email is required!');
    } else if (!isValidEmail(email)) {
      setEmError('Invalid email format!');
    } else if (password === '') {
      setPsError('Password is required!');
      setEmError('');
    } else {
      setEmError('');
      setPsError('');
      sendData()
    }
  }

  const isValidEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <>
      <Navbar isMenu={false} />
      <div className="el-center-div">
        <div className="formConteiner">
          <h3>Login</h3>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            placeholder="Enter Your Email"
            name="email"
            id="email"
            className="formInput"
          />
          <span className="error">{emError}</span>

          <label htmlFor="password">Password</label>
          <div className="passwordInput formInput">
            <input onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="new-password" type="password" placeholder='Enter Your Password' name='password' id='password' />
            <i className="ri-eye-off-line togglePwd text-xl cursor-pointer" onClick={() => togglePwd("#password", ".togglePwd")}></i>

          </div>
          <span className="error">{psError}</span>

          <p className='mt-3'>Don't Have An Account <Link to="/signUp" className='text-blue-700'>Sign Up</Link></p>
          <span className="error">{error}</span>
          <button className="btn btn-dark my-3" onClick={submitForm}>
            Login
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
