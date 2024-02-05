import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useUserAuth } from '../context/UserAuthContext';
import { Link, useNavigate } from 'react-router-dom';

const PhoneSignUp = () => {
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState('');
  const { setUpRecaptcha } = useUserAuth();
  const navigate = useNavigate();

  const getOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (number === '' || number === undefined) return setError('Please Enter a valid Number');
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (err) {
      setError(err.message);
    }
    console.log(number);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (otp === '' || otp === undefined) return setError('Please Enter a valid OTP');
    try {
      await confirmObj.confirm(otp);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
    console.log(otp);
  };

  return (
    <>
      <div className="p-4 box flex justify-center">
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{ display: !flag ? 'flex' : 'none ' }}>
          <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
            <PhoneInput
              defaultCountry="IN"
              value={number}
              onChange={(value) => setNumber(value)}
              placeholder="Enter Phone Number" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-200 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ' 
            />
            <div id="recaptcha-container"></div>
          </Form.Group>
          <div className="button-right ">
            <Link to="/">
              <Button variant="secondary" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Cancel</Button>
            </Link>{' '}
            &nbsp;
            <Button variant="primary" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit">
              Send OTP
            </Button>
          </div>
        </Form>

        <Form onSubmit={verifyOtp} style={{ display: flag ? 'block' : 'none ' }}>
          <Form.Group className="mb-3" controlId="formBasicotp">
            <Form.Control
              type="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>
          <div className="button-right">
            <Link to="/">
              <Button variant="secondary">Cancel</Button>
            </Link>{' '}
            &nbsp;
            <Button variant="primary" type="submit">
              Verify OTP
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PhoneSignUp;
