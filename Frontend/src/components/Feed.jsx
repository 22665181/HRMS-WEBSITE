import React, { useState } from 'react';
import { Card, Badge, Button, Form, ListGroup } from 'react-bootstrap';
import { Heart, HeartFill, Chat, Share, Bookmark, BookmarkFill, ThreeDots } from 'react-bootstrap-icons';

const Feed = () => {
  // Posts data
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Alison Hata',
      initials: 'AH',
      content: 'Alison just completed 2 years in the company. Congratulate her!',
      image: null,
      likes: 24,
      comments: 5,
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      user: 'Harith Swanson',
      initials: 'HS',
      content: 'Thanks for leading one of the most productive design sprints ever, Rosia. Great win for the team.',
      image: '/images/group-discussion.jpeg',
      points: 200,
      recipient: 'Rosia Thorpe',
      likes: 42,
      comments: 3,
      isLiked: true,
      isSaved: false
    },
    {
      id: 3,
      user: 'Travel Enthusiast',
      initials: 'TE',
      content: 'Beautiful sunset views from our last team retreat!',
      image: '/images/sunset.jpeg',
      likes: 87,
      comments: 12,
      isLiked: false,
      isSaved: true
    }
  ]);

  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Clarence Gale',
      initials: 'CG',
      content: 'Had an amazing experience working with Rosia.'
    }
  ]);

  const [newComment, setNewComment] = useState('');

  // Handlers
  const handleLike = (postId) => {
    setPosts(posts.map(post => ({
      ...post,
      isLiked: post.id === postId ? !post.isLiked : post.isLiked,
      likes: post.id === postId ? (post.isLiked ? post.likes - 1 : post.likes + 1) : post.likes
    })));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => ({
      ...post,
      isSaved: post.id === postId ? !post.isSaved : post.isSaved
    })));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, {
        id: comments.length + 1,
        user: 'Current User',
        initials: 'CU',
        content: newComment
      }]);
      setNewComment('');
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#ffffff'
    }}>
      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '15px 20px 10px',
        backgroundColor: '#ffffff',
        overflowY: 'auto'
      }}>
        <h4 style={{
          fontWeight: 600,
          color: '#333',
          marginBottom: '15px'
        }}>Feed</h4>
        
        {posts.map(post => (
          <Card key={post.id} style={{
            borderRadius: '10px',
            border: '1px solid #e9ecef',
            boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
            marginBottom: '15px'
          }}>
            <Card.Body style={{ padding: '12px 16px' }}>
              {/* Post Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    backgroundColor: '#f0f2f5',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    color: '#495057',
                    marginRight: '10px'
                  }}>{post.initials}</div>
                  <strong>{post.user}</strong>
                  {post.points && (
                    <>
                      <span style={{ margin: '0 8px' }}>gave</span>
                      <Badge bg="warning" text="dark" style={{
                        fontSize: '0.8rem',
                        padding: '0.35em 0.65em'
                      }}>
                        {post.points} points
                      </Badge>
                      <span style={{ margin: '0 8px' }}>to</span>
                      <strong>{post.recipient}</strong>
                    </>
                  )}
                </div>
                <Button variant="link" style={{ padding: 0 }}>
                  <ThreeDots />
                </Button>
              </div>

              {/* Post Content */}
              <Card.Text style={{ marginBottom: post.image ? '6px' : '12px', fontSize: '0.95rem' }}>
                {post.content}
              </Card.Text>

              {/* Post Image */}
              {post.image && (
                <div style={{
                  maxHeight: '500px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  marginBottom: '12px'
                }}>
                  <img src={post.image} alt="Post content" style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover'
                  }} />
                </div>
              )}

              {/* Like/Comment/Share Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 0',
                borderTop: '1px solid #e9ecef',
                borderBottom: '1px solid #e9ecef',
                margin: '12px 0'
              }}>
                <div style={{ display: 'flex' }}>
                  <Button 
                    variant="link" 
                    style={{
                      padding: 0,
                      marginRight: '16px',
                      color: '#495057',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.9rem'
                    }}
                    onClick={() => handleLike(post.id)}
                  >
                    {post.isLiked ? (
                      <HeartFill style={{ color: '#dc3545', marginRight: '4px' }} />
                    ) : (
                      <Heart style={{ marginRight: '4px' }} />
                    )}
                    <span>{post.likes}</span>
                  </Button>
                  <Button 
                    variant="link" 
                    style={{
                      padding: 0,
                      marginRight: '16px',
                      color: '#495057',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Chat style={{ marginRight: '4px' }} />
                    <span>{post.comments}</span>
                  </Button>
                  <Button 
                    variant="link" 
                    style={{
                      padding: 0,
                      color: '#495057',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.9rem'
                    }}
                  >
                    <Share style={{ marginRight: '4px' }} />
                  </Button>
                </div>
                <Button 
                  variant="link" 
                  style={{
                    padding: 0,
                    color: '#495057',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.9rem'
                  }}
                  onClick={() => handleSave(post.id)}
                >
                  {post.isSaved ? (
                    <BookmarkFill style={{ color: '#212529' }} />
                  ) : (
                    <Bookmark />
                  )}
                </Button>
              </div>

              {/* Comments Section */}
              {post.id === 2 && (
                <div style={{ marginTop: '12px' }}>
                  <Form onSubmit={handleCommentSubmit} style={{ marginBottom: '12px' }}>
                    <Form.Control 
                      as="textarea" 
                      rows={2} 
                      placeholder="Write a comment" 
                      style={{
                        borderRadius: '18px',
                        backgroundColor: '#f8f9fa',
                        border: 'none',
                        resize: 'none',
                        fontSize: '0.9rem',
                        padding: '8px 12px'
                      }}
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="sm" 
                      style={{ marginTop: '6px', float: 'right', padding: '4px 12px' }}
                      disabled={!newComment.trim()}
                    >
                      Post
                    </Button>
                  </Form>
                  {comments.map(comment => (
                    <div key={comment.id} style={{
                      borderLeft: '2px solid #e9ecef',
                      paddingLeft: '12px',
                      marginBottom: '6px'
                    }}>
                      <div style={{ display: 'flex' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          backgroundColor: '#f0f2f5',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          color: '#495057',
                          marginRight: '10px',
                          fontSize: '0.8rem'
                        }}>{comment.initials}</div>
                        <div style={{ fontSize: '0.9rem' }}>
                          <strong>{comment.user}</strong>
                          <p style={{ marginBottom: 0 }}>{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        ))}

        {/* Asma Khouri Birthday Card - Moved to bottom */}
        <Card style={{
          borderRadius: '10px',
          border: '1px solid #e9ecef',
          boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
          marginBottom: '15px'
        }}>
          <Card.Body style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '36px',
                height: '36px',
                backgroundColor: '#f0f2f5',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                color: '#495057',
                marginRight: '10px'
              }}>AK</div>
              <div>
                <strong>Asma Khouri</strong>
                <p style={{ marginBottom: 0, fontSize: '0.9rem' }}>+6 more wished Asma a happy birthday. Wish her now!</p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '300px',
        padding: '15px 20px 10px',
        backgroundColor: '#ffffff',
        height: '100vh',
        overflowY: 'auto',
        position: 'sticky',
        top: 0,
        borderLeft: '1px solid #e9ecef'
      }}>
        {/* Points Section */}
        <Card style={{
          borderRadius: '8px',
          marginBottom: '15px',
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Card.Body style={{ padding: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.9rem' }}>Your Points</span>
              <Badge bg="primary" pill>1284</Badge>
            </div>
            <div style={{ display: 'flex', marginTop: '6px' }}>
              <Button variant="outline-primary" size="sm" style={{ marginRight: '8px', padding: '4px 8px', fontSize: '0.8rem' }}>SEND</Button>
              <Button variant="outline-success" size="sm" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>REDEEM</Button>
            </div>
          </Card.Body>
        </Card>

        {/* Calendar Section */}
        <Card style={{
          borderRadius: '8px',
          marginBottom: '15px',
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Card.Body style={{ padding: '12px' }}>
            <h6 style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '8px' }}>February</h6>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '5px',
              margin: '8px 0'
            }}>
              {['MON 7', 'TUE 8', 'WED 9', 'THU 10', 'FRI 11'].map(day => (
                <div key={day} style={{
                  fontSize: '0.75rem',
                  textAlign: 'center',
                  padding: '4px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px'
                }}>
                  {day}
                </div>
              ))}
              <div style={{
                fontSize: '0.7rem',
                textAlign: 'center',
                padding: '3px',
                gridColumn: 'span 1',
                backgroundColor: '#e9f5ff',
                borderRadius: '4px',
                marginTop: '4px'
              }}>Birthdays</div>
              <div style={{
                fontSize: '0.7rem',
                textAlign: 'center',
                padding: '3px',
                gridColumn: 'span 1',
                backgroundColor: 'transparent',
                borderRadius: '4px',
                marginTop: '4px'
              }}></div>
              <div style={{
                fontSize: '0.7rem',
                textAlign: 'center',
                padding: '3px',
                gridColumn: 'span 1',
                backgroundColor: 'transparent',
                borderRadius: '4px',
                marginTop: '4px'
              }}></div>
              <div style={{
                fontSize: '0.7rem',
                textAlign: 'center',
                padding: '3px',
                gridColumn: 'span 1',
                backgroundColor: 'transparent',
                borderRadius: '4px',
                marginTop: '4px'
              }}></div>
              <div style={{
                fontSize: '0.7rem',
                textAlign: 'center',
                padding: '3px',
                gridColumn: 'span 1',
                backgroundColor: '#d4edda',
                borderRadius: '4px',
                marginTop: '4px'
              }}>X</div>
            </div>
            <div style={{ marginTop: '6px' }}>
              <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>Work anniversary</small>
            </div>
          </Card.Body>
        </Card>

        {/* Meetings Section */}
        <Card style={{
          borderRadius: '8px',
          marginBottom: '15px',
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Card.Body style={{ padding: '12px' }}>
            <ListGroup variant="flush">
              <ListGroup.Item style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid #eee',
                padding: '8px 0'
              }}>
                <div>
                  <strong style={{ fontSize: '0.9rem' }}>Weekly Review Meeting</strong>
                  <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>11:00 am - 12:00 pm</div>
                </div>
                <Badge bg="light" text="dark" style={{ fontSize: '0.75rem' }}>+6 attending</Badge>
              </ListGroup.Item>
              
              <ListGroup.Item style={{ padding: '8px 0' }}>
                <strong style={{ fontSize: '0.9rem' }}>Client Meeting - RAB</strong>
                <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>01:00 pm - 02:00 pm</div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>

        {/* Upcoming Events Section */}
        <Card style={{
          borderRadius: '8px',
          marginBottom: '15px',
          border: 'none',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <Card.Body style={{ padding: '12px' }}>
            <h6 style={{ color: '#6c757d', fontSize: '0.9rem', marginBottom: '8px' }}>Upcoming Events</h6>
            <ListGroup variant="flush">
              <ListGroup.Item style={{
                padding: '8px 0',
                borderBottom: '1px solid #eee'
              }}>
                <strong style={{ fontSize: '0.9rem' }}>Team Building Workshop</strong>
                <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>10:00 AM - 2:00 PM</div>
                <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>15 Oct</div>
              </ListGroup.Item>
              <ListGroup.Item style={{
                padding: '8px 0',
                borderBottom: '1px solid #eee'
              }}>
                <strong style={{ fontSize: '0.9rem' }}>Employee of the Month Award</strong>
                <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>3:00 PM - 4:30 PM</div>
                <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>20 Oct</div>
              </ListGroup.Item>
              <ListGroup.Item style={{
                padding: '8px 0',
                borderBottom: '1px solid #eee'
              }}>
                <strong style={{ fontSize: '0.9rem' }}>Diversity and Inclusion Seminar</strong>
                <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>9:30 AM - 12:00 PM</div>
                <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>5 Nov</div>
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: '8px 0' }}>
                <strong style={{ fontSize: '0.9rem' }}>Town Hall Meeting</strong>
                <div style={{ color: '#6c757d', fontSize: '0.8rem' }}>10 Nov</div>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Feed;