import TwitterIcon from '@mui/icons-material/Twitter';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ActivatePage } from './pages/ActivatePage';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { SignIn } from './pages/SignIn';
import { useHomeStyles } from './pages/theme';
import { UserPage } from './pages/User';
import { fetchUserData } from './store/ducks/user/actionCreators';
import { selectIsAuth, selectUserStatus } from './store/ducks/user/selectors';
import { LoadingStatus } from './store/types';
import { Box } from '@mui/material';

function App() {
  const classes = useHomeStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const loadingStatus = useSelector(selectUserStatus);
  const isReady = loadingStatus !== LoadingStatus.NEVER && loadingStatus !== LoadingStatus.LOADING;

  React.useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  React.useEffect(() => {
    if (!isAuth && isReady) {
      navigate('/signin');
    } else if (location.pathname === '/') {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth, isReady]);

  if (!isReady) {
    return (
      <Box sx={classes.centered}>
        <TwitterIcon color="primary" style={{ width: 80, height: 80 }} />
      </Box>
    );
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/tweet/:id" element={<Home />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/user/activate/:hash" element={<ActivatePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
}

export default App;
