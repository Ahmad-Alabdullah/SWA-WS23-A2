'use client';

import { Alert, Box, Button, Card, Snackbar, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import LoginContext from '@/context/LoginProvider';
import { login, logout } from '@/graphql/graphql';

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
});

const LoginForm = styled('form')({
  width: '300px',
  padding: '16px',
  backgroundColor: '#fff',
  borderRadius: '4px',
});

const InputField = styled(TextField)({
  marginBottom: '16px',
});

function LoggedOut() {
  const credentialsDefaultState = {
    username: '',
    password: '',
  };

  const { setError, updateIsLoggedIn } = useContext(LoginContext);

  // useStates
  const [credentials, setCredentials] = useState(credentialsDefaultState);

  const resetCredentials = () => {
    setCredentials(credentialsDefaultState);
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const { username, password } = credentials;
    try {
      const result = await login(username, password);
      const { errors, loggedIn } = result;
      if (loggedIn) {
        updateIsLoggedIn();
      }
      if (errors.length > 0) {
        const errorListItems = errors.map((error) => (
          <li key={error}>{error}</li>
        ));
        setError(<ul>{errorListItems}</ul>);
      }
      resetCredentials();
    } catch (error: any) {
      console.error('Error during login:', error.message);
    }
  };

  return (
    <>
      <LoginForm onSubmit={handleSubmit}>
        <Typography variant='h5'>
          Login
        </Typography>
        <InputField
          variant="outlined"
          required
          fullWidth
          id="username"
          label="Benutzername"
          name="username"
          onChange={handleChange}
          value={credentials.username}
          type="text"
          autoComplete="username"
          autoFocus
        />
        <InputField
          variant="outlined"
          required
          fullWidth
          id="password"
          label="Passwort"
          name="password"
          onChange={handleChange}
          value={credentials.password}
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
        >
          Anmelden
        </Button>
      </LoginForm>
    </>
  );
}

function LoggedIn() {
  const { username, updateIsLoggedIn } = useContext(LoginContext);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await logout();
      updateIsLoggedIn();
    } catch (error: any) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      <h2>Angemeldet als &apos;{username}&apos;</h2>
      <Button
        fullWidth
        type="submit"
        variant="contained"
        style={{ backgroundColor: '#047857' }}
      >
        Abmelden
      </Button>
    </LoginForm>
  );
}

function Login() {
  const { error, setError, isLoggedIn, updateIsLoggedIn } =
    useContext(LoginContext);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // useEffects
  useEffect(() => {
    setShowSnackbar(error !== undefined);
  }, [error]);

  useEffect(() => {
    updateIsLoggedIn();
  }, []);

  const handleClose = () => {
    setError(undefined);
  };

  return (
    <CenteredBox>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Card
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          padding: '0 10rem 5rem 10rem',
        }}
      >
        {isLoggedIn && <LoggedIn />}
        {!isLoggedIn && <LoggedOut />}
      </Card>
    </CenteredBox>
  );
}

export default Login;
