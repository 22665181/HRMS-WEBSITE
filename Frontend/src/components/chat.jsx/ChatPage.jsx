import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatList from './ChatList';
import Sidebar from './Sidebar';
import './ChatPage.css';

function ChatPage() {
    const [selectedChat, setSelectedChat] = useState('Meg Griffin');

    return (
        <div className="app-container">
            <div className="sidebar" style={{ display: 'flex' }}>
                <Sidebar />
            </div>
            <div className="chat-list">
                <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
            </div>
            <ChatWindow selectedChat={selectedChat} />
        </div>
    );
}

export default ChatPage;
