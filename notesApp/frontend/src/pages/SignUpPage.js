import React, { useState } from 'react'
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom';
import functions from '../functions/functions';

const SignUpPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  let {togglePwd,clickable} = functions();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // errors

  const [usError, setUsError] = useState("");
  const [nmError, setNmError] = useState("");
  const [emError, setEmError] = useState("");
  const [psError, setPsError] = useState("");

  const sendData = async () => {
    try {
      const response = await fetch('http://localhost:8000/signUp', {
        mode:"cors",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers if needed
        },
        body: JSON.stringify({
          username:username,
          name:name,
          email:email,
          password:password
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      
      if(responseData.fale === 1){
        setEmError(responseData.msg)
      }
      else{
      setData(responseData);

      alert("Successfull Submited.")
      clickable('.loginLinkBtn');
    }

    } catch (error) {
      setError(error);
    }
  }


  function submitForm(){
    if(username === ""){
      setUsError("User Name Is Required !")
    }
    else if(name === ""){
      setNmError("Name Is Required !")
      setUsError("")
    }
    else if(email === ""){
      setEmError("Email Is Required !")
      setNmError("")
    }
    else if (!isValidEmail(email)) {
      setEmError('Invalid email format!');
    }
    else if(password === ""){
      setPsError("Password Is Required !")
      setEmError("")
    }
    else{
      setUsError("")
      setNmError("")
      setEmError("")
      setPsError("")

      // sending data to server
      sendData();
    
    }
  }

  const isValidEmail = (email) => {
    // Basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };


  return (
    <>
      <Navbar isMenu={false}/>
      <div className="el-center-div">
        <div className="formConteiner">
          <h3>Sign Up</h3>
          <label htmlFor="username">Username</label>
          <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" placeholder='Enter Username' name='username' id='username' className='formInput'/>
          <span className="error">{usError}</span>
          <label htmlFor="name">Name</label>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Enter Your Name' name='name' id='name' className='formInput'/>
          <span className="error">{nmError}</span>

          <label htmlFor="email">Email</label>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder='Enter Your Email' name='email' id='email' className='formInput'/>
          <span className="error">{emError}</span>

          <label htmlFor="password">Password</label>
          <div className="passwordInput formInput">
          <input onChange={(e)=>setPassword(e.target.value)} value={password} autoComplete="new-password" type="password" placeholder='Enter Your Password' name='password' id='password'/>
          <i className="ri-eye-off-line togglePwd text-xl cursor-pointer" onClick={()=>togglePwd("#password",".togglePwd")}></i>
          </div>
          <span className="error">{psError}</span>

          <p className='mt-3'>Already Have An Account <Link to="/login" className='text-blue-700 loginLinkBtn'>Login</Link></p>
          <button className="btn btn-dark my-3" onClick={submitForm}>Sign Up</button>

        </div>
      </div>
    </>
  )
}

export default SignUpPage