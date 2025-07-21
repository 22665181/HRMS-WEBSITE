import React, { useState, useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ThreeDotsVertical } from 'react-bootstrap-icons';
import Message from './Message';
import InputBox from './InputBox';
import './ChatPage.css';

const userProfiles = {
    "Meg Griffin": {
        img: "https://randomuser.me/api/portraits/women/1.jpg",
        name: "Meg Griffin",
        handle: "@mmmmeg",
        status: "Web dev, Django Guy",
        note: "Z476 is aware and is waiting for instructions..."
    },
    "The Boyz": {
        img: "", name: "The Boyz", handle: "", status: "Group Chat", note: ""
    },
    "Stewie Griffin": {
        img: "", name: "Stewie Griffin", handle: "", status: "Baby Genius", note: ""
    },
    "Joe Swanson": { img: "", name: "Joe Swanson", handle: "", status: "", note: "" },
    "Glenn Quagmire": { img: "", name: "Glenn Quagmire", handle: "", status: "", note: "" },
    "Herbert": { img: "", name: "Herbert", handle: "", status: "", note: "" },
    "Adam West": { img: "", name: "Adam West", handle: "", status: "", note: "" },
    "Philip J. Fry": { img: "", name: "Philip J. Fry", handle: "", status: "", note: "" },
    "Cleveland Brown": { img: "", name: "Cleveland Brown", handle: "", status: "", note: "" },
    "Chris Griffin": { img: "", name: "Chris Griffin", handle: "", status: "", note: "" }
};

const ChatWindow = ({ selectedChat }) => {
    const profile = userProfiles[selectedChat] || {};
    const [messages, setMessages] = useState(
        selectedChat === "Meg Griffin" ? [
            {
                id: 1,
                text: "Hey Eric, have you collaborated with Fred yet?\nNot yet    Yes",
                sender: "other",
                specialReply: true,
                time: "10:30 AM",
            },
            {
                id: 2,
                text: "So... question. How long has server been unconscious?",
                sender: "other",
                time: "10:32 AM",
            },
            {
                id: 3,
                text: "Oh my god, Chris. The server is not working and it is showing some problem indication...",
                sender: "me",
                time: "10:34 AM",
            },
            {
                id: 4,
                text: "Y fear when Chris is here... I’ve taught you well. You have the right instincts...",
                sender: "other",
                time: "10:35 AM",
            },
        ] : []
    );

    useEffect(() => {
        if (selectedChat !== "Meg Griffin") {
            setMessages([]);
        } else {
            setMessages([
                {
                    id: 1,
                    text: "Hey Eric, have you collaborated with Fred yet?\nNot yet    Yes",
                    sender: "other",
                    specialReply: true,
                    time: "10:30 AM",
                },
                {
                    id: 2,
                    text: "So... question. How long has server been unconscious?",
                    sender: "other",
                    time: "10:32 AM",
                },
                {
                    id: 3,
                    text: "Oh my god, Chris. The server is not working and it is showing some problem indication...",
                    sender: "me",
                    time: "10:34 AM",
                },
                {
                    id: 4,
                    text: "Y fear when Chris is here... I’ve taught you well. You have the right instincts...",
                    sender: "other",
                    time: "10:35 AM",
                },
            ]);
        }
    }, [selectedChat]);

    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const menuRef = useRef(null);
    const chatBodyRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
            setContextMenu(null);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = (newMessage) => {
        if (!newMessage.trim()) return;
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
        const newMsg = {
            id: Date.now(),
            text: newMessage,
            sender: 'me',
            time: formattedTime,
        };
        setMessages([...messages, newMsg]);
    };

    const handleContextMenu = (e, sender) => {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const left = sender === 'me' ? rect.left - 160 : rect.right + 10;
        setContextMenu({
            top: rect.top + window.scrollY,
            left: left + window.scrollX,
        });
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
                            <Message
                                key={msg.id}
                                text={msg.text}
                                sender={msg.sender}
                                specialReply={msg.specialReply}
                                time={msg.time}
                                onContextMenu={handleContextMenu}
                            />
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
                <Modal.Header closeButton>
                    <Modal.Title>User Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <img
                        src={profile.img || "https://via.placeholder.com/100"}
                        alt="Profile"
                        style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem' }}
                    />
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
};

export default ChatWindow;
