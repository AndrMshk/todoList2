import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, LinearProgress } from '@mui/material';
import { TodoLists } from '../components/todolists/TodoLists';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useAppDispatch, useAppSelector } from './store';
import { Login } from '../components/login/Login';
import { Route, Routes } from 'react-router-dom';
import { logoutTC } from '../components/login/login-reducer';
import CircularProgress from '@mui/material/CircularProgress';
import { setAppInitializedTC } from './app-reducer';

function App() {
  const status = useAppSelector(state => state.app.status);
  const isLogin = useAppSelector(state => state.login.isLogin);
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  const name = useAppSelector(state => state.login.name);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAppInitializedTC());
  }, []);

  const [linearProgressStyle, setLinearProgressStyle] = useState<React.CSSProperties>({
    position: 'absolute',
    top: '60px',
  });

  window.onscroll = () => {
    if (window.scrollY > 60) {
      setLinearProgressStyle({
        position: 'fixed',
        top: '0px',
      });
    } else {
      setLinearProgressStyle({
        position: 'absolute',
        top: '60px',
      });
    }
  };

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC(false));
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ width: '100%', position: 'fixed', top: '30%', textAlign: 'center' }}>
        <CircularProgress size={200} />
      </div>
    );
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="relative" style={{ height: '64px' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {name}
            </Typography>
            {!isLogin
              ? <Button color="inherit">Login</Button>
              : <Button
                onClick={logoutHandler}
                color="inherit"
              >Exit</Button>
            }
          </Toolbar>
          {status === 'loading' && <LinearProgress style={{ ...linearProgressStyle, width: '100%' }} />}
        </AppBar>
      </Box>
      <Container fixed>
        <Routes>
          <Route path={'/login'} element={<Login />} />
          <Route path={'/'} element={<TodoLists />} />
        </Routes>
        <ErrorMessage />
      </Container>
    </>
  );
}

export default App;


