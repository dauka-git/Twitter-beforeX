import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { TagsState } from './ducks/tags/contracts/state';
import { TweetState } from './ducks/tweet/contracts/state';
import { TweetsState } from './ducks/tweets/contracts/state';
import { UserState } from './ducks/user/contracts/state';
import { UsersState } from './ducks/users/contracts/state';

import { rootReducer } from './rootReducer';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
  tweets: TweetsState;
  tags: TagsState;
  tweet: TweetState;
  user: UserState;
  users: UsersState;
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);
