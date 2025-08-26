import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

const DarkModeContext = React.createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) setIsDarkMode(JSON.parse(savedMode));
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => React.useContext(DarkModeContext);

const RecognitionForm = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    recipientName: '',
    department: '',
    employeeId: '',
    jobTitle: '',
    appreciationType: '',
    achievement: '',
    date: '',
    file: null,
    message: '',
    visibility: '',
    notify: false,
    allowComments: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Images for each step (replace URLs with your own if desired)
  const stepImages = [
    {
      src: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png", // Recipients
      alt: "Recipients",
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", // Appreciation
      alt: "Appreciation",
    },
    {
      src: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png", // Other Details
      alt: "Other Details",
    },
  ];

  return (
    <div className={`w-100 p-4 min-vh-100 ${isDarkMode ? 'bg-dark text-light' : 'bg-light'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-dark' : 'bg-white'} shadow-sm rounded px-4 py-3 mb-3 sticky-top`}>
        <div className="d-flex align-items-center justify-content-between mb-2">
          <div>
            <h2 className={`h4 fw-semibold mb-1 ${isDarkMode ? 'text-light' : ''}`}>Appreciate Peers</h2>
            <p className={`mb-0 small ${isDarkMode ? 'text-light opacity-75' : 'text-muted'}`}>Recognize, appreciate, reward — celebrate your exceptional peers</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            {/* Notification Icon */}
            <button className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-primary'} rounded-circle p-2`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{width: '20px', height: '20px'}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {/* User Profile */}
            <div className="d-flex align-items-center gap-2">
              <img
                src={`https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`}
                alt="User Avatar"
                className="rounded-circle border"
                style={{width: '32px', height: '32px'}}
              />
              <span className={`small fw-medium ${isDarkMode ? 'text-light opacity-75' : 'text-muted'}`}>user{Math.floor(Math.random()*100)}@mail.com</span>
            </div>
          </div>
        </div>
      </div>


      <div className="row align-items-start">
        {/* Left: Steps */}
        <div className={`${isMobile ? 'col-12' : 'col-md-3'} d-flex ${isMobile ? 'flex-row overflow-auto' : 'flex-column'} gap-4 ${isMobile ? 'mb-4' : 'mt-5'}`}>
          <StepOption
            active={step === 1}
            title="Recipients"
            subtitle="Pick a colleague"
          />
          <StepOption
            active={step === 2}
            title="Appreciation"
            subtitle="Why are you grateful?"
          />
          <StepOption
            active={step === 3}
            title="Other Details"
            subtitle="Visibility & more"
          />
        </div>
        {/* Right: Form */}
        <div className={`${isMobile ? 'col-12' : 'col-md-9'} d-flex flex-column`}>
          {/* Step Images */}
          <div className="d-flex justify-content-center gap-4 mb-4">
            {stepImages.map((img, idx) => (
              <div
                key={img.alt}
                className={`d-flex flex-column align-items-center transition-all shadow-sm rounded p-2 ${
                  step === idx + 1
                    ? `border border-primary ${isDarkMode ? 'bg-dark' : 'bg-light'} scale-110`
                    : `opacity-75 ${isDarkMode ? 'bg-dark' : ''}`
                }`}
                style={{ width: '90px', padding: '8px' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="object-fit-contain"
                  style={{width: '56px', height: '56px'}}
                />
                <span className={`mt-2 small fw-medium ${isDarkMode ? 'text-light opacity-75' : 'text-muted'}`}>{img.alt}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className={`${isDarkMode ? 'bg-dark' : 'bg-white'} shadow rounded p-5`} style={{minHeight: '180px'}}>
              <h3 className={`text-primary h5 fw-semibold mb-4 ${isDarkMode ? 'text-light' : ''}`}>Select the Recipient</h3>
              <input type="text" name="recipientName" placeholder="Recipient Name" onChange={handleChange} className={`form-control mb-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}} />
              <select name="department" onChange={handleChange} className={`form-select mb-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}}>
                <option value="" style={{color: isDarkMode ? '#adb5bd' : null}}>Select Department</option>
                <option>IT & Systems</option>
                <option>HR</option>
              </select>
              <div className="row mb-3">
                <div className="col">
                  <input type="text" name="employeeId" placeholder="Employee ID" onChange={handleChange} className={`form-control ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}} />
                </div>
                <div className="col">
                  <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} className={`form-control ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}} />
                </div>
              </div>
              <div className="text-center mt-4">
                <button onClick={nextStep} className="btn btn-primary px-4">Next Step</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={`${isDarkMode ? 'bg-dark' : 'bg-white'} shadow rounded p-5`} style={{minHeight: '180px'}}>
              <h3 className={`text-primary h5 fw-semibold mb-4 ${isDarkMode ? 'text-light' : ''}`}>Reason for Appreciation</h3>
              <select name="appreciationType" onChange={handleChange} className={`form-select mb-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}}>
                <option value="" style={{color: isDarkMode ? '#adb5bd' : null}}>Type of Appreciation</option>
                <option>Outstanding Work</option>
                <option>Team Support</option>
              </select>
              <input type="text" name="achievement" placeholder="Specific Achievement" onChange={handleChange} className={`form-control mb-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}} />
              <div className="row mb-3">
                <div className="col">
                  <input type="date" name="date" className={`form-control ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} onChange={handleChange} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}} />
                </div>
                <div className="col">
                  <input type="file" name="file" onChange={handleChange} className={`form-control ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}} />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button onClick={prevStep} className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-secondary'}`}>Back</button>
                <button onClick={nextStep} className="btn btn-primary">Next Step</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={`${isDarkMode ? 'bg-dark' : 'bg-white'} shadow rounded p-5`} style={{minHeight: '180px'}}>
              <h3 className={`text-primary h5 fw-semibold mb-4 ${isDarkMode ? 'text-light' : ''}`}>Add Context (Optional)</h3>
              <textarea name="message" maxLength={150} placeholder="Write a message" onChange={handleChange} className={`form-control mb-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{height: '100px', backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}}></textarea>
              <select name="visibility" onChange={handleChange} className={`form-select mb-3 ${isDarkMode ? 'bg-dark text-light border-secondary' : ''}`} style={{backgroundColor: isDarkMode ? '#2b3035' : '', color: isDarkMode ? '#fff' : '', '--bs-placeholder-color': isDarkMode ? '#adb5bd' : null}}>
                <option value="" style={{color: isDarkMode ? '#adb5bd' : null}}>Who can see this?</option>
                <option>Admin Only</option>
                <option>Everyone</option>
              </select>
              <div className="mb-3">
                <div className="form-check mb-2">
                  <input type="checkbox" name="notify" onChange={handleChange} className={`form-check-input ${isDarkMode ? 'bg-dark border-secondary' : ''}`} id="notify" />
                  <label className={`form-check-label ${isDarkMode ? 'text-light' : ''}`} htmlFor="notify">
                    Send notification to recipient
                  </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" name="allowComments" onChange={handleChange} className={`form-check-input ${isDarkMode ? 'bg-dark border-secondary' : ''}`} id="allowComments" />
                  <label className={`form-check-label ${isDarkMode ? 'text-light' : ''}`} htmlFor="allowComments">
                    Allow comments or replies
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button onClick={prevStep} className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-secondary'}`}>Back</button>
                <button onClick={() => alert("Recognition submitted!")} className="btn btn-primary">Send Appreciation</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Option component for left side
function StepOption({ active, title, subtitle }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div className={`p-4 rounded shadow-sm transition-all text-start ${active ? `${isDarkMode ? 'bg-dark' : 'bg-light'} border-start border-primary border-4 text-${isDarkMode ? 'light' : 'primary'}` : `${isDarkMode ? 'bg-dark' : 'bg-white'} border-start border-4 border-transparent ${isDarkMode ? 'text-light' : 'text-muted'}`}`} style={{minHeight: '110px'}}>
      <div className={`fw-semibold h6 ${isDarkMode ? 'text-light' : ''}`}>{title}</div>
      <div className={`small ${isDarkMode ? 'text-light opacity-75' : 'text-muted'} mt-1`}>{subtitle}</div>
    </div>
  );
}

export default RecognitionForm;

