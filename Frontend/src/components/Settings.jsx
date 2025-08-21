import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Modal, Button, Form } from 'react-bootstrap';
import {
  FaBell, FaMoon, FaStar, FaShareAlt, FaLock, FaFileAlt,
  FaCookieBite, FaEnvelope, FaComment, FaSignOutAlt
} from 'react-icons/fa';
import { Toast } from 'react-bootstrap';
import { useDarkMode } from './Recognition';


function Settings() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [modals, setModals] = useState({});
  const [notification, setNotification] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });


  const toggleModal = (modalName) => setModals({ ...modals, [modalName]: !modals[modalName] });

  const renderModal = (name, title, body) => (
    <Modal show={modals[name]} onHide={() => toggleModal(name)} centered>
      <Modal.Header closeButton><Modal.Title>{title}</Modal.Title></Modal.Header>
      <Modal.Body>{body}</Modal.Body>
    </Modal>
  );

  return (
    <div className={`${isDarkMode ? 'dark-mode' : ''} ${modals && Object.values(modals).some(Boolean) ? 'blurred-bg' : ''} min-vh-100`} style={{ backgroundColor: isDarkMode ? '#121212' : 'transparent' }}>
      <Container fluid className="settings-container" style={{overflowX:'hidden'}}>
        <Row className="justify-content-center">
          <Col lg={8}>
            <h3 className="settings-title" style={{ fontWeight: 'bold', color: isDarkMode ? '#ffffff' : '#333', textAlign: 'center', marginTop: '20px'}}>
              <u>Settings</u>
            </h3>
            <ListGroup variant="flush" className="settings-list mt-4">
              <ListGroup.Item className={`d-flex justify-content-between align-items-center py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <div className="d-flex align-items-center gap-3">
                  <FaBell className="text-primary" />
                  <span className="fw-medium">Notification</span>
                </div>
                <Form.Check type="switch" checked={notification} onChange={() => setNotification(!notification)} />
              </ListGroup.Item>
              <ListGroup.Item className={`d-flex justify-content-between align-items-center py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <div className="d-flex align-items-center gap-3">
                  <FaMoon className="text-primary" />
                  <span className="fw-medium">Dark Mode</span>
                </div>
                <Form.Check type="switch" checked={isDarkMode} onChange={toggleDarkMode} />
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('rateApp')} className={`d-flex align-items-center gap-3 py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <FaStar className="text-primary" />
                <span className="fw-medium">Rate App</span>
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('shareApp')} className={`d-flex align-items-center gap-3 py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <FaShareAlt className="text-primary" />
                <span className="fw-medium">Share App</span>
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('privacyPolicy')} className={`d-flex align-items-center gap-3 py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <FaLock className="text-primary" />
                <span className="fw-medium">Privacy Policy</span>
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('terms')} className={`d-flex align-items-center gap-3 py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <FaFileAlt className="text-primary" />
                <span className="fw-medium">Terms and Conditions</span>
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('cookies')} className={`d-flex align-items-center gap-3 py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <FaCookieBite className="text-primary" />
                <span className="fw-medium">Cookies Policy</span>
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('contact')} className={`d-flex align-items-center gap-3 py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <FaEnvelope className="text-primary" />
                <span className="fw-medium">Contact</span>
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => toggleModal('feedback')} className={`d-flex align-items-center gap-3 py-3 border-bottom ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`}>
                <FaComment className="text-primary" />
                <span className="fw-medium">Feedback</span>
              </ListGroup.Item>
              <ListGroup.Item action className={`d-flex align-items-center gap-3 py-3 text-danger ${isDarkMode ? 'bg-dark border-secondary' : ''}`} onClick={() => toggleModal('logout')}>
                <FaSignOutAlt className="text-danger" />
                <span className="fw-medium">Logout</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        {/* Modals */}
        {renderModal('rateApp', 'Rate App', (
          <div>
            {[1, 2, 3, 4, 5].map((n) => (
              <FaStar
                key={n}
                className="me-2"
                style={{
                  color: n <= (modals.ratingValue || 0) ? '#ffc107' : '#ccc',
                  fontSize: '24px',
                  cursor: 'pointer',
                }}
                onClick={() => setModals({ ...modals, ratingValue: n })}
              />
            ))}
            <Button
              className="mt-3"
              onClick={() => {
                setToast({ show: true, message: `Thank you for rating us ${modals.ratingValue || 0} stars!` });
                toggleModal('rateApp');
              }}  >Submit
            </Button>
          </div>
        ))}

        {renderModal('shareApp', 'Share App', (
          <div>
            <p>Select a platform to share:</p>
            <Button variant="outline-secondary" className="me-2">WhatsApp</Button>
            <Button variant="outline-primary" className="me-2">Facebook</Button>
            <Button variant="outline-info">Telegram</Button>
          </div>
        ))}

        {renderModal('privacyPolicy', 'Privacy Policy', <p><div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <p>At <b>UPTOSKILLS</b>, your privacy is our top priority. Our HRMS-SOCIAL-CONNECT platform ensures that personal and professional information is handled with utmost care and in compliance with data protection standards.</p>
          <ul>
            <li>🔐 No sharing of personal data with third parties.</li>
            <li>📊 Data is collected only to enhance employee engagement and HR functionality.</li>
            <li>🔒 All communication is encrypted and secure.</li>
            <li>🛡️ Employees have full control over their shared data.</li>
          </ul>
          <p>For more information, contact us at <a href="mailto:privacy@uptoskills.com">privacy@uptoskills.com</a></p>
        </div>
        </p>)}
        {renderModal('terms', 'Terms and Conditions', <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <p>By using <b>UPTOSKILLS - HRMS-SOCIAL-CONNECT</b>, users agree to the following terms:</p>
          <ul>
            <li>✔️ The platform is intended solely for internal professional use.</li>
            <li>❌ Misuse or sharing of inappropriate content is prohibited.</li>
            <li>📌 Access may be monitored to ensure ethical usage.</li>
            <li>⚠️ Violation of terms may result in access restriction or legal action.</li>
          </ul>
          <p>Continued use of the platform implies acceptance of these terms and any future updates.</p>
        </div>
        )}
        {renderModal('cookies', 'Cookies Policy', <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <p><b>UPTOSKILLS</b> uses cookies to improve user experience on the HRMS-SOCIAL-CONNECT platform:</p>
          <ul>
            <li>🍪 Remember login and preferences for seamless access.</li>
            <li>📈 Track non-personal analytics to optimize features.</li>
            <li>📊 Improve platform performance and responsiveness.</li>
          </ul>
          <p>We do <b>not</b> use cookies for advertising or third-party tracking. You can disable cookies in your browser settings, but some features may be limited.</p>
        </div>
        )}
        {renderModal('contact', 'Contact', <div>
          <p>📞 Have a question or need assistance? Reach out to us:</p>
          <ul>
            <li>📧 <b>Email:</b> <a href="mailto:support@uptoskills.com">support@uptoskills.com</a></li>
            <li>📱 <b>Phone:</b> +91 98765 43210</li>
            <li>🏢 <b>Office:</b> UPTOSKILLS Pvt. Ltd., Pune, Maharashtra</li>
            <li>🕐 <b>Support Hours:</b> Mon–Fri, 10:00 AM – 6:00 PM</li>
          </ul>
        </div>
        )}

        {renderModal('feedback', 'Feedback', (
          <Form onSubmit={(e) => {
            e.preventDefault();
            if (feedbackText.trim()) {
              setToast({ show: true, message: '✅ Thank you for your feedback!' });
              setFeedbackText('');
              toggleModal('feedback');
            } else {
              alert('Please enter feedback.');
            }
          }}>
            <Form.Group controlId="feedbackForm">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your feedback here..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </Form.Group>
            <Button className="mt-2" variant="primary" type="submit">Submit</Button>
          </Form>
        ))}

        {renderModal('logout', 'Logout Confirmation', (
          <>
            <p>Are you sure you want to logout?</p>
            <Button variant="danger" className="me-2">Yes, Logout</Button>
            <Button variant="secondary" onClick={() => toggleModal('logout')}>Cancel</Button>
          </>
        ))}
      </Container>

      <Toast
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        delay={3000}
        autohide
        bg="success"
        className="position-fixed top-0 end-0 m-3 text-white"
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">HRMS</strong>
        </Toast.Header>
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </div>
  );
}

export default Settings;
