// MergedFeed.jsx
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';
import {
  Card, Badge, Button, Form, Modal, ListGroup, ProgressBar, Dropdown
} from 'react-bootstrap';
import {
  Heart, HeartFill, Chat, Share, Bookmark, BookmarkFill, ThreeDots, Plus
} from 'react-bootstrap-icons';
import {
  FaBirthdayCake, FaCalendar, FaUser, FaGem
} from 'react-icons/fa';
import {
  startOfWeek, addDays, format, addWeeks,
  isBefore, isSameWeek, isSameDay, parseISO
} from 'date-fns';
// import './MergedFeed.css';

// --- CSS (Merged MainContent.css + RightPanel.css) ---
const mergedCss = `
body.dark-mode {
  background-color: #121212;
  color: #e1e1e1;
  font-weight: 400;
  line-height: 1.5;
}
body.dark-mode .main-content {
  background-color: #1c1c1c;
  color: #e1e1e1;
}
body.dark-mode .feed-header {
  color: #f0f0f0;
}
body.dark-mode .feed-card {
  background-color: #242424;
  border-color: #2f2f2f;
  color: #e1e1e1;
  box-shadow: none;
}
body.dark-mode .card-text,
body.dark-mode .form-control,
body.dark-mode .form-control::placeholder {
  color: #ddd !important;
}
body.dark-mode .form-control {
  background-color: #2c2c2c;
  border: 1px solid #444;
}
body.dark-mode .form-control:focus {
  background-color: #2c2c2c;
  color: #fff;
  border-color: #666;
  box-shadow: none;
}
body.dark-mode .avatar {
  background-color: #333;
  color: #fff;
}
body.dark-mode .points-badge,
body.dark-mode .comments-badge,
body.dark-mode .badge.bg-light {
  background-color: #3a3a3a !important;
  color: #f1f1f1 !important;
  border: none;
}
body.dark-mode .comment-box {
  background-color: #2c2c2c;
  color: #fff;
  border: 1px solid #444;
}
body.dark-mode .comment {
  border-left: 2px solid #444;
}
body.dark-mode .wish-link {
  color: #66b2ff;
}
body.dark-mode .post-image {
  background-color: #2e2e2e;
}
body.dark-mode .post-actions {
  border-top-color: #333;
  border-bottom-color: #333;
}
body.dark-mode .action-btn,
body.dark-mode .btn-link {
  color: #cccccc;
  text-decoration: none !important;
}
body.dark-mode .action-btn:hover,
body.dark-mode .btn-link:hover {
  color: #66b2ff;
  opacity: 0.85;
}
body.dark-mode .view-comments-btn {
  color: #aaaaaa;
}
body.dark-mode .main-content::-webkit-scrollbar-thumb {
  background-color: #555;
}
body.dark-mode .custom-share-dropdown {
  background-color: #1f1f1f;
  border: 1px solid #333;
}
body.dark-mode .custom-share-btn {
  background-color: #2c2c2c;
  color: #eaeaea;
  border-color: #444;
}
body.dark-mode .custom-share-btn:hover {
  background-color: #3a3a3a;
  color: #66b2ff;
  transform: translateY(-1px);
}
.action-btn,
.action-btn span,
.btn-link,
.btn-link:hover {
  text-decoration: none !important;
}
.comment-box {
  resize: none;
  font-size: clamp(0.85rem, 1vw, 1rem);
}
.comment .avatar {
  width: 36px;
  height: 36px;
  font-size: 0.8rem;
  background-color: #ccc;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.avatar {
  width: 40px;
  height: 40px;
  background-color: #007bff;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
.reply {
  margin-left: 2rem;
  padding-left: 0.5rem;
  border-left: 2px solid #eee;
}
body.dark-mode .reply {
  border-left: 2px solid #444;
}
html {
  font-size: clamp(14px, 1.5vw, 16px);
}
body {
  font-family: 'Segoe UI', sans-serif;
  line-height: 1.5;
}
.feed-header {
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 600;
}
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.comment {
  animation: fadeSlideIn 0.4s ease-out;
}
body,
.main-content,
.feed-card,
.card-text,
.form-control,
.form-control::placeholder,
.avatar,
.points-badge,
.comments-badge,
.comment-box,
.comment,
.wish-link,
.post-image,
.post-actions,
.action-btn,
.view-comments-btn,
.btn-link,
.badge,
.form-control:focus {
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    text-decoration 0.3s ease,
    transform 0.3s ease,
    opacity 0.3s ease;
}
.custom-share-dropdown {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease-in-out;
}
.custom-share-btn {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 0.85rem;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}
.custom-share-btn:hover {
  background-color: #e8f0fe;
  transform: translateY(-1px);
  color: #007bff;
}
.emoji-reactions {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
}
.emoji-btn {
  border-radius: 50%;
  font-size: 1rem;
  width: 30px;
  height: 30px;
  padding: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}
.emoji-btn:hover {
  background-color: #f1f1f1;
  transform: scale(1.1);
}
body.dark-mode .emoji-btn:hover {
  background-color: #3a3a3a;
}
.comment-submit-btn {
  margin-top: 0.5rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.comment-submit-btn:hover {
  background-color: #0056b3;
  transform: translateY(-1px);
}
body.dark-mode .comment-submit-btn {
  background-color: #3390ff;
  color: #fff;
}
body.dark-mode .comment-submit-btn:hover {
  background-color: #1e75d2;
}
.comment-submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.create-post-btn {
  font-weight: 600;
  padding: 6px 16px;
  font-size: 0.95rem;
  border-radius: 6px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}
.create-post-btn:hover {
  background-color: #0056b3;
  color: #fff;
  transform: translateY(-1px);
}
body.dark-mode .create-post-btn {
  background-color: #3390ff;
  color: #fff;
}
body.dark-mode .create-post-btn:hover {
  background-color: #1e75d2;
}
.create-post-modal .modal-content {
  border-radius: 12px;
  padding: 1rem;
}
.create-post-modal textarea {
  resize: none;
}
.image-preview {
  margin-top: 1rem;
  position: relative;
}
.image-preview img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
}
.image-preview button {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  cursor: pointer;
}
body.dark-mode .image-preview img {
  border-color: #444;
}
body.dark-mode .image-preview button {
  background: rgba(255, 255, 255, 0.2);
}
.tag {
  display: inline-block;
  background-color: #e0f3ff;
  color: #007bff;
  border-radius: 4px;
  padding: 3px 8px;
  margin-right: 4px;
  font-size: 0.85rem;
}
body.dark-mode .tag {
  background-color: #003d66;
  color: #66c2ff;
}
.custom-file-input {
  margin-top: 0.5rem;
  font-size: 0.9rem;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Upload Image';
  display: inline-block;
  background: #007bff;
  color: white;
  border-radius: 4px;
  padding: 4px 12px;
  outline: none;
  white-space: nowrap;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}
.custom-file-input:hover::before {
  background-color: #0056b3;
}
body.dark-mode .custom-file-input::before {
  background-color: #3390ff;
}
body.dark-mode .custom-file-input:hover::before {
  background-color: #1e75d2;
}
.post-image img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 8px;
}

@media (min-width: 1200px) {
  .post-image img {
    max-width: 600px;
    width: 100%;
    height: auto;
  }
}

@media (max-width: 768px) {
  .post-image img {
    max-width: 100vw;
    width: 100%;
    height: auto;
  }
}
/* ========== RIGHT PANEL ========== */
.right-panel {
  flex: 0 0 320px;
  max-width: 320px;
  // min-width: 320px;
  height: 100vh;
  padding: 15px;
  background: linear-gradient(to bottom right, #f0f8ff, #e6f7ff);
  box-sizing: border-box;
  overflow-y: auto;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-left: 1px solid rgba(0, 0, 0, 0.05);
}
.right-panel .badge {
  color: #ffffff !important;
  font-weight: bold;
}
.right-panel .badge .count-up {
  color: inherit !important;
}
.right-panel .card {
  border: none;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease;
}
.right-panel .card:hover {
  transform: translateY(-3px);
}
.progress {
  border-radius: 20px;
  overflow: hidden;
  background-color: #e0e0e0;
}
.progress-bar {
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  transition: width 0.4s ease;
}
.calendar-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px 8px;
  margin-top: 8px;
}
.calendar-day {
  background-color: #dfefff;
  border-radius: 6px;
  text-align: center;
  height: 42px;
  font-size: 0.63rem;
  color: #003366;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.day-name {
  font-weight: 600;
}
.day-number {
  font-size: 0.58rem;
  font-weight: 400;
  color: #555;
  margin-top: 2px;
}
.calendar-day.today {
  background-color: #ffd700;
  border: 1px solid #ffd700;
  color: #222;
  font-weight: bold;
}
.calendar-day.birthday {
  background-color: #ffe0f0 !important;
  border: 1px solid #ff69b4;
  color: #ad1457;
}
.calendar-day.today.birthday {
  background-image: linear-gradient(135deg, #ffd700 50%, #3c3f75 50%);
  border: 1.5px solid #ffd700;
  color: #222; /* Updated: text color for today+birthday */
}
.calendar-event {
  font-size: 0.63rem;
  background-color: #ccf5ff;
  border-radius: 6px;
  color: #005c99;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 5px;
}
.calendar-event.marked {
  background-color: #c6f6d5;
  color: #006644;
  font-weight: bold;
  cursor: pointer;
}
.calendar-event.empty {
  display: none;
}
.next-week-wrapper {
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
}
.next-week,
.prev-week {
  background-color: #c6f6d5;
  color: #006644;
  font-weight: bold;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.next-week:hover,
.prev-week:hover {
  background-color: #a4ecc2;
}
.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}
.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}
.btn-outline-success {
  border-color: #28a745;
  color: #28a745;
}
.btn-outline-success:hover {
  background-color: #28a745;
  color: #fff;
}
.list-group-item {
  border: none;
  background-color: #f8faff;
  margin-bottom: 5px;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}
.list-group-item:hover {
  background-color: #e6f0ff;
}
.right-panel::-webkit-scrollbar {
  width: 6px;
}
.right-panel::-webkit-scrollbar-thumb {
  background-color: #a2c2d1;
  border-radius: 3px;
}
.right-panel > * {
  border-radius: 0 !important;
  margin-right: 0;
}
@media (max-width: 768px) {
  .right-panel {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    height: auto;
    padding: 10px;
    border-left: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}
body.dark-mode .right-panel {
  background: #111 !important;
  color: #f0f0f0;
  border-left: 1px solid #222;
}
body.dark-mode .right-panel .card {
  background: #111 !important;
  color: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
body.dark-mode .calendar-day {
  background-color: #222;
  color: #e0e0e0;
  border: 1px solid #444;
}
body.dark-mode .calendar-day.today {
  background-color: #ffd700;
  border: 1px solid #ffd700;
  color: #222;
  font-weight: bold;
}
body.dark-mode .calendar-event,
body.dark-mode .calendar-event.marked,
body.dark-mode .next-week,
body.dark-mode .prev-week {
  background-color: #222;
  color: #fff;
  border: none;
}
body.dark-mode .list-group-item {
  background-color: #181818 !important;
  color: #fff !important;
}
body.dark-mode .right-panel .card .text-muted,
body.dark-mode .right-panel .card .small {
  color: #bbb !important;
}
body.dark-mode .right-panel .card .fw-bold {
  color: #fff !important;
}
`;

// Inject merged CSS
if (typeof document !== 'undefined' && !document.getElementById('merged-feed-css')) {
  const style = document.createElement('style');
  style.id = 'merged-feed-css';
  style.innerHTML = mergedCss;
  document.head.appendChild(style);
}

// --- MainContent ---
const shareOptions = [
  { name: 'Instagram', icon: '📸' },
  { name: 'Snapchat', icon: '👻' },
  { name: 'WhatsApp', icon: '💬' },
  { name: 'Facebook', icon: '📘' },
];
const emojiList = ['👍', '❤️', '😂', '🎉', '😮'];
const currentUser = { name: 'Current User', initials: 'CU' };

function MainContent({ darkMode}) {
  const [comments, setComments] = useState({});
  const [replies, setReplies] = useState({});
  const [showComments, setShowComments] = useState({});
  const [showReplies, setShowReplies] = useState({});
  const [showShare, setShowShare] = useState(null);

  const [newPostContent, setNewPostContent] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [newPostTags, setNewPostTags] = useState('');
  const [newPostAttachment, setNewPostAttachment] = useState(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Alison Hata',
      initials: 'AH',
      content: 'Alison just completed 2 years in the company. Congratulate her!',
      image: null,
      likes: 24,
      comments: [],
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      user: 'Harith Swanson',
      initials: 'HS',
      content: 'Thanks for leading one of the most productive design sprints ever, Rosia...',
      image: 'images/group-discussion.jpeg',
      points: 200,
      recipient: 'Rosia Thorpe',
      likes: 42,
      comments: [
        {
          id: 1,
          user: 'Clarence Gale',
          initials: 'CG',
          content: 'Had an amazing experience working on the sprint...',
          replies: []
        }
      ],
      isLiked: true,
      isSaved: false
    }
  ]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isSaved: !post.isSaved }
        : post
    ));
  };

  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    const newComment = comments[postId]?.trim();
    if (!newComment) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newCommentObj = {
          id: Date.now(),
          user: currentUser.name,
          initials: currentUser.initials,
          content: newComment,
          replies: []
        };
        return { ...post, comments: [...post.comments, newCommentObj] };
      }
      return post;
    });

    setPosts(updatedPosts);
    setComments(prev => ({ ...prev, [postId]: '' }));
  };

  const handleReplySubmit = (e, postId, commentId) => {
    e.preventDefault();
    const newReply = replies[`${postId}-${commentId}`]?.trim();
    if (!newReply) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.comments.map(comment => {
          if (comment.id === commentId) {
            const newReplyObj = {
              id: Date.now(),
              user: currentUser.name,
              initials: currentUser.initials,
              content: newReply
            };
            return {
              ...comment,
              replies: [...comment.replies, newReplyObj]
            };
          }
          return comment;
        });
        return { ...post, comments: updatedComments };
      }
      return post;
    });

    setPosts(updatedPosts);
    setReplies(prev => ({ ...prev, [`${postId}-${commentId}`]: '' }));
    setShowReplies(prev => ({ ...prev, [`${postId}-${commentId}`]: false }));
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleReplyInput = (postId, commentId) => {
    const key = `${postId}-${commentId}`;
    setShowReplies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShareClick = (postId) => {
    setShowShare(showShare === postId ? null : postId);
  };

  const handleNewPostSubmit = () => {
    if (!newPostContent.trim()) return;
    const newPost = {
      id: Date.now(),
      user: currentUser.name,
      initials: currentUser.initials,
      content: newPostContent,
      image: newPostImage ? URL.createObjectURL(newPostImage) : null,
      tags: newPostTags,
      attachment: newPostAttachment ? newPostAttachment.name : null,
      likes: 0,
      comments: [],
      isLiked: false,
      isSaved: false
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
    setNewPostTags('');
    setNewPostAttachment(null);
    setShowNewPostModal(false);
  };

  // Add handlers for edit, delete, report
  const handleEdit = (postId) => {
    // Implement your edit logic here
    alert(`Edit post ${postId}`);
    setOptionsPostId(null);
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    setOptionsPostId(null);
  };

  const handleReport = (postId) => {
    alert(`Reported post ${postId}`);
    setOptionsPostId(null);
  };

  const [optionsPostId, setOptionsPostId] = useState(null);

  return (
    <div className="main-content" style={{margin:'0% 3%', padding:'3% 0%', scrollbarWidth:'none', width: 'auto'}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="feed-header">Feed</h4>
        <div>
          <button className="btn btn-success me-2" onClick={() => setShowNewPostModal(true)}>
            <Plus className="me-1" /> Post
          </button>
        </div>
      </div>

      {posts.map(post => (
        <Card key={post.id} className="mb-3 feed-card">
          <Card.Body>
            <div className="d-flex justify-content-between mb-2 flex-wrap">
              <div className="d-flex align-items-center flex-wrap">
                <div className="avatar me-2">{post.initials}</div>
                <strong>{post.user}</strong>
                {post.points && (
                  <>
                    <span className="mx-2">gave</span>
                    <Badge bg="warning" text="dark" className="points-badge">{post.points} points</Badge>
                    <span className="mx-2">to</span>
                    <strong>{post.recipient}</strong>
                  </>
                )}
              </div>
              <Dropdown show={optionsPostId === post.id} onToggle={() => setOptionsPostId(optionsPostId === post.id ? null : post.id)}>
                <Dropdown.Toggle as={Button} variant="link" className="p-0">
                  <ThreeDots />
                </Dropdown.Toggle>
                <Dropdown.Menu align="end">
                  {post.user === currentUser.name ? (
                    <>
                      <Dropdown.Item onClick={() => handleEdit(post.id)}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleDelete(post.id)}>Delete</Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item onClick={() => handleReport(post.id)}>Report</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Card.Text>{post.content}</Card.Text>
            {post.tags && <div className="mb-2"><small className="text-muted">Tags: {post.tags}</small></div>}
            {post.attachment && <div className="mb-2"><small className="text-muted">Attachment: {post.attachment}</small></div>}
            {post.image && (
              <div className="post-image mb-3">
                <img src={post.image} alt="Post" className="img-fluid rounded" />
              </div>
            )}

            <div className="d-flex justify-content-between post-actions flex-wrap">
              <div className="d-flex flex-wrap">
                <Button variant="link" className="p-0 me-3 action-btn" onClick={() => handleLike(post.id)}>
                  {post.isLiked ? <HeartFill className="text-danger" /> : <Heart />}
                  <span className="ms-1">{post.likes}</span>
                </Button>
                <Button variant="link" className="p-0 me-3 action-btn" onClick={() => toggleComments(post.id)}>
                  <Chat />
                  <span className="ms-1">{post.comments.length}</span>
                </Button>
                <Button variant="link" className="p-0 action-btn" onClick={() => handleShareClick(post.id)}>
                  <Share />
                </Button>
              </div>
              <Button
                variant="link"
                className="p-0 action-btn"
                onClick={() => handleSave(post.id)}
                style={{
                  color: post.isSaved
                    ? (darkMode ? "#FFD700" : "#007bff") // Gold in dark mode, blue in light mode
                    : (darkMode ? "#cccccc" : "#888")
                }}
              >
                {post.isSaved ? <BookmarkFill /> : <Bookmark />}
              </Button>
            </div>

            {showShare === post.id && (
              <div className="custom-share-dropdown mb-3 p-3">
                {shareOptions.map(option => (
                  <Button key={option.name} variant="light" size="sm" className="custom-share-btn me-2 mb-2">
                    <span className="me-2">{option.icon}</span> Share on {option.name}
                  </Button>
                ))}
              </div>
            )}

            {showComments[post.id] && (
              <div className="comments-section mt-3">
                <Form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="mb-3">
                  <div className="d-flex flex-column flex-md-row gap-2">
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Write a comment"
                      className="comment-box w-100"
                      value={comments[post.id] || ''}
                      onChange={(e) =>
                        setComments(prev => ({ ...prev, [post.id]: e.target.value }))
                      }
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      disabled={!comments[post.id]?.trim()}
                      className="align-self-end"
                    >
                      Post
                    </Button>
                  </div>
                </Form>

                {post.comments.map(comment => (
                  <div key={comment.id} className="comment mb-3">
                    <div className="d-flex align-items-start">
                      <div className="avatar me-2">{comment.initials}</div>
                      <div className="flex-grow-1">
                        <strong>{comment.user}</strong>
                        <Card.Text className="mb-1">{comment.content}</Card.Text>

                        <div className="emoji-reactions my-1">
                          {emojiList.map((emoji, index) => (
                            <Button key={index} variant="light" size="sm" className="me-1 emoji-btn">
                              {emoji}
                            </Button>
                          ))}
                        </div>

                        <Button variant="link" size="sm" className="p-0 btn-link" onClick={() => toggleReplyInput(post.id, comment.id)}>
                          Reply
                        </Button>

                        {showReplies[`${post.id}-${comment.id}`] && (
                          <Form onSubmit={(e) => handleReplySubmit(e, post.id, comment.id)} className="mt-2">
                            <Form.Control
                              size="sm"
                              placeholder="Write a reply"
                              className="comment-box mb-2"
                              value={replies[`${post.id}-${comment.id}`] || ''}
                              onChange={(e) =>
                                setReplies(prev => ({
                                  ...prev,
                                  [`${post.id}-${comment.id}`]: e.target.value
                                }))
                              }
                            />
                            <Button type="submit" variant="secondary" size="sm" disabled={!replies[`${post.id}-${comment.id}`]?.trim()}>
                              Reply
                            </Button>
                          </Form>
                        )}

                        {comment.replies.length > 0 && comment.replies.map(reply => (
                          <div key={reply.id} className="mt-2 ms-4 comment">
                            <div className="d-flex align-items-start">
                              <div className="avatar me-2">{reply.initials}</div>
                              <div>
                                <strong>{reply.user}</strong>
                                <Card.Text className="mb-0">{reply.content}</Card.Text>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card.Body>
        </Card>
      ))}

      <Modal show={showNewPostModal} onHide={() => setShowNewPostModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => setNewPostImage(e.target.files[0])} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tags (comma separated)</Form.Label>
            <Form.Control type="text" value={newPostTags} onChange={(e) => setNewPostTags(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Attachment</Form.Label>
            <Form.Control type="file" onChange={(e) => setNewPostAttachment(e.target.files[0])} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewPostModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleNewPostSubmit} disabled={!newPostContent.trim()}>Post</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// --- RightPanel ---
function generateWeeks() {
  const startDate = new Date(2025, 0, 1);
  const endDate = new Date(2025, 11, 31);
  let weeks = [];
  let current = startOfWeek(startDate, { weekStartsOn: 1 });

  while (isBefore(current, endDate)) {
    const week = Array.from({ length: 7 }, (_, i) => addDays(current, i));
    weeks.push(week);
    current = addWeeks(current, 1);
  }
  return weeks;
}

function RightPanel() {
  const today = new Date();
  const [points, setPoints] = useState(1284);
  const rewardGoal = 2000;

  const [birthdays, setBirthdays] = useState([
    { name: 'John', date: '2025-02-04' },
    { name: 'Aisha', date: '2025-07-27' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newBdayName, setNewBdayName] = useState('');
  const [newBdayDate, setNewBdayDate] = useState('');

  const allWeeks = generateWeeks();
  const initialWeekIndex = allWeeks.findIndex(week =>
    isSameWeek(week[0], today, { weekStartsOn: 1 })
  );
  const [currentWeekIndex, setCurrentWeekIndex] = useState(
    initialWeekIndex === -1 ? 0 : initialWeekIndex
  );
  const currentWeek = allWeeks[currentWeekIndex];
  const currentMonth = format(currentWeek[0], 'MMMM yyyy');
  const progress = Math.min(Math.round((points / rewardGoal) * 100), 100);

  const handleSend = () => {
    if (points >= 100) setPoints(points - 100);
  };

  const handleRedeem = () => {
    if (points >= 200) setPoints(points - 200);
  };

  const handleAddBirthday = () => {
    if (newBdayName && newBdayDate) {
      setBirthdays([...birthdays, { name: newBdayName, date: newBdayDate }]);
      setNewBdayName('');
      setNewBdayDate('');
      setShowModal(false);
    }
  };

  const birthdaysThisWeek = birthdays.filter(b =>
    currentWeek.some(d => isSameDay(parseISO(b.date), d))
  );

  return (
    <div className="right-panel p-3">
      {/* Points Section */}
      <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center my-2">
            <h6 className="mb-0 fw-semibold">Your Points</h6>
            <Badge
              bg="primary"
              className="rounded-pill fs-3 px-4 py-2 text-white d-flex align-items-center gap-2"
            >
              <FaGem style={{ color: '#00cfff' }} />
              <CountUp end={points} duration={1.5} />
            </Badge>
          </div>
          <div className="mb-2">
            <ProgressBar now={progress} variant="success" style={{ height: '8px' }} />
            <small className="text-muted">Reward goal: {rewardGoal} pts</small>
          </div>
          <div className="d-flex mt-2">
            <button className="btn btn-sm btn-outline-primary me-2" onClick={handleSend}>
              SEND
            </button>
            <button className="btn btn-sm btn-outline-success" onClick={handleRedeem}>
              REDEEM
            </button>
          </div>
        </Card.Body>
      </Card>

      {/* Calendar Section */}
      <Card className="mb-3">
        <Card.Body>
          <h6 className="text-muted">{currentMonth}</h6>
          <div className="calendar-grid">
            {currentWeek.map((date) => {
              const dayName = format(date, 'EEE');
              const dayNumber = format(date, 'd');
              const isToday = isSameDay(date, today);
              const hasBirthday = birthdays.some(b => isSameDay(parseISO(b.date), date));

              return (
                <div
                  key={date.toString()}
                  className={`calendar-day ${isToday ? 'today' : ''} ${hasBirthday ? 'birthday' : ''}`}
                >
                  <div className="day-name">{dayName.toUpperCase()}</div>
                  <div className="day-number">
                    {dayNumber} {hasBirthday && '🎂'}
                  </div>
                </div>
              );
            })}

            <div
              className="calendar-event marked"
              role="button"
              onClick={() => setShowModal(true)}
            >
              <FaBirthdayCake className="m-1" style={{ color: '#ff69b4' }} />
              Birthdays
            </div>
          </div>

          {birthdaysThisWeek.length > 0 && (
            <div className="mt-2">
              <small className="text-muted">This Week:</small>
              <ul className="ms-3 mt-1">
                {birthdaysThisWeek.map((b, i) => (
                  <li key={i} className="small">
                    {b.name} — {format(parseISO(b.date), 'do MMM')}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Navigation */}
          <div className="next-week-wrapper d-flex justify-content-between mt-2">
            {currentWeekIndex > 0 && (
              <div
                className="calendar-event marked"
                role="button"
                onClick={() => setCurrentWeekIndex(i => i - 1)}
              >
                ← Prev Week
              </div>
            )}
            {currentWeekIndex < allWeeks.length - 1 && (
              <div
                className="calendar-event marked ms-auto"
                role="button"
                onClick={() => setCurrentWeekIndex(i => i + 1)}
              >
                Next Week →
              </div>
            )}
          </div>

          <div className="mt-2">
            <small className="text-muted">Work anniversary</small>
          </div>
        </Card.Body>
      </Card>

      {/* Meetings */}
      <Card className="mb-3">
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div>
                <FaUser size={18} style={{ color: '#6f42c1' }} />{' '}
                <strong>Weekly Review Meeting</strong>
                <div className="text-muted small">11:00 am - 12:00 pm</div>
              </div>
              <Badge bg="light" text="dark">
                +6 attending
              </Badge>
            </ListGroup.Item>

            <ListGroup.Item>
              <strong>Client Meeting - RAB</strong>
              <div className="text-muted small">01:00 pm - 02:00 pm</div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Events */}
      <Card>
        <Card.Body>
          <h6>
            <FaCalendar className="m-2" style={{ color: '#20c997' }} />
            Upcoming Events
          </h6>

          <ListGroup variant="flush">
            <ListGroup.Item>
              <div className="d-flex justify-content-between">
                <span>Team Building Workshop</span>
                <small className="text-muted">15 Oct</small>
              </div>
              <small className="text-muted">10:00 AM - 2:00 PM</small>
            </ListGroup.Item>

            <ListGroup.Item>
              <div className="d-flex justify-content-between">
                <span>Employee of the Month Award</span>
                <small className="text-muted">20 Oct</small>
              </div>
              <small className="text-muted">3:00 PM - 4:30 PM</small>
            </ListGroup.Item>

            <ListGroup.Item>
              <div className="d-flex justify-content-between">
                <span>Diversity and Inclusion Seminar</span>
                <small className="text-muted">5 Nov</small>
              </div>
              <small className="text-muted">9:30 AM - 12:00 PM</small>
            </ListGroup.Item>

            <ListGroup.Item className="fw-bold">
              <div className="d-flex justify-content-between">
                <span>Town Hall Meeting</span>
                <small className="text-muted">10 Nov</small>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Birthday</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={newBdayName}
              onChange={(e) => setNewBdayName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={newBdayDate}
              onChange={(e) => setNewBdayDate(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddBirthday}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// --- MergedFeed Layout ---
function MergedFeed() {
  const [darkMode, setDarkMode] = useState(false);

  // Set background and border color based on darkMode
  const mainBg = darkMode ? "#181818" : "#f8faff";
  const borderColor = darkMode ? "#222" : "#e0e0e0";

  return (
    <div
      className="app-container d-flex flex-nowrap"
      style={{
        minHeight: '100vh',
        // width: '100vw',
        overflowX: 'hidden',
        background: mainBg,
        transition: 'background 0.3s',
        marginTop: 0, // Remove any margin at the top
        paddingTop: 0 // Remove any padding at the top
      }}
    >
      <div
        className="flex-grow-1"
        style={{
          flex: '1 1 65%',
          minWidth: 0,
          maxWidth: 'calc(100vw - 320px)',
          // padding: '24px 0 24px 0'
        }}
      >
        <MainContent darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <div
        className="right-panel"
        style={{
          flex: '0 0 320px',
          maxWidth: 320,
          // minWidth: 320,
          height: '100vh',
          borderLeft: `1px solid ${borderColor}`,
          background: mainBg,
          transition: 'background 0.3s, border-color 0.3s',
          overflowY: 'hidden',
        }}
      >
        <RightPanel />
      </div>
    </div>
  );
}

export default MergedFeed;