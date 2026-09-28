import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'
import './styles.css'

const theme = {
  token: {
    colorPrimary: '#1f3a5f',
    borderRadius: 2,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: 13,
    controlHeight: 28,
  },
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </StrictMode>,
)
