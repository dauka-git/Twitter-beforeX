import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import theme from './theme'
import CssBaseline from '@mui/material/CssBaseline';

// import './index.css'

import { ThemeProvider } from '@mui/material/styles'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <App />
    </ThemeProvider>
  </StrictMode>,
)
