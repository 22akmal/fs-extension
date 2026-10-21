import { useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import BlogBody from './components/BlogBody';
import Login from './components/Login';
import Blog from './components/Blog';
import Create from './components/Create';
import Notif from './components/Notif';
import Users from './components/Users';
import ErrorBoundary from './ErrorBoundary';
import UserContext from './UserContext';
import User from './components/User';

const App = () => {
  const {initialize, logout, user} = useContext(UserContext)

  useEffect(() => initialize(), []);

  const padding = { padding: 5 };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color='inherit' component={Link} to="/users">users</Button>
          {user && (
            <Button color="inherit" component={Link} to="/create">
              new blog
            </Button>
          )}
          {!user ? (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          ) : (
            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Notif />

      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <ErrorBoundary>
              <Blog />
            </ErrorBoundary>
          }
        />

        <Route
          path="/users/:id"
          element={
            <ErrorBoundary>
              <User/>
            </ErrorBoundary>
          }
        />

        <Route
          path="/"
          element={
            <ErrorBoundary>
              <BlogBody />
            </ErrorBoundary>
          }
        />

        <Route 
          path='/users'
          element={
            <ErrorBoundary>
              <Users />
            </ErrorBoundary>
          }
        />

        <Route
          path="/login"
          element={
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          }
        />

        <Route
          path="/create"
          element={
            <ErrorBoundary>
              <Create />
            </ErrorBoundary>
          }
        />

        <Route path="*" element={<h1>404 - Page not found</h1>} />
      </Routes>
    </Container>
  );
};

export default App;
