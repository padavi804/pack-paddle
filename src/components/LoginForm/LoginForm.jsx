import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div className="wholeForm">
        <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

<Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Username"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        /> </div></Box>
<Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-password-input"
          label="Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        /> </div></Box>

      {/* <div>
        
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            
            
          />
        </label>
      </div> */}
      {/* <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div> */}
      <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
