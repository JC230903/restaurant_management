// Signup.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component for user signup
export default function Signup() {
  // State for user credentials
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '',
  });

  let navigate = useNavigate();

  // Handler for input changes
  const onChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Sending a POST request to the server with user credentials
      const response = await fetch('http://localhost:5001/api/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      // Handling the response
      const data = await response.json();

      if (response.ok) {
        // If signup is successful, navigate to the home page
        navigate('/');
      } else {
        // Log the error for unsuccessful signup
        console.error('Signup failed:', data.error);
      }
    } catch (error) {
      // Log the error for any other issues
      console.error('Error:', error.message);
    }
  };

  // Rendering the signup form
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          {/* Form inputs */}
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          {/* Email input */}
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              name='email'
              value={credentials.email}
              onChange={onChange}
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          {/* Password input */}
          <div className='mb-3'>
            <label htmlFor='exampleInputPassword1' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              name='password'
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          {/* Geolocation input */}
          <div className='mb-3'>
            <label htmlFor='geolocation' className='form-label'>
              Geolocation
            </label>
            <input
              type='text'
              className='form-control'
              id='geolocation'
              name='geolocation'
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>
          {/* Check me out checkbox */}
          <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              Check me out
            </label>
          </div>
          {/* Submit button */}
          <button type='submit' className='m-3 btn btn-primary'>
            Submit
          </button>
          {/* Link to login */}
          <Link to='/Login' className='m-3 btn btn-danger'>
            Already a user? Login here
          </Link>
        </form>
      </div>
    </>
  );
}
