import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { TextField, Button } from '@mui/material';
import { useSetNotif } from '../hooks/store';
import UserContext from '../UserContext';

const Login = () => {
  const setNotif = useSetNotif()
  const {login} = useContext(UserContext)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event, username, password) => {
    event.preventDefault();

    try {
      await login(username, password)
      navigate('/');
      setPassword('');
      setUsername('');
    } catch {
      setNotif('wrong username or password', 'error' );
    }
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={(event) => handleLogin(event, username, password)}>
        <div>
          <TextField
            label="username"
            variant="standard"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            variant="standard"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button variant="contained" style={{ marginTop: 10 }} type="submit">
          login
        </Button>
      </form>
    </div>
  );
};

export default Login;
