import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { ThreeDotsVertical, SendFill } from "react-bootstrap-icons";
import Picker from "@emoji-mart/react";
import emojiData from "@emoji-mart/data";

const styles = `
* {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    box-sizing: border-box;
}

html, body {
    margin: 0;
    padding: 0;
    overflow: hidden; 
    height: 100%;
}

/* ---------------------------------------
Chat Layout & ChatList
---------------------------------------- */
.app-container {
    display: flex;
    height: 100vh;
    width: 100%;          
    overflow: hidden;
}

.chatlist {
    padding: 20px 20px;
    width: 500px;
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    box-sizing: border-box;
    overflow: auto;    
}

.chatlist-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.chatlist-heading {
    font-size: 1.4rem;
    font-weight: bold;
}

.chatlist-items {
    list-style: none;
    padding: 0;
    margin: 0;
}

.chat-filter {
    padding: 6px 10px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
}

.chatlist-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
}

.chatlist-item:hover {
    background-color: #f0f0f0;
}

.icon {
    font-size: 1.8rem;
    margin-right: 12px;
}

.chat-info {
    flex: 1;
}

.chat-name {
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
}

.chat-status {
    font-size: 0.9rem;
    color: gray;
}

.chat-time {
    margin-left: 6px;
}

.dot {
    width: 10px;
    height: 10px;
    background-color: #0f88f2;
    border-radius: 50%;
    position: absolute;
    right: 12px;
}
/* ---- WhatsApp-like inline edit textarea ---- */
.edit-textarea {
  border: none;               /* Remove border */
  background: transparent;    /* Keep same bubble background */
  color: inherit;              /* Inherit text color from bubble */
  font-size: 0.95rem;          /* Match normal message font size */
  width: 100%;                 /* Full width inside bubble */
  outline: none;               /* Remove focus outline */
  resize: none;                /* Disable manual resize */
  overflow: hidden;            /* For auto height */
  padding: 0;
  margin: 0;
  line-height: 1.4;
}

/* Add subtle highlight in editing mode */
.message.editing .bubble {
  box-shadow: 0 0 0 2px rgba(92,76,225,0.06);
}

.unread-badge {
    background-color: #28a745;
    color: white;
    border-radius: 12px;
    padding: 0 8px;
    font-size: 0.75rem;
    font-weight: bold;
    margin-left: 8px;
    display: inline-block;
    min-width: 20px;
    text-align: center;
    line-height: 1.5;
}

.chat-search {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 0.9rem;
    background-color: #fff;
    border-color: #ddd;
}

.chatlist-scroll {
    flex: 1;
    overflow-y: auto;
    margin-top: 1rem;
    padding-right: 6px;
}

.chatlist-scroll::-webkit-scrollbar {
    width: 5px;
}

.chatlist-scroll::-webkit-scrollbar-thumb {
    background-color: hsl(0, 0%, 90%);
    border-radius: 5px;
}

.chatlist-item.selected {
    background-color: #e6f0ff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.chatlist-item.selected .icon {
    transform: scale(1.05);
}

.chatlist-item.selected .chat-info {
    font-weight: 500;
}

.favourite-star {
    font-size: 1.1em;
    color: #ffae00;
    vertical-align: middle;
}

.chatlist-item:hover .favourite-star {
    opacity: 0.85;
}

/* ---------------------------------------
Chat Window & Messages
---------------------------------------- */
.chat-window {
    margin-left: 0px;
    width: 790px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-left: 1px solid #ddd;
    height: 100vh;
    border-right: 5px solid #ddd;
    padding-bottom: 20px;
}

.chat-window-inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
}

.chat-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
background: #4C57C1; /* HRMS Sidebar Blue */
  color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}


.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
}

.user-name {
    font-weight: 600;
    font-size: 1rem;
}

.user-status {
  color: #dcdcdc;
  font-weight: 500;
}

.user-note {
  color: #c0c0c0;
  font-size: 13px;
  margin-top: 4px;
}


.three-dots {
    font-size: 1.4rem;
    cursor: pointer;
    color: white;
    margin-top:10px;
}

.chat-body {
    flex-grow: 1;
    padding: 1rem 2rem;
    overflow-y: auto;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    /* ✅ Hide scrollbar but keep scroll working */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
}

.chat-body::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
}


.message {
    display: flex;
    flex-direction: column;
    max-width: 65%;
}

.message.sent {
    align-self: flex-end;
}

.message.received {
    align-self: flex-start;
}

.bubble {
    padding: 12px 16px;
    border-radius: 12px;
    word-break: break-word;
    font-size: 0.95rem;
    line-height: 1.4;
}

.bubble.purple {
    background-color: #4C57C1;
    color: white;
}

.bubble.gray {
    background-color: #f1f1f1;
    color: #333;
    border: 1px solid #ddd;
}

.reply-options {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 0.5rem;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
}

.timestamp {
    font-size: 0.75rem;
    color: #999;
    margin-top: 4px;
    text-align: left;
}

.message.sent .timestamp {
    text-align: right;
}

.chat-footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    background-color: white;
}

.send-button {
    background-color: #5c4ce1 !important;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ---------------------------------------
Three Dots Dropdown
---------------------------------------- */
/* Dropdown correctly positioned below the 3 dots */
.dots-wrapper {
    position: relative; /* ✅ parent reference */
    display: inline-block;
}

.dropdown-float {
    position: absolute;
    top: calc(100% + 6px); /* ✅ just below button with small gap */
    left: calc(50% + 47px); /* ✅ 38px ≈ 1 cm shift right */
    transform: translateX(-50%);
    background-color: #303031ff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-radius: 6px;
    z-index: 100;
}

.dropdown-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    background-color: #f8f8f8;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
}

.dropdown-btn:hover {
    background-color: #eaeaea;
}

/* ---------------------------------------
Right Click Context Menu
---------------------------------------- */
.context-menu {
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0.5rem 0;
    margin: 0;
    z-index: 2000;
    width: 150px;
    border-radius: 4px;
    position: absolute;
}

.context-menu li {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    user-select: none;
}

.context-menu li:hover {
    background-color: #f5f5f5;
}

/* ---------------------------------------
Responsiveness
---------------------------------------- */
@media (max-width: 1024px) {
    // .sidebar {
    //     display: none;
    // }
    .chatlist {
        width: 40%;
    }
    .chat-window {
        width: 60%;
    }
}

@media (max-width: 768px) {
    // .sidebar,
    .chatlist {
        display: none;
    }
    .chat-window {
        width: 100%;
        height: 100vh;
        margin: 0;
    }
}
/*input box*/
.chat-footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-group {
    width: 100%;   /* ⬅️ Increase width here */
    display: flex;
    max-width: 800px; /* Optional limit for desktop */
}

.input-group .form-control {
    flex: 1; /* Let input expand fully */
    border-radius: 20px 0 0 20px;
    border: 1px solid #ccc;
    padding: 10px 15px;
}

.input-group .btn {
    border-radius: 0 20px 20px 0;
    background-color: #5c4ce1;
    color: white;
    padding: 0 25px; /* Make button wider */
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}
.input-group .btn:hover {
    background-color: #4b3cd1;
}
`;

// ----------------------------------
// Sidebar (Marking this for later replacement)
// ----------------------------------
// function Sidebar() {
//   return <div className="sidebar"></div>;
// } // do not touch this it stops running

// ----------------------------------
// Chat List Section
// ----------------------------------
const chatData = [
  {
    name: "Meg Griffin",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    status: "Sent you a message",
    time: "34m",
    unread: true,
    type: "single",
    favourite: true,
    archived: false,
    isOnline: true,
    pinned: true,
    locked: false,
    password: "",
  },
  {
    name: "The Boyz",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    status: "joe68: sent a message",
    time: "34m",
    unread: true,
    type: "group",
    favourite: false,
    archived: false,
    isOnline: false,
    pinned: false,
    locked: false,
    password: "",
  },
  {
    name: "Stewie Griffin",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    status: "Sent you a message",
    time: "17h",
    unread: true,
    type: "single",
    favourite: true,
    archived: false,
    isOnline: true,
    pinned: false,
    locked: false,
    password: "",
  },
  {
    name: "Joe Swanson",
    img: "https://randomuser.me/api/portraits/men/4.jpg",
    status: "Sent you a message",
    time: "20h",
    unread: false,
    type: "single",
    favourite: false,
    archived: true,
    isOnline: false,
    pinned: false,
    locked: false,
    password: "",
  },
  {
    name: "Glenn Quagmire",
    img: "https://randomuser.me/api/portraits/men/5.jpg",
    status: "The silence lmao",
    time: "20h",
    unread: false,
    type: "single",
    favourite: true,
    archived: false,
    isOnline: false,
    pinned: false,
    locked: false,
    password: "",
  },
  {
    name: "Herbert",
    img: "https://randomuser.me/api/portraits/men/6.jpg",
    status: "Active",
    time: "6m ago",
    unread: false,
    type: "single",
    favourite: false,
    archived: false,
    isOnline: true,
    pinned: false,
    locked: false,
    password: "",
  },
  {
    name: "Adam West",
    img: "https://randomuser.me/api/portraits/men/7.jpg",
    status: "Active",
    time: "today",
    unread: false,
    type: "single",
    favourite: false,
    archived: false,
    isOnline: false,
    pinned: false,
    locked: false,
    password: "",
  },
  {
    name: "Philip J. Fry",
    img: "https://randomuser.me/api/portraits/men/8.jpg",
    status: "Frozen for 1000 years",
    time: "20h",
    unread: false,
    type: "single",
    favourite: false,
    archived: true,
    isOnline: false,
    pinned: false,
    locked: false,
    password: "",
  },
  {
    name: "Cleveland Brown",
    img: "https://randomuser.me/api/portraits/men/9.jpg",
    status: "Active",
    time: "5h ago",
    unread: false,
    type: "single",
    favourite: false,
    archived: false,
    isOnline: true,
    pinned: false,
    locked: false,
    password: "",
  },
  {
    name: "Chris Griffin",
    img: "https://randomuser.me/api/portraits/men/10.jpg",
    status: "Active",
    time: "today",
    unread: false,
    type: "single",
    favourite: true,
    archived: false,
    isOnline: true,
    pinned: false,
    locked: false,
    password: "",
  },
];

function ChatList({ onSelectChat, selectedChat }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [chats, setChats] = useState(chatData);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    chatName: null,
  });
  // Unlock chat modal state
  const [unlockModal, setUnlockModal] = useState({ show: false, chatName: "" });
  const [unlockPassword, setUnlockPassword] = useState("");

  // ✅ Pin function
  const togglePin = (chatName) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.name === chatName ? { ...chat, pinned: !chat.pinned } : chat
      )
    );
  };

  // ✅ Archive function
  const archiveChat = (chatName) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.name === chatName ? { ...chat, archived: true } : chat
      )
    );
  };

  // ✅ Lock/Unlock Chat using the same modal
  const toggleLock = (chatName) => {
    const target = chats.find((c) => c.name === chatName);

    if (!target) return;

    if (!target.locked) {
      // Locking → ask for new password via modal
      setUnlockPassword(""); // clear old password
      setUnlockModal({ show: true, chatName }); // open modal
    } else {
      // Unlocking → ask for password via modal
      setUnlockPassword("");
      setUnlockModal({ show: true, chatName });
    }
  };

  // ✅ Delete function
  const deleteChat = (chatName) => {
    setChats((prevChats) => prevChats.filter((chat) => chat.name !== chatName));
  };

  const filteredChats = chats
    .filter((chat) => (filter === "archived" ? chat.archived : !chat.archived))
    .filter((chat) => {
      const matchSearch = chat.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchFilter =
        filter === "all"
          ? true
          : filter === "groups"
          ? chat.type === "group"
          : filter === "unread"
          ? chat.unread
          : filter === "read"
          ? !chat.unread
          : filter === "favourites"
          ? chat.favourite
          : filter === "archived"
          ? chat.archived
          : true;
      return matchSearch && matchFilter;
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".context-menu")) {
        setContextMenu((prev) => ({ ...prev, visible: false }));
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="chatlist">
      <div className="chatlist-header">
        <h3 className="chatlist-heading">Messages</h3>
        <select
          className="chat-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">🔽 All</option>
          <option value="groups">👥 Groups</option>
          <option value="unread">🔵 Unread</option>
          <option value="read">✅ Read</option>
          <option value="favourites">⭐ Favourites</option>
          <option value="archived">📁 Archived</option>
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
              className={`chatlist-item ${
                chat.name === selectedChat ? "selected" : ""
              } ${chat.favourite ? "favourite" : ""}`}
              key={index}
              onClick={() => {
                const target = chats.find((c) => c.name === chat.name);
                if (target && target.locked) {
                  setUnlockPassword("");
                  setUnlockModal({ show: true, chatName: chat.name });
                } else {
                  onSelectChat(chat.name);
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({
                  visible: true,
                  x: e.clientX,
                  y: e.clientY,
                  chatName: chat.name,
                });
              }}
            >
              <img
                src={chat.img || "https://via.placeholder.com/40"}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "12px",
                  objectFit: "cover",
                }}
              />

              <div className="chat-info">
                <div className="chat-name">
                  {chat.name}
                  {chat.favourite && <span className="favourite-star">★</span>}
                  {chat.pinned && <span style={{ marginLeft: "6px" }}>📌</span>}
                  {chat.locked && (
                    <span style={{ marginLeft: "6px" }}>🔒</span>
                  )}{" "}
                  {/* ✅ Lock Icon */}
                </div>

                <div className="chat-status">
                  {chat.status}
                  {chat.time && (
                    <span className="chat-time"> · {chat.time}</span>
                  )}
                </div>
              </div>

              {chat.unread && <div className="dot"></div>}
            </li>
          ))}
        </ul>

        {contextMenu.visible && (
          <ul
            className="context-menu"
            style={{
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
              position: "fixed", // ✅ FIXED position
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
              padding: "0",
              listStyle: "none",
              width: "150px",
              zIndex: 9999, // ✅ Make sure it’s on top
            }}
          >
            <li
              onClick={() => {
                togglePin(contextMenu.chatName);
                setContextMenu({ ...contextMenu, visible: false });
              }}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              {chats.find((chat) => chat.name === contextMenu.chatName)?.pinned
                ? "Unpin Chat"
                : "Pin Chat"}
            </li>
            <li
              onClick={() => {
                archiveChat(contextMenu.chatName);
                setContextMenu({ ...contextMenu, visible: false });
              }}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              Archive Chat
            </li>

            <li
              onClick={() => {
                toggleLock(contextMenu.chatName);
                setContextMenu({ ...contextMenu, visible: false });
              }}
              style={{ padding: "10px", cursor: "pointer" }}
            >
              {chats.find((chat) => chat.name === contextMenu.chatName)?.locked
                ? "Unlock Chat"
                : "Lock Chat"}
            </li>

            <li
              onClick={() => {
                deleteChat(contextMenu.chatName);
                setContextMenu({ ...contextMenu, visible: false });
              }}
              style={{ padding: "10px", cursor: "pointer", color: "red" }}
            >
              Delete Chat
            </li>
          </ul>
        )}
        {/* 🔓 Unlock Chat Modal */}
        <Modal
          show={unlockModal.show}
          onHide={() => setUnlockModal({ show: false, chatName: "" })}
          centered
          size="sm"
          dialogClassName="custom-lock-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Enter Password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Control
              type="password"
              placeholder="Enter chat password"
              value={unlockPassword}
              onChange={(e) => setUnlockPassword(e.target.value)} // Update state on typing
            />
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              style={{ minWidth: "80px" }}
              onClick={() => setUnlockModal({ show: false, chatName: "" })}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              style={{ minWidth: "80px" }}
              onClick={() => {
                const target = chats.find(
                  (c) => c.name === unlockModal.chatName
                );

                if (!target.locked) {
                  // 🔒 Lock logic
                  if (!unlockPassword.trim()) {
                    alert("Please enter a password to lock the chat");
                    return;
                  }
                  setChats((prev) =>
                    prev.map((chat) =>
                      chat.name === unlockModal.chatName
                        ? { ...chat, locked: true, password: unlockPassword }
                        : chat
                    )
                  );
                  setUnlockModal({ show: false, chatName: "" });
                  setUnlockPassword("");
                } else {
                  // 🔓 Unlock logic
                  if (unlockPassword === target.password) {
                    setChats((prev) =>
                      prev.map((chat) =>
                        chat.name === unlockModal.chatName
                          ? { ...chat, locked: false, password: "" }
                          : chat
                      )
                    );
                    onSelectChat(unlockModal.chatName);
                    setUnlockModal({ show: false, chatName: "" });
                    setUnlockPassword("");
                  } else {
                    alert("Incorrect password");
                  }
                }
              }}
            >
              {chats.find((c) => c.name === unlockModal.chatName)?.locked
                ? "Unlock"
                : "Lock"}
            </Button>
          </Modal.Footer>
        </Modal>
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
    note: "Z476 is aware and is waiting for instructions...",
  },
  "The Boyz": {
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "The Boyz",
    handle: "@boyz",
    status: "Group Chat",
    note: "Group for chill vibes",
  },
  "Stewie Griffin": {
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Stewie Griffin",
    handle: "@stewie",
    status: "Baby Genius",
    note: "World domination plans pending",
  },
  "Joe Swanson": {
    img: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Joe Swanson",
    handle: "@joe",
    status: "Police Officer",
    note: "Always ready for duty",
  },
  "Glenn Quagmire": {
    img: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Glenn Quagmire",
    handle: "@giggity",
    status: "Pilot",
    note: "Giggity giggity goo",
  },
  Herbert: {
    img: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Herbert",
    handle: "@herb",
    status: "Retired",
    note: "Old but gold",
  },
  "Adam West": {
    img: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Adam West",
    handle: "@mayorwest",
    status: "Mayor",
    note: "Eccentric leadership",
  },
  "Philip J. Fry": {
    img: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Philip J. Fry",
    handle: "@fry",
    status: "Delivery Boy",
    note: "Frozen for 1000 years",
  },
  "Cleveland Brown": {
    img: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Cleveland Brown",
    handle: "@cleve",
    status: "Chill guy",
    note: "Moved to Stoolbend",
  },
  "Chris Griffin": {
    img: "https://randomuser.me/api/portraits/men/10.jpg",
    name: "Chris Griffin",
    handle: "@chrissy",
    status: "Student",
    note: "Learning about life",
  },
};

function ChatWindow({ selectedChat }) {
  const profile = userProfiles[selectedChat] || {};
  const [messages, setMessages] = useState(
    selectedChat === "Meg Griffin"
      ? [
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
        ]
      : []
  );

  useEffect(() => {
    setMessages(
      selectedChat === "Meg Griffin"
        ? [
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
          ]
        : []
    );
  }, [selectedChat]);

  const [showMenu, setShowMenu] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  // Close context menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close only if the clicked element is NOT inside context menu
      if (!e.target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [pinnedMessage, setPinnedMessage] = useState(null); // ✅ Step 1

  const menuRef = useRef(null);
  const chatBodyRef = useRef(null);
  // ✅ Auto scroll to bottom when messages change
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ Close 3-dots dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      // If menuRef exists and click is outside of it -> close the 3-dots dropdown
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false); // close the dropdown
      }
    };

    document.addEventListener("click", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  // ✅ Close both message context menu and 3-dots dropdown on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowMenu(false); // hide 3-dots menu
        setContextMenu(null); // hide message context menu
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // --- Inline edit state + handlers ---
  const [editingMessageId, setEditingMessageId] = useState(null);

  const [editingText, setEditingText] = useState("");
  const editingInputRef = useRef(null);
  // --- Context menu handlers ---
  // Reply handler
  const handleReply = (message) => {
    // Save the message in state for reply preview
    setReplyMessage(message);
    // Close the context menu
    setContextMenu(null);
  };

  // Copy handler
  const handleCopy = (message) => {
    navigator.clipboard
      .writeText(message.text || "") // Copy message text to clipboard
      .then(() => console.log("Message copied to clipboard"))
      .catch(() => console.error("Copy failed"));
    // Close the context menu
    setContextMenu(null);
  };

  // Forward handler
  const handleForward = (message) => {
    // For now, show alert. Replace with actual forward logic if needed.
    alert(`Forward this message: ${message.text}`);
    // Close the context menu
    setContextMenu(null);
  };

  const startEditing = (message) => {
    setEditingMessageId(message.id);
    setEditingText(message.text || "");
    setContextMenu(null); // close the context menu
    setTimeout(() => {
      if (editingInputRef.current) editingInputRef.current.focus();
    }, 0);
  };

  const saveEdit = () => {
    if (editingMessageId == null) return;
    const trimmed = editingText.trim();
    if (!trimmed) {
      // optional: confirm delete if empty
      if (window.confirm) {
        setMessages((prev) => prev.filter((m) => m.id !== editingMessageId));
      } else {
        return;
      }
    } else {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === editingMessageId ? { ...m, text: editingText } : m
        )
      );
    }
    setEditingMessageId(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditingText("");
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  // 💡 Call state for ringing simulation
  const [incomingCall, setIncomingCall] = useState(null); // 'voice' or 'video'
  const [showCallModal, setShowCallModal] = useState(false);

  const handleSend = (newMessage) => {
    if (!newMessage.trim()) return;
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      time: formattedTime,
    };
    setMessages([...messages, newMsg]);
  };

  const handleContextMenu = (e, message) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const left = message.sender === "me" ? rect.left - 160 : rect.right + 10;
    setContextMenu({
      top: rect.top + window.scrollY,
      left: left + window.scrollX,
      message,
    });
  };

  // 💡 Simulate call ringing for 5 seconds
  const initiateCall = (type) => {
    setIncomingCall(type);
    setShowCallModal(true);
    setTimeout(() => setShowCallModal(false), 5000);
  };

  return (
    <>
      <div className="chat-window">
        <div className="chat-window-inner">
          {pinnedMessage && (
            <div
              className="pinned-message"
              style={{
                background: "#fff3cd",
                padding: "10px 15px",
                borderBottom: "1px solid #ccc",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              📌 {pinnedMessage.text}
              <button
                onClick={() => setPinnedMessage(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#007bff",
                  cursor: "pointer",
                }}
              >
                Unpin
              </button>
            </div>
          )}

          <div
            className="chat-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              className="user-info"
              onClick={() => setShowProfile(true)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={profile.img || "https://via.placeholder.com/48"}
                alt="Profile"
                className="user-avatar"
              />
              <div>
                <div className="user-name">{profile.name}</div>
                <div className="user-status">{profile.status}</div>
                <div className="user-note">{profile.note}</div>
              </div>
            </div>

            {/* 🚀 Added call buttons */}

            <div ref={menuRef} className="dots-wrapper">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px",marginright:"10px" }}
              >
                <div
                  className="call-buttons"
                  style={{ display: "flex", gap: "10px" }}
                >
                  <Button
                    variant="outline-info"
                    style={{ border: "1px solid white" }}
                    onClick={() => initiateCall("voice")}
                  >
                    📞
                  </Button>

                  <Button
                    variant="outline-success"
                    style={{ border: "1px solid white" }}
                    onClick={() => initiateCall("video")}
                  >
                    📹
                  </Button>

                  <ThreeDotsVertical
                    className="three-dots"
                    onClick={() => setShowMenu(!showMenu)}
                  />
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
            </div>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg) => {
              // Edit mode — edit
              if (msg.id === editingMessageId) {
                return (
                  <div
                    key={msg.id}
                    className={`message ${
                      msg.sender === "me" ? "sent" : "received"
                    } editing`}
                  >
                    <div
                      className={`bubble ${
                        msg.sender === "me" ? "gray" : "purple"
                      }`}
                    >
                      <textarea
                        ref={editingInputRef} // Auto focus reference
                        className="edit-textarea" // WhatsApp style textarea
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onInput={(e) => {
                          // Auto-height like WhatsApp
                          e.target.style.height = "auto";
                          e.target.style.height = e.target.scrollHeight + "px";
                        }}
                        onKeyDown={handleEditKeyDown} // Save on Enter, cancel on Esc
                        onBlur={saveEdit} // Save when clicking outside
                        rows={1} // Start with single line
                        placeholder="Edit your message..."
                        autoFocus
                      />
                    </div>
                    <div className="timestamp">{msg.time}</div>
                  </div>
                );
              }

              // Normal message —
              return (
                <Message
                  key={msg.id}
                  text={msg.text}
                  sender={msg.sender}
                  specialReply={msg.specialReply}
                  time={msg.time}
                  onContextMenu={(e) => handleContextMenu(e, msg)}
                />
              );
            })}
          </div>

          <InputBox onSend={handleSend} />
        </div>
      </div>

      {contextMenu && contextMenu.message && (
        <ul
          className="context-menu"
          style={{
            top: `${contextMenu.top}px`,
            left: `${contextMenu.left}px`,
            position: "fixed",
          }}
        >
          <li onClick={() => handleReply(contextMenu.message)}>Reply</li>
          <li onClick={() => handleCopy(contextMenu.message)}>Copy</li>
          <li onClick={() => handleForward(contextMenu.message)}>Forward</li>
          <li>Select</li>

          {contextMenu.message.sender === "me" && (
            <li
              onClick={() => {
                startEditing(contextMenu.message);
              }}
            >
              Edit
            </li>
          )}

          <li
            onClick={() => {
              setMessages((prev) =>
                prev.filter((m) => m.id !== contextMenu.message.id)
              );
              setContextMenu(null);
            }}
          >
            Delete
          </li>
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
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "1rem",
            }}
          />
          <h5>{profile.name}</h5>
          <p>{profile.handle}</p>
          <p>{profile.status}</p>
          <p>Status: {profile.note}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfile(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 📞 Call ringing modal */}
      <Modal
        show={showCallModal}
        onHide={() => setShowCallModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {incomingCall === "video" ? "Video Call" : "Voice Call"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Ringing {selectedChat}...</p>
          <div style={{ fontSize: "2rem" }}>
            {incomingCall === "video" ? "📹" : "📞"}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

// ----------------------------------
// Message Component
// ----------------------------------
function Message({
  text,
  sender,
  specialReply,
  onContextMenu,
  time,
  onDoubleClick,
}) {
  const isSticker = text.startsWith("[STICKER]");
  const isFile = text.startsWith("[FILE]");
  const content = text.replace("[STICKER]", "").replace("[FILE]", "");

  return (
    <div
      className={`message ${sender === "me" ? "sent" : "received"}`}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
    >
      <div className={`bubble ${sender === "me" ? "gray" : "purple"}`}>
        {isSticker ? (
          <img
            src={content}
            alt="sticker"
            style={{ width: "150px", borderRadius: "8px" }}
          />
        ) : isFile ? (
          <a href="#" download={content}>
            {content}
          </a>
        ) : (
          <div>{text.split("\n")[0]}</div>
        )}
        {specialReply && (
          <div className="reply-options">Not yet &nbsp;&nbsp; Yes</div>
        )}
      </div>
      <div className="timestamp">{time}</div>
    </div>
  );
}

// ----------------------------------
// Input Box Component
// ----------------------------------

function InputBox({ onSend }) {
  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  // 🎤 Voice note state/hooks
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const chunks = useRef([]);

  const handleSendClick = () => {
    if (inputValue.trim() === "") return;
    onSend(inputValue);
    setInputValue("");
    setShowEmojiPicker(false);
  };

  const onEmojiSelect = (emoji) => setInputValue((prev) => prev + emoji.native);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onSend(`📎 File sent: ${file.name}`);
      event.target.value = null;
    }
  };

  const startRecording = async () => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => chunks.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        onSend(`[VOICE]${url}`);
        chunks.current = [];
      };
      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch {
      alert("Microphone permission denied!");
    }
  };

  return (
    <div className="chat-footer" style={{ position: "relative" }}>
      <InputGroup>
        <Button
          variant="light"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          style={{
            borderRadius: "20px 0 0 20px",
            borderRight: "none",
            backgroundColor: "lightgrey",
          }}
          title="Toggle Emoji Picker"
        >
          😊
        </Button>

        <Button
          variant="light"
          onClick={() => fileInputRef.current.click()}
          style={{
            borderRadius: 0,
            borderLeft: "none",
            borderRight: "none",
            backgroundColor: "lightgrey",
          }}
          title="Attach File"
        >
          📎
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onFileChange}
        />

        {/* 🎙️ Voice note recording button */}
        <Button
          variant="light"
          onClick={startRecording}
          style={{
            borderRadius: 0,
            borderLeft: "none",
            backgroundColor: isRecording ? "#ffcccc" : "lightgrey",
          }}
          title="Record Voice Note"
        >
          🎙️
        </Button>

        <Form.Control
          placeholder="What would you like to say?"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (showEmojiPicker) setShowEmojiPicker(false);
          }}
          onClick={() => showEmojiPicker && setShowEmojiPicker(false)}
          onKeyDown={(e) => e.key === "Enter" && handleSendClick()}
          style={{
            borderRadius: "0 20px 20px 0",
            backgroundColor: "hsla(0, 0%, 97%, 1.00)",
          }}
        />

        <Button
          variant="primary"
          className="send-button"
          onClick={handleSendClick}
        >
          <SendFill />
        </Button>
      </InputGroup>

      {showEmojiPicker && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "10px",
            zIndex: 1000,
          }}
        >
          <Picker data={emojiData} onEmojiSelect={onEmojiSelect} />
        </div>
      )}
    </div>
  );
}

// ----------------------------------
// Root Chat Component
// ----------------------------------
function Chat() {
  const [selectedChat, setSelectedChat] = useState("Meg Griffin");
  return (
    <>
      <style>{styles}</style>

      <div className="app-container">
        {/* <Sidebar /> */}
        <ChatList selectedChat={selectedChat} onSelectChat={setSelectedChat} />
        <ChatWindow selectedChat={selectedChat} />
      </div>
    </>
  );
}

export default Chat;
