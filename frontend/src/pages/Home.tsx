import React from 'react'
import { Grid, Paper, IconButton, Typography, styled, Container, TextField, alpha} from '@mui/material'


import { SearchTextField } from './SearchTextField';

import TwitterIcon from '@mui/icons-material/Twitter';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import theme from '../theme';
import { BorderBottom, Height, LineStyle, Margin, Padding } from '@mui/icons-material';

const AuthLayout = styled('div')({
  display: 'flex',
  height: '100vh',
  MarginLeft: '-8px',

  '& .sideMenuList': {
    listStyle: 'none',
    Padding: 0,
    Margin: 0
  },
  '& .sideMenuListItem': {
    display: 'flex',
   
  },
  '& tweetswrapper':{
    borderRadius:0,
    Height: '100%', 
    borderTop: '0',
    BorderBottom: '0',
  }
});



export const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ p: 0 }}>
    <AuthLayout>
      <Grid container spacing={0}>
        <Grid item xs={3} sx={{ paddingLeft: '0 !important' }} >
          <ul className='sideMenuList'>
            <li className='sideMenuListItem'>
              <IconButton 
                aria-label="twitter" 
                color='primary'
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(29, 161, 242, 0.1)', 
                    transform: 'scale(1.05)', 
                  },
                  transition: 'all 0.3s ease', 
                  marginLeft: '8px',
                }}
              >
                <TwitterIcon fontSize= "large" />
              </IconButton>
            </li>
            
            {[
              { icon: <SearchOutlinedIcon />, text: 'Поиск' },
              { icon: <NotificationsNoneOutlinedIcon />, text: 'Уведомления' },
              { icon: <EmailOutlinedIcon />, text: 'Сообщения' },
              { icon: <BookmarkBorderOutlinedIcon />, text: 'Закладки' },
              { icon: <ListAltOutlinedIcon />, text: 'Список' },
              { icon: <PersonOutlinedIcon />, text: 'Профиль' },
              { icon: <PendingOutlinedIcon />, text: 'Ещё' },
            ].map((item, index) => (
              <li key={index} className='sideMenuListItem'>
                <IconButton
                  aria-label={item.text.toLowerCase()}
                  color='black'

                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(15, 20, 25, 0.1)', 
                      '& .MuiTypography-root': {
                        fontWeight: 700, // Жирный текст при hover
                      },
                    },
                    borderRadius: '50px', // Скругленные углы
                    padding: '12px', // Большая область нажатия
                    transition: 'all 0.2s',
                    marginLeft: '8px',
                  }}
                >
                  {item.icon}
                  <Typography sx={{ 
                    ml: 1.5,
                    fontSize: 17,
                    fontWeight: 700,
                  }}>
                    {item.text}
                  </Typography>
                </IconButton>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={6}>
          <Paper className='tweetswrapper' variant='outlined'>
          <Paper className='tweetswrapper' variant='outlined'>
            Главная
          </Paper>
          </Paper>
          
        </Grid>
        <Grid item xs={3} sx={{ 
            p: 2, 
            position: 'sticky',
            top: 0,
            height: '100vh'
          }}>

          <SearchTextField 
              fullWidth={false} // Important to prevent stretching
              sx={{
                
                '& .MuiOutlinedInput-root': {
                  '&:hover': {
                    backgroundColor: '#e1e8ed', // Slightly darker on hover
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff', // White when focused
                    boxShadow: '0 0 0 2px #1d9bf0', // Twitter blue border
                  },
                },
              }}
            />
        </Grid>
      </Grid>
    </AuthLayout>
    </Container>
  );
};