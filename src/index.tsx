import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import './index.css';

import App from './App';
import theme from './theme';
import { store } from './store/store';

// TODO:
// 2. Сделать редюсер для "Кого читать"
// 3. Сделать получение информации о пользователе (простой объект. имитация авторизации)
// 4. Попытаться сделать поиск и просмотро актуальных тем из БД
// 5. Сделать linkify для твита и <br /> при переходе на новую строчку
// 6. Поправить открытие меню для твитов (происходит переходи в твит, которого не должно быть)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
