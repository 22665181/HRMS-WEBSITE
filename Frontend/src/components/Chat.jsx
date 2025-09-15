"use client"

import { useState, useEffect, useRef } from "react"
import { ThreeDotsVertical, SendFill } from "react-bootstrap-icons"
import Picker from "@emoji-mart/react"
import emojiData from "@emoji-mart/data"
import { BsEmojiSmile, BsMicFill } from "react-icons/bs"
import { FiPaperclip } from "react-icons/fi"
import { BsTelephoneFill, BsCameraVideoFill } from "react-icons/bs"

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

/* Fixed responsive layout structure */
.app-container {
    display: flex;
    height: 100vh;
    width: 100%;          
    overflow: hidden;
}

/* Profile Modal – Dark Mode */
.profile-modal.dark .modal-content {
  background-color: #141414;
  color: #e0e0e0;
}

.profile-modal.dark .modal-header,
.profile-modal.dark .modal-footer {
  border-color: #333;
}

.profile-modal.dark .modal-title {
  color: #ffffff;
}

.profile-modal.dark .btn-secondary {
  background-color: #2a2a2a;
  border-color: #444;
}

.profile-modal.dark .btn-secondary:hover {
  background-color: #333;
  border-color: #555;
}

.profile-modal.dark .btn-close {
  filter: invert(1);
  opacity: 0.85;
}

/* Fixed responsive layout structure */
.app-container {
    display: flex;
    height: 100vh;
    width: 100%;          
    overflow: hidden;
}

.chatlist {
    padding: 20px;
    width: 100%;
    max-width: 400px;
    min-width: 300px;
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    box-sizing: border-box;
    overflow: auto;
    flex-shrink: 0;
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
    padding: 6px;
    font-size: 0.9rem;
    border: 0.5px solid #ccc;
    background-color: white;
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

.edit-textarea {
  border: none;
  background: transparent;
  color: inherit;
  font-size: 0.95rem;
  width: 100%;
  outline: none;
  resize: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
  line-height: 1.4;
}

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

/* Fixed chat window responsive layout */
.chat-window {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-left: 1px solid #ddd;
    height: 100vh;
    min-width: 0;
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
  background: #4C57C1;
  color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  flex-shrink: 0;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 0;
    flex: 1;
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
    border: 2px solid #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    color: #ffffff;
    margin-top: 10px;
    transition: opacity 0.2s ease;
}

.three-dots:hover {
    opacity: 0.8;
}

.chat-body {
    flex-grow: 1;
    padding: 1rem 2rem;
    overflow-y: auto;
    background-color: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.chat-body::-webkit-scrollbar {
    display: none;
}

/* Updated CSS styles to match original design better */
.message {
    display: flex;
    flex-direction: column;
    max-width: 70%;
    margin-bottom: 1rem;
}

.message.sent {
    align-self: flex-end;
}

.message.received {
    align-self: flex-start;
}

.bubble {
    padding: 12px 16px;
    border-radius: 18px;
    word-break: break-word;
    font-size: 0.9rem;
    line-height: 1.5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.bubble.purple {
    background-color: #6366f1;
    color: white;
}

.bubble.gray {
    background-color: #f3f4f6;
    color: #374151;
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
    padding: 16px 20px;
    border-top: 1px solid #e5e7eb;
    background-color: #ffffff;
    flex-shrink: 0;
}

.input-container {
    display: flex;
    align-items: center;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 24px;
    padding: 8px 12px;
    gap: 8px;
    max-width: 100%;
}

.input-actions {
    display: flex;
    align-items: center;
    gap: 4px;
}

.action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    border-radius: 50%;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s ease;
}

.action-button:hover {
    background-color: #e2e8f0;
    color: #475569;
}

.message-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    padding: 8px 12px;
    font-size: 14px;
    color: #1e293b;
    min-width: 0;
}

.message-input::placeholder {
    color: #94a3b8;
}

.send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-left: 4px;
}

.send-button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}

.dots-wrapper {
    position: relative;
    display: inline-block;
}

.dropdown-float {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    transform: none;
    background-color: #303031ff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-radius: 6px;
    z-index: 100;
    min-width: 120px;
    white-space: nowrap;
}

.dropdown-btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
    background-color: transparent;
    color: #ffffff;
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
}

.dropdown-btn:hover {
    background-color: #404040;
    color: #ffffff;
}

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

/* Fixed responsive breakpoints and mobile layout */
@media (max-width: 1024px) {
    .chatlist {
        max-width: 350px;
        min-width: 280px;
    }
    
    .chat-body {
        padding: 1rem;
    }
    
    .message {
        max-width: 75%;
    }
}

@media (max-width: 768px) {
    .app-container {
        position: relative;
        height: 100vh;
    }
    
    .chatlist {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        max-width: none;
        z-index: 10;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        height: 100vh;
    }
    
    .chatlist.mobile-open {
        transform: translateX(0);
    }
    
    .chat-window {
        width: 100%;
        height: 100vh;
        margin: 0;
        border-left: none;
    }
    
    .chat-header {
        border-radius: 0;
        padding: 12px 16px;
    }
    
    .chat-body {
        padding: 8px 12px;
    }
    
    /* Better responsive design */
    .message {
        max-width: 85%;
    }
    
    .bubble {
        font-size: 0.85rem;
        padding: 10px 14px;
    }
    
    .chat-footer {
        padding: 12px 16px;
    }
    
    .user-info {
        gap: 8px;
    }
    
    .user-avatar {
        width: 36px;
        height: 36px;
    }
    
    .user-name {
        font-size: 14px;
    }
    
    .user-status {
        font-size: 12px;
    }
    
    .chat-footer {
        padding: 12px 16px;
    }
    
    .input-container {
        padding: 6px 10px;
    }
    
    .action-button {
        width: 28px;
        height: 28px;
    }
    
    .send-button {
        width: 32px;
        height: 32px;
    }
}

@media (max-width: 480px) {
    .chat-footer {
        padding: 8px 12px;
    }
    
    .input-container {
        padding: 4px 8px;
        gap: 4px;
    }
    
    .message-input {
        padding: 6px 8px;
        font-size: 13px;
    }
    
    .action-button {
        width: 24px;
        height: 24px;
    }
    
    .send-button {
        width: 28px;
        height: 28px;
    }
}

/* Input box styling */
.chat-footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-group {
    width: 100%;
    display: flex;
    max-width: 800px;
}

.input-group .form-control {
    flex: 1;
    border-radius: 20px 0 0 20px;
    border: 1px solid #ccc;
    padding: 10px 15px;
}

.input-group .btn {
    border-radius: 0 20px 20px 0;
    background-color: #5c4ce1;
    color: white;
    padding: 0 25px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.input-group .btn:hover {
    background-color: #4b3cd1;
}

/* Dark Mode Styles */
.app-container.dark {
  background-color: #121212;
  color: #e0e0e0;
}

.app-container.dark .chat-filter {
    padding: 6px;
    font-size: 0.9rem;
    border: 1px solid #121212ff;
    background-color: #151515ff;
    color: antiquewhite;
    border-radius: 6px;
    outline: none;
    cursor: pointer;
}

.app-container.dark .chatlist {
  background-color: #181818;
}

.app-container.dark .chatlist-item:hover {
    background-color: #282828ff;
}

.app-container.dark .chat-window {
  background-color: #181818;
  border-left: 1px solid #333;
}

.app-container.dark .chat-header {
  background: #301968ff !important;
  color: #ffffffff;
}

.app-container.dark .chat-body {
  background-color: #121212;
}

.app-container.dark .bubble.gray {
  background-color: #2a2a2a;
  color: #ddd;
  border: 1px solid #444;
}

.app-container.dark .bubble.purple {
  background-color: #292267ff;
  color: #fff;
}

.app-container.dark .chat-footer {
  background-color: #1e1e1e;
}

.app-container.dark .form-control {
  background-color: #2a2a2a;
  color: #fff;
  border: 1px solid #444;
}

.app-container.dark .form-control::placeholder {
  color: #aaa;
}

.app-container.dark .chatlist-item.selected {
    background-color: #000000ff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.app-container.dark .input-group .form-control {
    flex: 1;
    border-radius: 20px 0 0 20px;
    color: white;
    background-color: #2a2a2a;
    border: 1px solid #444;
    padding: 10px 15px;
}

.app-container.dark .context-menu {
    background-color: #141414ff;
    border: 1px solid #7d7d7dff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    list-style: none;
    padding: 0.5rem 0;
    margin: 0;
    z-index: 2000;
    width: 150px;
    border-radius: 4px;
    position: absolute;
    color: black;
}

.app-container.dark .context-menu li:hover {
    background-color: #101156ff;
}

/* Added mobile menu toggle button */
.mobile-menu-toggle {
    display: none;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 20;
    background-color: #4C57C1;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

/* Improved profile image styling */
.profile-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #e5e7eb;
}

.chat-list .profile-image {
    width: 48px;
    height: 48px;
}
`

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
]

function ChatList({ selectedChat, onSelectChat, darkMode, setDarkMode }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("all")
  const [chats, setChats] = useState(chatData)
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    chatName: null,
  })
  const [unlockModal, setUnlockModal] = useState({ show: false, chatName: "" })
  const [unlockPassword, setUnlockPassword] = useState("")
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef(null)

  const togglePin = (chatName) => {
    setChats((prevChats) =>
      prevChats.map((chat) => (chat.name === chatName ? { ...chat, pinned: !chat.pinned } : chat)),
    )
  }

  const archiveChat = (chatName) => {
    setChats((prevChats) => prevChats.map((chat) => (chat.name === chatName ? { ...chat, archived: true } : chat)))
  }

  const toggleLock = (chatName) => {
    const target = chats.find((c) => c.name === chatName)
    if (!target) return

    setUnlockPassword("") // clear old password
    setUnlockModal({ show: true, chatName }) // open modal
  }

  const deleteChat = (chatName) => {
    const updatedChats = chats.filter((chat) => chat.name !== chatName)
    setChats(updatedChats)

    if (selectedChat === chatName) {
      if (updatedChats.length > 0) {
        onSelectChat(updatedChats[0].name)
      } else {
        onSelectChat(null)
      }
    }
  }

  const filteredChats = chats
    .filter((chat) => (filter === "archived" ? chat.archived : !chat.archived))
    .filter((chat) => {
      const matchSearch = chat.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    : true
      return matchSearch && matchFilter
    })
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Handle context menu close
      if (!e.target.closest(".context-menu")) {
        setContextMenu(null)
      }

      // Handle mobile menu close
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }

    const closeAllMenus = () => {
      setContextMenu(null)
      setShowMenu(false)
      setIsMobileOpen(false)
    }

    const handleMobileToggle = () => setIsMobileOpen((prev) => !prev)

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowMenu(false)
        setContextMenu(null)
      }
    }

    // Add all event listeners
    document.addEventListener("click", handleClickOutside)
    document.addEventListener("keydown", handleEsc)
    window.addEventListener("app:close-all-menus", closeAllMenus)
    window.addEventListener("toggle-mobile-menu", handleMobileToggle)

    // Cleanup all event listeners
    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEsc)
      window.removeEventListener("app:close-all-menus", closeAllMenus)
      window.removeEventListener("toggle-mobile-menu", handleMobileToggle)
    }
  }, []) // Empty dependency array since we want this to run once

  // The following useEffect hooks have been consolidated above:
  // - handleClickOutside for context menu
  // - closeAllMenus event listener
  // - handleMobileToggle event listener
  // - handleClickOutsideMenu for menu
  // - handleEsc for escape key

  return (
    <div className={`chatlist ${isMobileOpen ? "mobile-open" : ""}`}>
      <div className="chatlist-header flex justify-between items-center mb-4">
        <h3 className="chatlist-heading text-lg font-semibold">Messages</h3>
        <div className="flex items-center gap-2">
          <select className="chat-filter border rounded p-2" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">🔽 All</option>
            <option value="groups">👥 Groups</option>
            <option value="unread">🔵 Unread</option>
            <option value="read">✅ Read</option>
            <option value="favourites">⭐ Favourites</option>
            <option value="archived">📁 Archived</option>
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search chats..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="chat-search border rounded p-2 mb-4 w-full"
      />

      <div className="chatlist-scroll overflow-y-auto">
        <ul className="chatlist-items">
          {filteredChats.map((chat, index) => (
            <li
              className={`chatlist-item flex items-center p-2 rounded cursor-pointer ${
                chat.name === selectedChat ? "bg-gray-200 dark:bg-gray-700" : ""
              } ${chat.favourite ? "text-yellow-500" : ""}`}
              key={index}
              onClick={() => {
                const target = chats.find((c) => c.name === chat.name)
                if (target && target.locked) {
                  setUnlockPassword("")
                  setUnlockModal({ show: true, chatName: chat.name })
                } else {
                  onSelectChat(chat.name)
                }
              }}
              onContextMenu={(e) => {
                e.preventDefault()
                window.dispatchEvent(new Event("app:close-all-menus"))
                setContextMenu({
                  visible: true,
                  x: e.clientX,
                  y: e.clientY,
                  chatName: chat.name,
                })
              }}
            >
              <img
                src={chat.img || ""}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "12px",
                  objectFit: "cover",
                }}
              />
              <div className="chat-info flex-1">
                <div className="chat-name flex items-center">
                  {chat.name}
                  {chat.favourite && <span className="favourite-star ml-1">★</span>}
                  {chat.pinned && <span className="ml-1">📌</span>}
                  {chat.locked && <span className="ml-1">🔒</span>}
                </div>
                <div className="chat-status text-gray-500">
                  {chat.status}
                  {chat.time && <span className="chat-time"> · {chat.time}</span>}
                </div>
              </div>
              {chat.unread && <div className="dot w-2 h-2 bg-blue-500 rounded-full"></div>}
            </li>
          ))}
        </ul>

        {contextMenu && contextMenu.visible && (
          <ul
            className="context-menu absolute border border-gray-300 rounded shadow-lg bg-white"
            style={{
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
              zIndex: 9999,
            }}
          >
            <li
              onClick={() => {
                togglePin(contextMenu.chatName)
                setContextMenu({ ...contextMenu, visible: false })
              }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {chats.find((chat) => chat.name === contextMenu.chatName)?.pinned ? "Unpin Chat" : "Pin Chat"}
            </li>
            <li
              onClick={() => {
                archiveChat(contextMenu.chatName)
                setContextMenu({ ...contextMenu, visible: false })
              }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              Archive Chat
            </li>
            <li
              onClick={() => {
                toggleLock(contextMenu.chatName)
                setContextMenu({ ...contextMenu, visible: false })
              }}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {chats.find((chat) => chat.name === contextMenu.chatName)?.locked ? "Unlock Chat" : "Lock Chat"}
            </li>
            <li
              onClick={() => {
                deleteChat(contextMenu.chatName)
                setContextMenu({ ...contextMenu, visible: false })
              }}
              className="p-2 cursor-pointer text-red-500 hover:bg-red-100"
            >
              Delete Chat
            </li>
          </ul>
        )}

        {/* 🔓 Unlock Chat Modal */}
        {unlockModal.show && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded shadow-lg p-4 w-80">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold">Enter Password</h4>
                <button onClick={() => setUnlockModal({ show: false, chatName: "" })} className="text-gray-500">
                  &times;
                </button>
              </div>
              <div className="mt-4">
                <input
                  type="password"
                  placeholder="Enter chat password"
                  value={unlockPassword}
                  onChange={(e) => setUnlockPassword(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-300 text-gray-700 rounded px-4 py-2 mr-2"
                  onClick={() => setUnlockModal({ show: false, chatName: "" })}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white rounded px-4 py-2"
                  onClick={() => {
                    const target = chats.find((c) => c.name === unlockModal.chatName)
                    if (!target.locked) {
                      if (!unlockPassword.trim()) {
                        alert("Please enter a password to lock the chat")
                        return
                      }
                      setChats((prev) =>
                        prev.map((chat) =>
                          chat.name === unlockModal.chatName
                            ? { ...chat, locked: true, password: unlockPassword }
                            : chat,
                        ),
                      )
                      setUnlockModal({ show: false, chatName: "" })
                      setUnlockPassword("")
                    } else {
                      if (unlockPassword === target.password) {
                        setChats((prev) =>
                          prev.map((chat) =>
                            chat.name === unlockModal.chatName ? { ...chat, locked: false, password: "" } : chat,
                          ),
                        )
                        onSelectChat(unlockModal.chatName)
                        setUnlockModal({ show: false, chatName: "" })
                        setUnlockPassword("")
                      } else {
                        alert("Incorrect password")
                      }
                    }
                  }}
                >
                  {chats.find((c) => c.name === unlockModal.chatName)?.locked ? "Unlock" : "Lock"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

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
}

function ChatWindow({ selectedChat, darkMode }) {
  const profile = userProfiles[selectedChat] || {}
  const [messages, setMessages] = useState(
    selectedChat === "Meg Griffin"
      ? [
          {
            id: 1,
            text: "Hey Eric, have you collaborated with Fred yet?",
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
      : [],
  )

  useEffect(() => {
    setMessages(
      selectedChat === "Meg Griffin"
        ? [
            {
              id: 1,
              text: "Hey Eric, have you collaborated with Fred yet?",
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
        : [],
    )
  }, [selectedChat])

  const [editingMessageId, setEditingMessageId] = useState(null)
  const [editingText, setEditingText] = useState("")
  const editingInputRef = useRef(null)
  const [showMenu, setShowMenu] = useState(false)

  const [showProfile, setShowProfile] = useState(false)
  const [contextMenu, setContextMenu] = useState(null)
  const handleReply = (message) => {
    alert(`Reply to this message: ${message.text}`)
    setContextMenu(null)
  }

  const [pinnedMessage, setPinnedMessage] = useState(null)
  const menuRef = useRef(null)
  const chatBodyRef = useRef(null)
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages])

  const handleCopy = (message) => {
    navigator.clipboard
      .writeText(message.text || "")
      .then(() => console.log("Message copied to clipboard"))
      .catch(() => console.error("Copy failed"))
    setContextMenu(null) // Consistent with other context menu closures
  }

  const handleForward = (message) => {
    alert(`Forward this message: ${message.text}`)
    setContextMenu(null)
  }

  const startEditing = (message) => {
    setEditingMessageId(message.id)
    setEditingText(message.text || "")
    setContextMenu(null)
    setTimeout(() => {
      if (editingInputRef.current) editingInputRef.current.focus()
    }, 0)
  }

  const saveEdit = () => {
    if (editingMessageId == null) return
    const trimmed = editingText.trim()
    if (!trimmed) {
      if (window.confirm) {
        setMessages((prev) => prev.filter((m) => m.id !== editingMessageId))
      } else {
        return
      }
    } else {
      setMessages((prev) => prev.map((m) => (m.id === editingMessageId ? { ...m, text: editingText } : m)))
    }
    setEditingMessageId(null)
    setEditingText("")
  }

  const cancelEdit = () => {
    setEditingMessageId(null)
    setEditingText("")
  }

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      saveEdit()
    } else if (e.key === "Escape") {
      cancelEdit()
    }
  }

  const [incomingCall, setIncomingCall] = useState(null)
  const [showCallModal, setShowCallModal] = useState(false)

  const handleSend = (newMessage) => {
    if (!newMessage.trim()) return
    const now = new Date()
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
      time: formattedTime,
    }
    setMessages([...messages, newMsg])
  }

  const handleContextMenu = (e, message) => {
    e.preventDefault()
    window.dispatchEvent(new Event("app:close-all-menus"))

    const rect = e.currentTarget.getBoundingClientRect()
    const left = message.sender === "me" ? rect.left - 160 : rect.right + 10
    setContextMenu({
      top: rect.top + window.scrollY,
      left: left + window.scrollX,
      message,
    })
  }

  const initiateCall = (type) => {
    setIncomingCall(type)
    setShowCallModal(true)
    setTimeout(() => setShowCallModal(false), 5000)
  }

  return (
    <>
      <button
        className="mobile-menu-toggle"
        onClick={() => window.dispatchEvent(new Event("toggle-mobile-menu"))}
        title="Toggle Chat List"
      >
        ☰
      </button>

      <div className="chat-window">
        <div className="chat-window-inner">
          {pinnedMessage && (
            <div className="pinned-message bg-yellow-100 p-3 border-b border-gray-300 flex justify-between items-center font-bold">
              📌 {pinnedMessage.text}
              <button onClick={() => setPinnedMessage(null)} className="text-blue-500 hover:underline">
                Unpin
              </button>
            </div>
          )}

          <div className="chat-header flex justify-between items-center mb-4">
            <div className="user-info flex items-center cursor-pointer" onClick={() => setShowProfile(true)}>
              <img
                src={profile.img || "https://via.placeholder.com/48"}
                alt="Profile"
                className="user-avatar w-12 h-12 rounded-full mr-3"
              />
              <div>
                <div className="user-name font-semibold">{profile.name}</div>
                <div className="user-status text-gray-500">{profile.status}</div>
                <div className="user-note text-gray-400">{profile.note}</div>
              </div>
            </div>

            <div ref={menuRef} className="dots-wrapper flex items-center">
              <div className="call-buttons flex gap-2">
                <button
                  className="border border-gray-300 rounded p-2 hover:bg-gray-100"
                  onClick={() => initiateCall("voice")}
                >
                  <BsTelephoneFill size={18} />
                </button>

                <button
                  className="border border-gray-300 rounded p-2 hover:bg-gray-100"
                  onClick={() => initiateCall("video")}
                >
                  <BsCameraVideoFill size={18} />
                </button>

                <ThreeDotsVertical
                  className="three-dots cursor-pointer"
                  onClick={() => {
                    if (!showMenu) window.dispatchEvent(new Event("app:close-all-menus"))
                    setShowMenu(!showMenu)
                  }}
                />

                {showMenu && (
                  <div className="dropdown-float ">
                    <button className="dropdown-btn ">Delete</button>
                    <button className="dropdown-btn ">Mute</button>
                    <button className="dropdown-btn ">Block</button>
                    <button className="dropdown-btn ">Report</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="chat-body overflow-y-auto " ref={chatBodyRef}>
            {messages.map((msg) => {
              if (msg.id === editingMessageId) {
                return (
                  <div key={msg.id} className={`message ${msg.sender === "me" ? "sent" : "received"} editing`}>
                    <div className={`bubble ${msg.sender === "me" ? "bg-gray-200" : "bg-purple-200"} p-2 rounded-lg`}>
                      <textarea
                        ref={editingInputRef}
                        className="edit-textarea w-full border rounded p-2"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onInput={(e) => {
                          e.target.style.height = "auto"
                          e.target.style.height = e.target.scrollHeight + "px"
                        }}
                        onKeyDown={handleEditKeyDown}
                        onBlur={saveEdit}
                        rows={1}
                        placeholder="Edit your message..."
                        autoFocus
                      />
                    </div>
                    <div className="timestamp text-gray-500">{msg.time}</div>
                  </div>
                )
              }

              return (
                <MessageComponent
                  key={msg.id}
                  text={msg.text}
                  sender={msg.sender}
                  specialReply={msg.specialReply}
                  time={msg.time}
                  onContextMenu={(e) => handleContextMenu(e, msg)}
                />
              )
            })}
          </div>

          <ChatFooter onSend={handleSend} />
        </div>
      </div>

      {contextMenu && contextMenu.message && (
        <ul
          className="context-menu absolute bg-white border border-gray-300 rounded shadow-lg"
          style={{
            top: `${contextMenu.top}px`,
            left: `${contextMenu.left}px`,
          }}
        >
          <li onClick={() => handleReply(contextMenu.message)} className="px-4 py-2 hover:bg-gray-100">
            Reply
          </li>
          <li onClick={() => handleCopy(contextMenu.message)} className="px-4 py-2 hover:bg-gray-100">
            Copy
          </li>
          <li onClick={() => handleForward(contextMenu.message)} className="px-4 py-2 hover:bg-gray-100">
            Forward
          </li>
          <li className="px-4 py-2 hover:bg-gray-100">Select</li>

          {contextMenu.message.sender === "me" && (
            <li
              onClick={() => {
                startEditing(contextMenu.message)
              }}
              className="px-4 py-2 hover:bg-gray-100"
            >
              Edit
            </li>
          )}

          <li
            onClick={() => {
              setMessages((prev) => prev.filter((m) => m.id !== contextMenu.message.id))
              setContextMenu(null)
            }}
            className="px-4 py-2 hover:bg-gray-100"
          >
            Delete
          </li>
        </ul>
      )}

      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 ${darkMode ? "bg-gray-800 text-white" : ""}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">User Profile</h3>
              <button onClick={() => setShowProfile(false)} className="text-gray-500 hover:text-gray-700 text-xl">
                ×
              </button>
            </div>
            <div className="text-center">
              <img
                src={profile.img || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4 mx-auto"
              />
              <h5 className="text-lg font-semibold">{profile.name}</h5>
              <p className="text-gray-500">{profile.handle}</p>
              <p className="text-gray-600">{profile.status}</p>
              <p className="text-gray-400">Status: {profile.note}</p>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 text-gray-700 rounded px-4 py-2 hover:bg-gray-400"
                onClick={() => setShowProfile(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showCallModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 ${darkMode ? "bg-gray-800 text-black" : ""}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{incomingCall === "video" ? "Video Call" : "Voice Call"}</h3>
              <button onClick={() => setShowCallModal(false)} className="text-gray-500 hover:text-gray-700 text-xl">
                ×
              </button>
            </div>
            <div className="text-center">
              <p className="mb-4">Ringing {selectedChat}...</p>
              <div className="text-4xl mb-4">
                {incomingCall === "video" ? (
                  <BsCameraVideoFill className="mx-auto" />
                ) : (
                  <BsTelephoneFill className="mx-auto" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ChatFooter({ onSend }) {
  const [inputValue, setInputValue] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const fileInputRef = useRef(null)
  const emojiRef = useRef(null)

  useEffect(() => {
    function handleClickOutsideEmoji(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutsideEmoji)
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEmoji)
    }
  }, [])

  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const chunks = useRef([])

  const handleSendClick = () => {
    if (inputValue.trim() === "") return
    onSend(inputValue)
    setInputValue("")
    setShowEmojiPicker(false)
  }

  const onEmojiSelect = (emoji) => setInputValue((prev) => prev + emoji.native)

  const onFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      onSend(`📎 File sent: ${file.name}`)
      event.target.value = null
    }
  }

  const startRecording = async () => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.stop()
      setIsRecording(false)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      recorder.ondataavailable = (e) => chunks.current.push(e.data)
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" })
        const url = URL.createObjectURL(blob)
        onSend(`[VOICE]${url}`)
        chunks.current = []
      }
      recorder.start()
      setMediaRecorder(recorder)
      setIsRecording(true)
    } catch {
      alert("Microphone permission denied!")
    }
  }

  return (
    <div
      style={{
        borderTop: "1px solid #e5e7eb",
        padding: "16px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "24px",
          padding: "8px 12px",
          gap: "8px",
          maxWidth: "100%",
        }}
      >
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            border: "none",
            background: "transparent",
            borderRadius: "50%",
            backgroundColor:"rgb(99, 102, 241)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          title="Add emoji"
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "transparent"
            e.target.style.color = "#475569"
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgb(99, 102, 241)"
            e.target.style.color = "#ffffffff"
          }}
        >
          <BsEmojiSmile size={18} />
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            border: "none",
            background: "transparent",
            borderRadius: "50%",
            backgroundColor:"rgb(99, 102, 241)",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          title="Attach file"
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "transparent"
            e.target.style.color = "#475569"
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgb(99, 102, 241)"
            e.target.style.color = "#ffffffff"
          }}
        >
          <FiPaperclip size={18} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            opacity: 0,
            visibility: "hidden",
            pointerEvents: "none",
          }}
          onChange={onFileChange}
        />

        <input
          placeholder="What would you like to say?"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            if (showEmojiPicker) setShowEmojiPicker(false)
          }}
          onClick={() => showEmojiPicker && setShowEmojiPicker(false)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendClick()}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#1e293b",
            fontSize: "14px",
            padding: "8px 12px",
            minWidth: 0,
          }}
        />

        <button
          onClick={startRecording}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            border: "none",
            background: "transparent",
            borderRadius: "50%",
            color: isRecording ? "#ef4444" : "#64748b",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          title="Record voice message"
          onMouseEnter={(e) => {
            if (!isRecording) {
              e.target.style.backgroundColor = "#e2e8f0"
              e.target.style.color = "#475569"
            }
          }}
          onMouseLeave={(e) => {
            if (!isRecording) {
              e.target.style.backgroundColor = "transparent"
              e.target.style.color = "#64748b"
            }
          }}
        >
          <BsMicFill size={18} />
        </button>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            background:"linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            border: "none",
            borderRadius: "50%",
            backgroundColor:"rgb(99, 102, 241)",
            cursor: inputValue.trim() ? "pointer" : "not-allowed",
            transition: "all 0.2s ease",
            marginLeft: "4px",
            opacity: inputValue.trim() ? 1 : 0.5,
          }}
          onClick={handleSendClick}
          disabled={!inputValue.trim()}
          onMouseEnter={(e) => {
            if (inputValue.trim()) {
              e.target.style.transform = "scale(1.05)"
              e.target.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.3)"
            }
          }}
          onMouseLeave={(e) => {
            if (inputValue.trim()) {
              e.target.style.transform = "scale(1)"
              e.target.style.boxShadow = "none"
            }
          }}
        >
          <SendFill size={16} />
        </button>
      </div>

      {showEmojiPicker && (
        <div
          ref={emojiRef}
          style={{
            position: "absolute",
            bottom: "60px",
            right: "160px",
            zIndex: 50,
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e5e7eb",
          }}
        >
          <Picker data={emojiData} onEmojiSelect={onEmojiSelect} />
        </div>
      )}
    </div>
  )
}

function MessageComponent({ text, sender, specialReply, onContextMenu, time, onDoubleClick }) {
  const isSticker = text.startsWith("[STICKER]")
  const isFile = text.startsWith("[FILE]")
  const content = text.replace("[STICKER]", "").replace("[FILE]", "")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "70%",
        marginBottom: "1rem",
        alignSelf: sender === "me" ? "flex-end" : "flex-start",
      }}
      onContextMenu={onContextMenu}
      onDoubleClick={onDoubleClick}
    >
      <div
        style={{
          padding: "12px 16px",
          borderRadius: "18px",
          wordBreak: "break-word",
          fontSize: "0.9rem",
          lineHeight: "1.5",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          backgroundColor: sender === "me" ? "#6366f1" : "#f3f4f6",
          color: sender === "me" ? "white" : "#374151",
          marginLeft: sender === "me" ? "auto" : "0",
        }}
      >
        {isSticker ? (
          <img src={content || "/placeholder.svg"} alt="sticker" style={{ width: "144px", borderRadius: "8px" }} />
        ) : isFile ? (
          <a href="#" download={content} style={{ color: "#3b82f6", textDecoration: "underline" }}>
            {content}
          </a>
        ) : (
          <div style={{ fontSize: "14px", lineHeight: "1.5" }}>{text.split("\n")[0]}</div>
        )}
        {specialReply && <div style={{ marginTop: "4px" }}>&nbsp;&nbsp;</div>}
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "#9ca3af",
          marginTop: "4px",
          textAlign: sender === "me" ? "right" : "left",
          paddingLeft: sender === "me" ? "0" : "8px",
          paddingRight: sender === "me" ? "8px" : "0",
        }}
      >
        {time}
      </div>
    </div>
  )
}

function Chat() {
  const [selectedChat, setSelectedChat] = useState("Meg Griffin")
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"
  })

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode)
  }, [darkMode])

  useEffect(() => {
    const styleElement = document.createElement("style")
    styleElement.textContent = styles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <ChatList
        selectedChat={selectedChat}
        onSelectChat={setSelectedChat}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <ChatWindow selectedChat={selectedChat} darkMode={darkMode} />
    </div>
  )
}

export default Chat
