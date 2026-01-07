import React from 'react';
import { CircularProgress, Paper, Typography, Box } from '@mui/material';

import { AddTweetForm } from '../../components/AddTweetForm';
import { Tweet } from '../../components/Tweet';
import { useHomeStyles } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTweets } from '../../store/ducks/tweets/actionCreators';
import { selectIsTweetsLoading, selectTweetsItems } from '../../store/ducks/tweets/selectors';
import { useLocation, Routes, Route } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';
import { FullTweet } from './components/FullTweet';
import { fetchTags } from '../../store/ducks/tags/actionCreators';

export const Home = (): React.ReactElement => {
  const classes = useHomeStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const tweets = useSelector(selectTweetsItems);
  const isLoading = useSelector(selectIsTweetsLoading);

  const isTweetPage = location.pathname.startsWith('/home/tweet/');
  const isHomePage = location.pathname === '/home' || location.pathname === '/home/search';

  React.useEffect(() => {
    dispatch(fetchTweets());
    dispatch(fetchTags());
  }, [dispatch]);

  // If we're on a tweet detail page, show FullTweet
  if (isTweetPage) {
    return (
      <Paper sx={classes.tweetsWrapper} variant="outlined">
        <Paper sx={classes.tweetsHeader} variant="outlined">
          <BackButton />
          <Typography variant="h6">Твит</Typography>
        </Paper>
        <FullTweet />
      </Paper>
    );
  }

  return (
    <Paper sx={classes.tweetsWrapper} variant="outlined">
      <Paper sx={classes.tweetsHeader} variant="outlined">
        {isHomePage && <Typography variant="h6">Твиты</Typography>}
        {location.pathname === '/home/tweet' && <Typography variant="h6">Твитнуть</Typography>}
      </Paper>

      {isHomePage && (
        <>
          <Paper>
            <Box sx={classes.addForm}>
              <AddTweetForm classes={classes} />
            </Box>
            <Box sx={classes.addFormBottomLine} />
          </Paper>
          {isLoading ? (
            <Box sx={classes.tweetsCentred}>
              <CircularProgress />
            </Box>
          ) : (
            tweets.map((tweet) => (
              <Tweet key={tweet._id} classes={classes} images={tweet.images} {...tweet} />
            ))
          )}
        </>
      )}
    </Paper>
  );
};
