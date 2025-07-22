import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button, InputGroup, Form } from 'react-bootstrap';
import { ThreeDotsVertical, SendFill } from 'react-bootstrap-icons';
import '../styles/chat.css'; // ✅ All CSS is in chat.css, as you instructed

// ----------------------------------
// Sidebar (Marking this for later replacement as per your instructions)
// ----------------------------------
function Sidebar() {
    return (
        <div className="sidebar">
            <div className="logo-section">
                <img src="src\assets\logo.jpg" alt="Logo" className="logo" />
                <p className="brand-name">Human Resource Management System</p>
            </div>
            <div className="user-section">
                <img src="src\assets\maria.png" alt="Profile" className="profile-pic" />
                <div className="user-details">
                    <p className="user-name">Maria</p>
                    <p className="user-role">HR Manager</p>
                </div>
            </div>
            <nav className="nav-links">
                <div className="nav-item"><i className="icon">🏠</i> Dashboard</div>
                <div className="nav-item active"><i className="icon">💬</i> Chat</div>
                <div className="nav-item"><i className="icon">👥</i> Employees</div>
                <div className="nav-item"><i className="icon">👍</i> Feed</div>
                <div className="nav-item"><i className="icon">🔔</i> Recognition</div>
                <div className="nav-item"><i className="icon">📅</i> Events</div>
                <div className="nav-item"><i className="icon">👤</i> Profile</div>
                <div className="nav-item"><i className="icon">⚙️</i> Settings</div>
            </nav>
        </div>
    );
}

// ----------------------------------
// Chat List Section
// ----------------------------------
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
                <h3 className="chatlist-heading">Messages {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}</h3>
                <select className="chat-filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all"> 🔽 All </option>
                    <option value="groups">👥 Groups</option>
                    <option value="unread">🔵 Unread</option>
                    <option value="read">✅ Read</option>
                    <option value="favourites">⭐ Favourites</option>
                </select>
            </div>

            <input type="text" placeholder="Search chats..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="chat-search" />

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
                                <div className="chat-name">{chat.name}{chat.favourite && <span className="favourite-star">★</span>}</div>
                                <div className="chat-status">{chat.status}{chat.time && <span className="chat-time"> · {chat.time}</span>}</div>
                            </div>
                            {chat.unread && <div className="dot"></div>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

// ----------------------------------
// Chat Window
// ----------------------------------
const userProfiles = {
    "Meg Griffin": {
        img: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Meg Griffin",
        handle: "@mmmmeg",
        status: "Web dev, Django Guy",
        note: "Z476 is aware and is waiting for instructions..."
    },
    "The Boyz": { img: "", name: "The Boyz", handle: "", status: "Group Chat", note: "" },
    "Stewie Griffin": { img: "", name: "Stewie Griffin", handle: "", status: "Baby Genius", note: "" },
    "Joe Swanson": { img: "", name: "Joe Swanson", handle: "", status: "", note: "" },
    "Glenn Quagmire": { img: "", name: "Glenn Quagmire", handle: "", status: "", note: "" },
    "Herbert": { img: "", name: "Herbert", handle: "", status: "", note: "" },
    "Adam West": { img: "", name: "Adam West", handle: "", status: "", note: "" },
    "Philip J. Fry": { img: "", name: "Philip J. Fry", handle: "", status: "", note: "" },
    "Cleveland Brown": { img: "", name: "Cleveland Brown", handle: "", status: "", note: "" },
    "Chris Griffin": { img: "", name: "Chris Griffin", handle: "", status: "", note: "" }
};

function ChatWindow({ selectedChat }) {
    const profile = userProfiles[selectedChat] || {};
    const [messages, setMessages] = useState(selectedChat === "Meg Griffin" ? [
        { id: 1, text: "Hey Eric, have you collaborated with Fred yet?\nNot yet    Yes", sender: "other", specialReply: true, time: "10:30 AM" },
        { id: 2, text: "So... question. How long has server been unconscious?", sender: "other", time: "10:32 AM" },
        { id: 3, text: "Oh my god, Chris. The server is not working and it is showing some problem indication...", sender: "me", time: "10:34 AM" },
        { id: 4, text: "Y fear when Chris is here... I’ve taught you well. You have the right instincts...", sender: "other", time: "10:35 AM" }
    ] : []);

    useEffect(() => {
        setMessages(selectedChat === "Meg Griffin" ? [
            { id: 1, text: "Hey Eric, have you collaborated with Fred yet?\nNot yet    Yes", sender: "other", specialReply: true, time: "10:30 AM" },
            { id: 2, text: "So... question. How long has server been unconscious?", sender: "other", time: "10:32 AM" },
            { id: 3, text: "Oh my god, Chris. The server is not working and it is showing some problem indication...", sender: "me", time: "10:34 AM" },
            { id: 4, text: "Y fear when Chris is here... I’ve taught you well. You have the right instincts...", sender: "other", time: "10:35 AM" }
        ] : []);
    }, [selectedChat]);

    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const menuRef = useRef(null);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
            setContextMenu(null);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (chatBodyRef.current) chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }, [messages]);

    const handleSend = (newMessage) => {
        if (!newMessage.trim()) return;
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMsg = { id: Date.now(), text: newMessage, sender: 'me', time: formattedTime };
        setMessages([...messages, newMsg]);
    };

    const handleContextMenu = (e, sender) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const left = sender === 'me' ? rect.left - 160 : rect.right + 10;
        setContextMenu({ top: rect.top + window.scrollY, left: left + window.scrollX });
    };

    return (
        <>
            <div className="chat-window">
                <div className="chat-window-inner">
                    <div className="chat-header">
                        <div className="user-info" onClick={() => setShowProfile(true)} style={{ cursor: 'pointer' }}>
                            <img src={profile.img || "https://via.placeholder.com/48"} alt="Profile" className="user-avatar" />
                            <div>
                                <div className="user-name">{profile.name}</div>
                                <div className="user-status">{profile.status}</div>
                                <div className="user-note">{profile.note}</div>
                            </div>
                        </div>
                        <div ref={menuRef} className="dots-wrapper">
                            <ThreeDotsVertical className="three-dots" onClick={() => setShowMenu(!showMenu)} />
                            {showMenu && (
                                <div className="dropdown-float">
                                    <button className="dropdown-btn">Delete</button>
                                    <button className="dropdown-btn">Mute</button>
                                    <button className="dropdown-btn">Block</button>
                                    <button className="dropdown-btn">Report</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="chat-body" ref={chatBodyRef}>
                        {messages.map((msg) => (
                            <Message key={msg.id} text={msg.text} sender={msg.sender} specialReply={msg.specialReply} time={msg.time} onContextMenu={handleContextMenu} />
                        ))}
                    </div>

                    <InputBox onSend={handleSend} />
                </div>
            </div>

            {contextMenu && (
                <ul className="context-menu" style={{ top: `${contextMenu.top}px`, left: `${contextMenu.left}px`, position: 'absolute' }}>
                    <li>Reply</li>
                    <li>Copy</li>
                    <li>Forward</li>
                    <li>Select</li>
                    <li>Delete</li>
                    <li>Pin</li>
                </ul>
            )}

            <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
                <Modal.Header closeButton><Modal.Title>User Profile</Modal.Title></Modal.Header>
                <Modal.Body className="text-center">
                    <img src={profile.img || "https://via.placeholder.com/100"} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem' }} />
                    <h5>{profile.name}</h5>
                    <p>{profile.handle}</p>
                    <p>{profile.status}</p>
                    <p>Status: {profile.note}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowProfile(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

// ----------------------------------
// Message Component
// ----------------------------------
function Message({ text, sender, specialReply, onContextMenu, time }) {
    const lines = text.split('\n');
    return (
        <div className={`message ${sender === 'me' ? 'sent' : 'received'}`} onContextMenu={(e) => onContextMenu(e, sender)}>
            <div className={`bubble ${sender === 'me' ? 'gray' : 'purple'}`}>
                <div>{lines[0]}</div>
                {specialReply && <div className="reply-options">Not yet &nbsp;&nbsp; Yes</div>}
            </div>
            <div className="timestamp">{time}</div>
        </div>
    );
}

// ----------------------------------
// Input Box Component
// ----------------------------------
function InputBox({ onSend }) {
    const [inputValue, setInputValue] = useState('');
    const handleSendClick = () => {
        onSend(inputValue);
        setInputValue('');
    };
    return (
        <div className="chat-footer">
            <InputGroup>
                <Form.Control placeholder="What would you like to say?" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendClick()} />
                <Button variant="primary" className="send-button" onClick={handleSendClick}><SendFill /></Button>
            </InputGroup>
        </div>
    );
}

// ----------------------------------
// Root Chat Component
// ----------------------------------
function Chat() {
    const [selectedChat, setSelectedChat] = useState('Meg Griffin');
    return (
        <div className="app-container">
            <Sidebar />
            <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
            <ChatWindow selectedChat={selectedChat} />
        </div>
    );
}

export default Chat;

