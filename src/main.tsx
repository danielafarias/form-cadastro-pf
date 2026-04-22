import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App.tsx'
import '@mantine/core/styles.css'
import './App.css'
import { MantineProvider } from '@mantine/core'
import { appTheme } from '@/theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={appTheme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
)
