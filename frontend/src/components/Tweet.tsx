import React from 'react';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepostIcon from '@mui/icons-material/RepeatOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/ReplyOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Avatar, IconButton, Menu, MenuItem, Paper, Typography, Box } from '@mui/material';
import { useHomeStyles } from '../pages/theme';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { ImageList } from './ImageList';
import { removeTweet } from '../store/ducks/tweets/actionCreators';
import { useDispatch } from 'react-redux';
import { User } from '../store/ducks/user/contracts/state';

interface TweetProps {
  _id: string;
  text: string;
  classes: ReturnType<typeof useHomeStyles>;
  createdAt: string;
  images?: string[];
  user: Pick<User, '_id' | 'fullname' | 'username'>;
}

export const Tweet: React.FC<TweetProps> = ({
  _id,
  text,
  user,
  classes,
  images,
  createdAt,
}: TweetProps): React.ReactElement => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClickTweet = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    navigate(`/home/tweet/${_id}`);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(null);
  };

  const handleRemove = (event: React.MouseEvent<HTMLElement>): void => {
    handleClose(event);
    if (window.confirm('Вы действительно хотите удалить твит?')) {
      dispatch(removeTweet(_id));
    }
  };

  return (
    <Box component="a" onClick={handleClickTweet} sx={classes.tweetWrapper} href={`/home/tweet/${_id}`}>
      <Paper sx={{ ...classes.tweet, ...classes.tweetsHeader }} variant="outlined">
        <Avatar sx={classes.tweetAvatar} alt={`Аватарка пользователя ${user.fullname}`} />
        <Box sx={classes.tweetContent}>
          <Box sx={classes.tweetHeader}>
            <Box>
              <b>{user.fullname}</b>&nbsp;
              <Typography component="span" sx={classes.tweetUserName}>@{user.username}</Typography>&nbsp;
              <Typography component="span" sx={classes.tweetUserName}>·</Typography>&nbsp;
              <Typography component="span" sx={classes.tweetUserName}>{formatDate(new Date(createdAt))}</Typography>
            </Box>
            <Box>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                <MenuItem onClick={handleRemove}>Удалить твит</MenuItem>
              </Menu>
            </Box>
          </Box>
          <Typography variant="body1" gutterBottom>
            {text}
            {images && <ImageList classes={classes} images={images} />}
          </Typography>
          <Box sx={classes.tweetFooter}>
            <Box>
              <IconButton>
                <CommentIcon style={{ fontSize: 20 }} />
              </IconButton>
              <span>1</span>
            </Box>
            <Box>
              <IconButton>
                <RepostIcon style={{ fontSize: 20 }} />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <LikeIcon style={{ fontSize: 20 }} />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <ShareIcon style={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
