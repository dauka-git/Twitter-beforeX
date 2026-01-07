import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import SearchIcon from '@mui/icons-material/Search';
import NotificationIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MessageIcon from '@mui/icons-material/EmailOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ListIcon from '@mui/icons-material/ListAltOutlined';
import HomeIcon from '@mui/icons-material/HomeOutlined';
import UserIcon from '@mui/icons-material/PermIdentityOutlined';
import CreateIcon from '@mui/icons-material/Create';
import { Box, Button, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useHomeStyles } from '../pages/theme';
import { ModalBlock } from './ModalBlock';
import { AddTweetForm } from './AddTweetForm';
import { Link } from 'react-router-dom';
import { UserSideProfile } from './UserSideProfile';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/ducks/user/selectors';

interface SideMenuProps {
  classes: ReturnType<typeof useHomeStyles>;
}

export const SideMenu: React.FC<SideMenuProps> = ({
  classes,
}: SideMenuProps): React.ReactElement => {
  const [visibleAddTweet, setSetVisibleAddTweet] = React.useState<boolean>(false);
  const userData = useSelector(selectUserData);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleClickOpenAddTweet = () => {
    setSetVisibleAddTweet(true);
  };

  const onCloseAddTweet = () => {
    setSetVisibleAddTweet(false);
  };

  return (
    <>
      <Box component="ul" sx={classes.sideMenuList}>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Link to="/home">
            <IconButton sx={classes.logo} aria-label="" color="primary">
              <TwitterIcon sx={classes.logoIcon} />
            </IconButton>
          </Link>
        </Box>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Link to="/home">
            <Box>
              <HomeIcon sx={classes.sideMenuListItemIcon} />
              {!smDown && (
                <Typography sx={classes.sideMenuListItemLabel} variant="h6">
                  Главная
                </Typography>
              )}
            </Box>
          </Link>
        </Box>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Box>
            <SearchIcon sx={classes.sideMenuListItemIcon} />
            {!smDown && (
              <Typography sx={classes.sideMenuListItemLabel} variant="h6">
                Поиск
              </Typography>
            )}
          </Box>
        </Box>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Box>
            <NotificationIcon sx={classes.sideMenuListItemIcon} />
            {!smDown && (
              <Typography sx={classes.sideMenuListItemLabel} variant="h6">
                Уведомления
              </Typography>
            )}
          </Box>
        </Box>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Box>
            <MessageIcon sx={classes.sideMenuListItemIcon} />

            {!smDown && (
              <Typography sx={classes.sideMenuListItemLabel} variant="h6">
                Сообщения
              </Typography>
            )}
          </Box>
        </Box>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Box>
            <BookmarkIcon sx={classes.sideMenuListItemIcon} />

            {!smDown && (
              <Typography sx={classes.sideMenuListItemLabel} variant="h6">
                Закладки
              </Typography>
            )}
          </Box>
        </Box>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Box>
            <ListIcon sx={classes.sideMenuListItemIcon} />

            {!smDown && (
              <Typography sx={classes.sideMenuListItemLabel} variant="h6">
                Список
              </Typography>
            )}
          </Box>
        </Box>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Link to={`/user/${userData?._id}`}>
            <Box>
              <UserIcon sx={classes.sideMenuListItemIcon} />

              {!smDown && (
                <Typography sx={classes.sideMenuListItemLabel} variant="h6">
                  Профиль
                </Typography>
              )}
            </Box>
          </Link>
        </Box>
        <Box component="li" sx={classes.sideMenuListItem}>
          <Button
            onClick={handleClickOpenAddTweet}
            sx={classes.sideMenuTweetButton}
            variant="contained"
            color="primary"
            fullWidth>
            {!smDown && 'Твитнуть'}
            {smDown && (
              <CreateIcon />
            )}
          </Button>
          <ModalBlock onClose={onCloseAddTweet} visible={visibleAddTweet}>
            <Box style={{ width: 550 }}>
              <AddTweetForm maxRows={15} classes={classes} />
            </Box>
          </ModalBlock>
        </Box>
      </Box>
      <UserSideProfile classes={classes} />
    </>
  );
};
