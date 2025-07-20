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
    <div className="w-full p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-md rounded-md px-6 py-4 mb-2 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Appreciate Peers</h2>
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button className="relative p-2 rounded-full hover:bg-purple-100">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <img
                src={`https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70) + 1}`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-sm text-gray-700 font-medium">user{Math.floor(Math.random()*100)}@mail.com</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-500 mb-4">Recognize, appreciate, reward — celebrate your exceptional peers</p>

      <div className="grid grid-cols-4 gap-8 items-start">
        {/* Left: Steps */}
        <div className="col-span-1 flex flex-col gap-6 mt-24">
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
        <div className="col-span-3 flex flex-col justify-start">
          {/* Step Images */}
          <div className="flex justify-center gap-8 mb-8">
            {stepImages.map((img, idx) => (
              <div
                key={img.alt}
                className={`flex flex-col items-center transition-all shadow-lg ${
                  step === idx + 1
                    ? "scale-110 border-4 border-purple-300 bg-purple-50 rounded-xl"
                    : "opacity-60 rounded-xl"
                }`}
                style={{ width: 90, padding: 8 }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-14 h-14 object-contain"
                />
                <span className="mt-2 text-xs font-medium text-gray-700">{img.alt}</span>
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="bg-white shadow-lg rounded-lg p-10 min-h-[180px] flex flex-col justify-center">
              <h3 className="text-purple-600 text-xl font-semibold mb-4">Select the Recipient</h3>
              <input type="text" name="recipientName" placeholder="Recipient Name" onChange={handleChange} className="input mb-3" />
              <select name="department" onChange={handleChange} className="input mb-3">
                <option value="">Select Department</option>
                <option>IT & Systems</option>
                <option>HR</option>
              </select>
              <div className="flex gap-4 mb-3">
                <input type="text" name="employeeId" placeholder="Employee ID" onChange={handleChange} className="input" />
                <input type="text" name="jobTitle" placeholder="Job Title" onChange={handleChange} className="input" />
              </div>
              <div className="flex justify-center mt-4">
                <button onClick={nextStep} className="btn-purple">Next Step</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white shadow-lg rounded-lg p-10 min-h-[180px] flex flex-col justify-center">
              <h3 className="text-purple-600 text-xl font-semibold mb-4">Reason for Appreciation</h3>
              <select name="appreciationType" onChange={handleChange} className="input mb-3">
                <option value="">Type of Appreciation</option>
                <option>Outstanding Work</option>
                <option>Team Support</option>
              </select>
              <input type="text" name="achievement" placeholder="Specific Achievement" onChange={handleChange} className="input mb-3" />
              <div className="flex gap-4 mb-3">
                <input type="date" name="date" className="input" onChange={handleChange} />
                <input type="file" name="file" onChange={handleChange} className="input" />
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-light">Back</button>
                <button onClick={nextStep} className="btn-purple">Next Step</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white shadow-lg rounded-lg p-10 min-h-[180px] flex flex-col justify-center">
              <h3 className="text-purple-600 text-xl font-semibold mb-4">Add Context (Optional)</h3>
              <textarea name="message" maxLength={150} placeholder="Write a message" onChange={handleChange} className="input h-24 mb-3"></textarea>
              <select name="visibility" onChange={handleChange} className="input mb-3">
                <option value="">Who can see this?</option>
                <option>Admin Only</option>
                <option>Everyone</option>
              </select>
              <div className="space-y-2 mb-3">
                <label className="flex gap-2 items-center">
                  <input type="checkbox" name="notify" onChange={handleChange} />
                  Send notification to recipient
                </label>
                <label className="flex gap-2 items-center">
                  <input type="checkbox" name="allowComments" onChange={handleChange} />
                  Allow comments or replies
                </label>
              </div>
              <div className="flex justify-between">
                <button onClick={prevStep} className="btn-light">Back</button>
                <button onClick={() => alert("Recognition submitted!")} className="btn-purple">Send Appreciation</button>
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
    <div className={`p-6 rounded-lg shadow-lg transition-colors text-left text-base flex flex-col justify-center min-h-[110px] ${active ? 'bg-purple-50 border-l-4 border-purple-600 text-purple-700' : 'bg-white border-l-4 border-transparent text-gray-700'}`}>
      <div className="font-semibold text-lg">{title}</div>
      <div className="text-sm text-gray-500 mt-1">{subtitle}</div>
    </div>
  );
}

export default RecognitionForm;
