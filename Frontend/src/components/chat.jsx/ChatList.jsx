import React, { useState } from 'react';
import './ChatList.css';

const chatData = [
    { name: "Meg Griffin", status: "Sent you a message", time: "34m", unread: true, type: "single", favourite: true },
    { name: "The Boyz", status: "joe68: sent a message", time: "34m", unread: true, type: "group", favourite: false },
    { name: "Stewie Griffin", status: "Sent you a message", time: "17h", unread: true, type: "single", favourite: true },
    { name: "Joe Swanson", status: "Sent you a message", time: "20h", unread: false, type: "single", favourite: false },
    { name: "Glenn Quagmire", status: "The silence lmao", time: "20h", unread: false, type: "single", favourite: true },
    { name: "Herbert", status: "Active", time: "6m ago", unread: false, type: "single", favourite: false },
    { name: "Adam West", status: "Active", time: "today", unread: false, type: "single", favourite: false },
    { name: "Philip J. Fry", status: "Frozen for 1000 years", time: "20h", unread: false, type: "single", favourite: false },
    { name: "Cleveland Brown", status: "Active", time: "5h ago", unread: false, type: "single", favourite: false },
    { name: "Chris Griffin", status: "Active", time: "today", unread: false, type: "single", favourite: true }
];

function ChatList({ onSelectChat, selectedChat }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredChats = chatData.filter(chat => {
        const matchSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchFilter =
            filter === 'all' ? true :
            filter === 'groups' ? chat.type === 'group' :
            filter === 'unread' ? chat.unread :
            filter === 'read' ? !chat.unread :
            filter === 'favourites' ? chat.favourite : true;

        return matchSearch && matchFilter;
    });

    const unreadCount = chatData.filter(chat => chat.unread).length;

    return (
        <div className="chatlist">
            <div className="chatlist-header">
                <h3 className="chatlist-heading">
                    Messages
                    {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
                </h3>

                <select className="chat-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all"> 🔽 All </option>
                    <option value="groups">👥 Groups</option>
                    <option value="unread">🔵 Unread</option>
                    <option value="read">✅ Read</option>
                    <option value="favourites">⭐ Favourites</option>
                </select>
            </div>

            <input
                type="text"
                placeholder="Search chats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="chat-search"
            />

            <div className="chatlist-scroll">
                <ul className="chatlist-items">
                    {filteredChats.map((chat, index) => (
                        <li
                            className={`chatlist-item ${chat.name === selectedChat ? 'selected' : ''} ${chat.favourite ? 'favourite' : ''}`}
                            key={index}
                            onClick={() => onSelectChat(chat.name)}
                        >
                            <div className="icon">👤</div>
                            <div className="chat-info">
                                <div className="chat-name">
                                    {chat.name}
                                    {chat.favourite && <span className="favourite-star">★</span>}
                                </div>
                                <div className="chat-status">
                                    {chat.status}
                                    {chat.time && <span className="chat-time"> · {chat.time}</span>}
                                </div>
                            </div>
                            {chat.unread && <div className="dot"></div>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChatList;
