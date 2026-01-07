import React from 'react';
import { Avatar, CircularProgress, Paper, Typography, Divider, IconButton, Box } from '@mui/material';
import mediumZoom from 'medium-zoom';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepostIcon from '@mui/icons-material/RepeatOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/ReplyOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import ruLang from 'date-fns/locale/ru';
import { fetchTweetData, setTweetData } from '../../../store/ducks/tweet/actionCreators';
import { selectIsTweetLoading, selectTweetData } from '../../../store/ducks/tweet/selectors';
import { useHomeStyles } from '../../theme';
import { Tweet } from '../../../components/Tweet';
import { ImageList } from '../../../components/ImageList';

export const FullTweet: React.FC = (): React.ReactElement | null => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const tweetData = useSelector(selectTweetData);
  const isLoading = useSelector(selectIsTweetLoading);
  const params: { id?: string } = useParams();
  const id = params.id;

  React.useEffect(() => {
    if (id) {
      dispatch(fetchTweetData(id));
    }

    return () => {
      dispatch(setTweetData(undefined));
    };
  }, [dispatch, id]);

  React.useEffect(() => {
    if (!isLoading) {
      mediumZoom('.tweet-images img');
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <Box sx={classes.tweetsCentred}>
        <CircularProgress />
      </Box>
    );
  }

  if (tweetData) {
    return (
      <>
        <Paper sx={classes.fullTweet}>
          <Box sx={classes.tweetsHeaderUser}>
            <Avatar
              sx={classes.tweetAvatar}
              alt={`Аватарка пользователя ${tweetData.user.fullname}`}
            />
            <Typography>
              <Link to={`/user/${tweetData.user._id}`}>
                <b>{tweetData.user.fullname}</b>&nbsp;
              </Link>
              <Box>
                <Typography component="span" sx={classes.tweetUserName}>@{tweetData.user.username}</Typography>&nbsp;
              </Box>
            </Typography>
          </Box>
          <Typography sx={classes.fullTweetText} gutterBottom>
            {tweetData.text}
            <Box className="tweet-images">
              {tweetData.images && <ImageList classes={classes} images={tweetData.images} />}
            </Box>
          </Typography>
          <Typography>
            <Typography component="span" sx={classes.tweetUserName}>
              {format(new Date(tweetData.createdAt), 'H:mm', { locale: ruLang })} ·{' '}
            </Typography>
            <Typography component="span" sx={classes.tweetUserName}>
              {format(new Date(tweetData.createdAt), 'dd MMM. yyyy г.', { locale: ruLang })}
            </Typography>
          </Typography>
          <Box sx={{ ...classes.tweetFooter, ...classes.fullTweetFooter }}>
            <IconButton>
              <CommentIcon style={{ fontSize: 25 }} />
            </IconButton>
            <IconButton>
              <RepostIcon style={{ fontSize: 25 }} />
            </IconButton>
            <IconButton>
              <LikeIcon style={{ fontSize: 25 }} />
            </IconButton>
            <IconButton>
              <ShareIcon style={{ fontSize: 25 }} />
            </IconButton>
          </Box>
        </Paper>
        <Divider />
        <Tweet
          _id="1"
          text="Any more to move? You might need to adjust your stretching routines!"
          createdAt={new Date().toString()}
          user={{
            fullname: 'Arlene Andrews',
            username: 'ArleneAndrews_1',
          }}
          classes={classes}
        />
        <Tweet
          _id="1"
          text="Any more to move? You might need to adjust your stretching routines!"
          createdAt={new Date().toString()}
          user={{
            fullname: 'Arlene Andrews',
            username: 'ArleneAndrews_1',
          }}
          classes={classes}
        />
        <Tweet
          _id="1"
          text="Any more to move? You might need to adjust your stretching routines!"
          createdAt={new Date().toString()}
          user={{
            fullname: 'Arlene Andrews',
            username: 'ArleneAndrews_1',
          }}
          classes={classes}
        />
      </>
    );
  }

  return null;
};
