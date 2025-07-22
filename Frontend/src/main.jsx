import React from 'react';
import ReactDOM from 'react-dom/client';
import Chat from './components/chat.jsx';
import './app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Chat />
    </React.StrictMode>
);
