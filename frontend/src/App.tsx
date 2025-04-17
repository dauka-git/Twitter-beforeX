import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {SignIn} from './pages/SignIn';
import { Home } from './pages/Home';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';


function App() {

  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
