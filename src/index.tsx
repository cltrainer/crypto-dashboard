import { StrictMode } from 'react'
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// React 18
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
// root.render(
//   <StrictMode>
//     <App />
//   </React.StrictMode>
// )

// React 16
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
