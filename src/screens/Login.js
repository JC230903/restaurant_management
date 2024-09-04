// login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component for user login
export default function Login() {
  // State for user credentials
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
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
      const response = await fetch('http://localhost:5001/api/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      // Handling the response
      console.log(response);

      // Check if login was successful (customize this part based on your server response)
      if (response.ok) {
        // Extract the authToken from the response
        const json = await response.json();
        const { authToken } = json;
        localStorage.setItem('useremail',credentials.email);
        // Store the authToken in localStorage
        localStorage.setItem('authToken', json.authToken);
        
        // Redirect to the home page or another desired page
        navigate('/');
      } else {
        // Handle unsuccessful login (show an error message, etc.)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  // Rendering the login form
  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          {/* ... (unchanged) */}
          {/* Password input */}
          {/* ... (unchanged) */}
          {/* Submit button */}
          <button type='submit' className='m-3 btn btn-primary'>
            Submit
          </button>
          {/* Link to signup */}
          <Link to='/Signup' className='m-3 btn btn-danger'>
            New user? Sign up here
          </Link>
        </form>
      </div>
    </>
  );
}
