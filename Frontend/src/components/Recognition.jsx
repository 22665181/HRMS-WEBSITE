import React, { useState } from 'react';

const RecognitionForm = () => {
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
const handleSubmit = async () => {
  const payload = {
    recipientName: form.recipientName,
    department: form.department,
    employeeId: form.employeeId,
    jobTitle: form.jobTitle,
    appreciationType: form.appreciationType,
    achievement: form.achievement,
    dob: form.date, // backend expects 'dob'
    message: form.message,
    visibility: form.visibility,
    notify: form.notify,
    allowComment: form.allowComments, // backend expects 'allowComment'
  };

  try {
    const res = await fetch('http://localhost:5000/api/recognition/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Request failed: ${res.status} ${errText}`);
    }

    const data = await res.json();
    alert('Recognition submitted successfully!');
    console.log(data);
  } catch (error) {
    console.error('Error submitting recognition:', error);
    alert('Failed to submit recognition');
  }
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
    <div className="w-100 p-4 bg-light min-vh-100">
      {/* Header */}
      <div className="bg-white shadow-sm rounded px-4 py-3 mb-3 sticky-top">
        <div className="d-flex align-items-center justify-content-between">
          <h2 className="h4 fw-semibold mb-0">Appreciate Peers</h2>
          <div className="d-flex align-items-center gap-3">
            {/* Notification Icon */}
            <button className="btn btn-outline-primary rounded-circle p-2">
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
              <span className="small text-muted fw-medium">user{Math.floor(Math.random()*100)}@mail.com</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted mb-4">Recognize, appreciate, reward — celebrate your exceptional peers</p>

      <div className="row align-items-start">
        {/* Left: Steps */}
        <div className="col-md-3 d-flex flex-column gap-4 mt-5">
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
        <div className="col-md-9 d-flex flex-column">
          {/* Step Images */}
          <div className="d-flex justify-content-center gap-4 mb-4">
            {stepImages.map((img, idx) => (
              <div
                key={img.alt}
                className={`d-flex flex-column align-items-center transition-all shadow-sm rounded p-2 ${
                  step === idx + 1
                    ? "border border-primary bg-light scale-110"
                    : "opacity-75"
                }`}
                style={{ width: '90px', padding: '8px' }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="object-fit-contain"
                  style={{width: '56px', height: '56px'}}
                />
                <span className="mt-2 small fw-medium text-muted">{img.alt}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="bg-white shadow rounded p-5" style={{minHeight: '180px'}}>
              <h3 className="text-primary h5 fw-semibold mb-4">Select the Recipient</h3>
              <input type="text" name="recipientName" placeholder="Recipient Name" onChange={handleChange} className="form-control mb-3" />
              <select name="department" onChange={handleChange} className="form-select mb-3">
                <option value="">Select Department</option>
                <option>IT & Systems</option>
                <option>HR</option>
              </select>
              <div className="row mb-3">
                <div className="col">
                  <input type="text" name="employeeId" placeholder="Employee ID" onChange={handleChange} className="form-control" />
                </div>
                <div className="col">
                  <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} className="form-control" />
                </div>
              </div>
              <div className="text-center mt-4">
                <button onClick={nextStep} className="btn btn-primary px-4">Next Step</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white shadow rounded p-5" style={{minHeight: '180px'}}>
              <h3 className="text-primary h5 fw-semibold mb-4">Reason for Appreciation</h3>
              <select name="appreciationType" onChange={handleChange} className="form-select mb-3">
                <option value="">Type of Appreciation</option>
                <option>Outstanding Work</option>
                <option>Team Support</option>
              </select>
              <input type="text" name="achievement" placeholder="Specific Achievement" onChange={handleChange} className="form-control mb-3" />
              <div className="row mb-3">
                <div className="col">
                  <input type="date" name="date" className="form-control" onChange={handleChange} />
                </div>
                <div className="col">
                  <input type="file" name="file" onChange={handleChange} className="form-control" />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button onClick={prevStep} className="btn btn-outline-secondary">Back</button>
                <button onClick={nextStep} className="btn btn-primary">Next Step</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white shadow rounded p-5" style={{minHeight: '180px'}}>
              <h3 className="text-primary h5 fw-semibold mb-4">Add Context (Optional)</h3>
              <textarea name="message" maxLength={150} placeholder="Write a message" onChange={handleChange} className="form-control mb-3" style={{height: '100px'}}></textarea>
              <select name="visibility" onChange={handleChange} className="form-select mb-3">
                <option value="">Who can see this?</option>
                <option>Admin Only</option>
                <option>Everyone</option>
              </select>
              <div className="mb-3">
                <div className="form-check mb-2">
                  <input type="checkbox" name="notify" onChange={handleChange} className="form-check-input" id="notify" />
                  <label className="form-check-label" htmlFor="notify">
                    Send notification to recipient
                  </label>
                </div>
                <div className="form-check">
                  <input type="checkbox" name="allowComments" onChange={handleChange} className="form-check-input" id="allowComments" />
                  <label className="form-check-label" htmlFor="allowComments">
                    Allow comments or replies
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <button onClick={prevStep} className="btn btn-outline-secondary">Back</button>
                <button onClick={handleSubmit} className="btn btn-primary">Send Appreciation</button>

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
  return (
    <div className={`p-4 rounded shadow-sm transition-all text-start ${active ? 'bg-light border-start border-primary border-4 text-primary' : 'bg-white border-start border-4 border-transparent text-muted'}`} style={{minHeight: '110px'}}>
      <div className="fw-semibold h6">{title}</div>
      <div className="small text-muted mt-1">{subtitle}</div>
    </div>
  );
}

export default RecognitionForm;
