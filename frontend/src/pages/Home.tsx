import React from 'react';
import {  Grid} from '@mui/material'

import {
  Paper,
  IconButton,
  Typography,
  styled,
  Container,
  Box,
  Button
} from '@mui/material';

import { SearchTextField } from './SearchTextField';

import TwitterIcon from '@mui/icons-material/Twitter';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { MiddleFeed } from '../components/MiddleFeed';
import theme from '../theme';
import { WidthFull } from '@mui/icons-material';

const AuthLayout = styled('div')({
  display: 'flex',
  height: '100vh',
  marginLeft: '-8px',
  '& .sideMenuList': {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    width: "230"
  },
  '& .sideMenuListItem': {
    display: 'flex',
  },
  '& .tweetswrapper': {
    borderRadius: 0,
    height: '100%',
    borderTop: 0,
    borderBottom: 0,
  },
  '& .sideMenuListButton': {
    padding: theme.spacing(3.2),
    width: "95%", 
    marginTop: theme.spacing(2),
  }
});

const demoPosts = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  username: `User${i + 1}`,
  lastname: `Lastname${i + 1}`,
  avatarUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
  content: `This is a sample tweet #${i + 1}`,
  time: `Just now`,
  likes: 0,
  reposts: 0,
  comments: 0,
  uploads: 0,
}));


export const Home = () => {
  return (
    <Container maxWidth={false} sx={{ p: 0 }}>
      <AuthLayout>

      <Grid
      component="div"
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr minmax(0, 900px) 1fr",
        minHeight: "100vh"
      }}
      >
        <Box sx={{ paddingLeft: '0 !important', }}>
           <ul className="sideMenuList">
              <li className="sideMenuListItem">
                <IconButton
                  aria-label="twitter"
                  color="primary"
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(29, 161, 242, 0.1)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.3s ease',
                    marginLeft: '8px',
                  }}
                >
                  <TwitterIcon fontSize="large" />
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
                <li key={index} className="sideMenuListItem">
                  <IconButton
                    aria-label={item.text.toLowerCase()}
                    color="black"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(15, 20, 25, 0.1)',
                        '& .MuiTypography-root': {
                          fontWeight: 700,
                        },
                      },
                      borderRadius: '50px',
                      padding: '12px',
                      transition: 'all 0.2s',
                      marginLeft: '8px',
                    }}
                  >
                    {item.icon}
                    <Typography
                      sx={{
                        ml: 1.5,
                        fontSize: 17,
                        fontWeight: 700,
                        display: { xs: 'none', md: 'inline' },
                      }}
                    >
                      {item.text}
                    </Typography>
                  </IconButton>
                </li>
                
              ))}

              <li className="sideMenuListItem">
                <Button className="sideMenuListButton" variant="contained" color="primary" >
                  Твитнуть
                </Button>
              </li>
            </ul>
       </Box>
        <Box> 
          <Paper className="tweetswrapper" variant="outlined" sx={{ width: '100%' }}>
              <Paper className="tweetswrapper" variant="outlined" sx={{ width: '100%' }}>
              <MiddleFeed posts={demoPosts} />

                    {/* useEffect(() => {
                      fetch('/api/posts')
                        .then(res => res.json())
                        .then(data => setPosts(data));
                      }, []); */}

              </Paper>
            </Paper>
        </Box>
        <Box sx={{
              p: 2,
              position: 'sticky',
              top: 0,
              height: '100vh',
            }}> 
          <SearchTextField
              fullWidth={false}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover': {
                    backgroundColor: '#e1e8ed',
                  },
                  '&.Mui-focused': {
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 0 2px #1d9bf0',
                  },
                },
              }}
            />
        </Box>
      </Grid>
      </AuthLayout>
    </Container>
  );
};
