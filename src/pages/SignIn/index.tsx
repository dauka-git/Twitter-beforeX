import React from 'react';
import { Typography, Button, Box, useTheme } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/PeopleOutline';
import MessageIcon from '@mui/icons-material/ModeCommentOutlined';
import { LoginModal } from './components/LoginModal';
import { RegisterModal } from './components/RegisterModal';

export const useStylesSignIn = () => {
  const theme = useTheme();
  
  return {
    wrapper: {
      display: 'flex',
      height: '100vh',
    },
    blueSide: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#71C9F8',
      flex: '0 0 50%',
      overflow: 'hidden',
      position: 'relative',
    },
    blueSideBigIcon: {
      position: 'absolute',
      left: '50%',
      top: '53%',
      transform: 'translate(-50%, -50%)',
      width: '260%',
      height: '260%',
    },
    blueSideListInfo: {
      position: 'relative',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      width: 380,
      '& h6': {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        fontWeight: 700,
        fontSize: 20,
      },
    },
    blueSideListInfoItem: {
      marginBottom: 40,
    },
    blueSideListInfoIcon: {
      fontSize: 32,
      marginRight: 15,
    },
    loginSide: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 50%',
    },
    loginSideTwitterIcon: {
      fontSize: 45,
    },
    loginSideWrapper: {
      width: 380,
    },
    loginSideTitle: {
      fontWeight: 700,
      fontSize: 32,
      marginBottom: 60,
      marginTop: 20,
    },
    loginSideField: {
      marginBottom: 18,
    },
    registerField: {
      marginBottom: theme.spacing(5),
    },
    loginFormControl: {
      marginBottom: theme.spacing(2),
    },
  };
};

export const SignIn: React.FC = (): React.ReactElement => {
  const classes = useStylesSignIn();
  const [visibleModal, setVisibleModal] = React.useState<'signIn' | 'signUp'>();

  const handleClickOpenSignIn = (): void => {
    setVisibleModal('signIn');
  };

  const handleClickOpenSignUp = (): void => {
    setVisibleModal('signUp');
  };

  const handleCloseModal = (): void => {
    setVisibleModal(undefined);
  };

  return (
    <Box sx={classes.wrapper}>
      <Box component="section" sx={classes.blueSide}>
        <TwitterIcon color="primary" sx={classes.blueSideBigIcon} />
        <Box component="ul" sx={classes.blueSideListInfo}>
          <Box component="li" sx={classes.blueSideListInfoItem}>
            <Typography variant="h6">
              <SearchIcon sx={classes.blueSideListInfoIcon} />
              Читайте о том, что вам интересно.
            </Typography>
          </Box>
          <Box component="li" sx={classes.blueSideListInfoItem}>
            <Typography variant="h6">
              <PeopleIcon sx={classes.blueSideListInfoIcon} />
              Узнайте, о чем говорят в мире.
            </Typography>
          </Box>
          <Box component="li" sx={classes.blueSideListInfoItem}>
            <Typography variant="h6">
              <MessageIcon sx={classes.blueSideListInfoIcon} />
              Присоединяйтесь к общению.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box component="section" sx={classes.loginSide}>
        <Box sx={classes.loginSideWrapper}>
          <TwitterIcon color="primary" sx={classes.loginSideTwitterIcon} />
          <Typography sx={classes.loginSideTitle} gutterBottom variant="h4">
            Узнайте, что происходит в мире прямо сейчас
          </Typography>
          <Typography>
            <b>Присоединяйтесь к Твиттеру прямо сейчас!</b>
          </Typography>
          <br />
          <Button
            onClick={handleClickOpenSignUp}
            style={{ marginBottom: 20 }}
            variant="contained"
            color="primary"
            fullWidth>
            Зарегистрироваться
          </Button>
          <Button onClick={handleClickOpenSignIn} variant="outlined" color="primary" fullWidth>
            Войти
          </Button>
          <LoginModal open={visibleModal === 'signIn'} onClose={handleCloseModal} />
          <RegisterModal open={visibleModal === 'signUp'} onClose={handleCloseModal} />
        </Box>
      </Box>
    </Box>
  );
};
