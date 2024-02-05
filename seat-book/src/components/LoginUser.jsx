import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button} from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";
import PhoneSignUp from './PhoneSignup.jsx';
// import '../styles/Login.css';

const Login = () => {
  const { googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3 text-center text-2xl"> Please Login</h2>
        <hr />
        <div className="flex  justify-center">
          <GoogleButton
            className="g-btn "
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
        <hr />
        
      </div>
      <PhoneSignUp />
     
    </>
  );
};


export default Login;