import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Убедимся, что стили импортированы и применяются правильно
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
)
