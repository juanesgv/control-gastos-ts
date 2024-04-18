import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BudgetProvdider } from './context/BudgetContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BudgetProvdider>
      <App />
    </BudgetProvdider>
  </React.StrictMode>,
)
