import React from 'react';
import { 
  Button,
 
  // Link,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

import { useSearchParams } from 'react-router-dom';

import {Modal} from '../components/Dialog/index';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100vh',

}));

const BlueSide = styled('div')(({ theme }) => ({
  backgroundColor: '#1DA1F2',
  flex: '0 0 50%', 
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative'
}));

const LoginSide = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: '0 0 50%', 
}));

const LoginSideTitle = styled(Typography)({
  fontWeight: 700, 
  fontSize: 32,
  marginBottom: 45, 
  marginTop: 20,
});




const LoginSideWrapper = styled('div')({
  // display: 'flex',
  // flexDirection: 'column',
  // gap: theme => theme.spacing(3),
  width: 380,
  
});

const BluesideList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  color: 'white', 
  width: 380,
  '& h6': {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    fontWeight: 700,
    marginBottom: 40,
    fontSize: 20,
  },
  position: 'relative'
});

const BluesideListItems = styled('li')({
  marginBottom: 40,
});

export const SignIn: React.FC = (): React.ReactElement => {

  // const [isModalOpen, setModalOpen] = React.useState<'signIn' | 'signUp' | null>(null); 

  
  const [searchParams, setSearchParams] = useSearchParams();
  const modalMode = searchParams.get('modal'); 

  const handleOpenModal = (mode: 'signIn' | 'signUp') => {
    searchParams.set('modal', mode);
    setSearchParams(searchParams);
  };

  const handleCloseModal = () => {
    searchParams.delete('modal');
    setSearchParams(searchParams);
  };

  return (
    <Wrapper>
      <BlueSide>
      <TwitterIcon color='primary' sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '230%',
        height: '230%',
      }} />
        <BluesideList>
          <BluesideListItems><Typography variant='h6'> <SearchIcon style={{fontSize: 30, marginRight: 15, }}/> 
          Читайте о том, что вам интересно.</Typography>
          </BluesideListItems>
          <BluesideListItems>
          <Typography variant='h6'>
            <GroupIcon style={{fontSize: 30, marginRight: 15, }} />
            Узнайте, о чем говорят в мире.</Typography>
          </BluesideListItems>
          <BluesideListItems>
          <Typography variant='h6'>

            <ChatBubbleOutlineOutlinedIcon style={{fontSize: 30, marginRight: 15, }}  />
            Присоединяйтесь к общению.</Typography>
          </BluesideListItems>
        </BluesideList>
      </BlueSide>
      <LoginSide>
        <LoginSideWrapper>
        <TwitterIcon color='primary'  style={ {fontSize: 45}}/>
        <LoginSideTitle variant='h4'> Узнайте, что происходит в мире прямо сейчас!</LoginSideTitle>
        <Typography> <b>Присоединяйтесь прямо сейчас</b></Typography>
        <br />
        <Button onClick={()=> handleOpenModal('signUp')} style ={{marginBottom: 20}}variant="contained" color="primary" fullWidth>Зарегаться</Button> 
        <Button onClick={()=> handleOpenModal('signIn')} variant="outlined" color="primary" fullWidth>Войти</Button>

        <Modal 
          open = {modalMode === 'signIn' || modalMode === 'signUp'}
          onClose={handleCloseModal}
          title = {modalMode === 'signIn' ? 'Вход' : 'Регистрация'}
          mode={modalMode === 'signIn' || modalMode === 'signUp' ? modalMode : 'signIn'}
          />

        
        </LoginSideWrapper>
      </LoginSide>
    </Wrapper>
  );
}

