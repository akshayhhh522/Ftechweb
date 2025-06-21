import React, { useState } from 'react';
import { Button } from "../components/ui/button";

// Define the creditor types for easy mapping
const CREDITOR_OPTIONS = [
  "Credit Card",
  "Loans",
  "Store Card & Catalogue",
  "Council Tax",
  "HMRC & Other"
];

function SurveyForm() {
  const [contactInfo, setContactInfo] = useState('');
  const [totalDebts, setTotalDebts] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCreditors, setSelectedCreditors] = useState([]);
  
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreditorError, setShowCreditorError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Email validation: must be a valid Gmail address
  const validateEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  // Phone validation: must be a valid international number (e.g., +441234567890)
  const validatePhone = (phone) => {
    // Accepts + followed by 8 to 15 digits
    const intlPhoneRegex = /^\+[0-9]{8,15}$/;
    return phone === "" || intlPhoneRegex.test(phone); // allow empty (optional), or valid
  };

  const handleCreditorToggle = (creditor) => {
    setSelectedCreditors(prev =>
      prev.includes(creditor)
        ? prev.filter(c => c !== creditor)
        : [...prev, creditor]
    );
  };

  const handleContactInfoChange = (e) => {
    setContactInfo(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid Gmail address.");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
    if (!validatePhone(e.target.value)) {
      setPhoneError("Please enter a valid phone number with country code, e.g. +441234567890");
    } else {
      setPhoneError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");
    setShowCreditorError(false);
    // Validate before submit
    let valid = true;
    if (!validateEmail(contactInfo)) {
      setEmailError("Please enter a valid Gmail address.");
      valid = false;
    }
    if (!validatePhone(phoneNumber)) {
      setPhoneError("Please enter a valid phone number with country code, e.g. +441234567890");
      valid = false;
    }
    if (!valid) {
      setIsLoading(false);
      return;
    }

    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const formatter = new Intl.DateTimeFormat('en-IN', options);
    const parts = formatter.formatToParts(now);
    
    let day = '', month = '', year = '', hour = '', minute = '', second = '', dayPeriod = '';
    parts.forEach(part => {
      switch (part.type) {
        case 'day': day = part.value; break;
        case 'month': month = part.value; break;
        case 'year': year = part.value; break;
        case 'hour': hour = part.value; break;
        case 'minute': minute = part.value; break;
        case 'second': second = part.value; break;
        case 'dayPeriod': dayPeriod = part.value.toUpperCase(); break;
      }
    });

    const timestampIST = `${day}/${month}/${year}, ${hour}:${minute}:${second} ${dayPeriod}`;

    const formData = {
      TimestampIST: timestampIST,
      ContactInfo: `Email: ${contactInfo}${phoneNumber ? ', Phone: ' + phoneNumber : ''}`,
      TotalDebts: totalDebts,
      Name: name,
      CreditorTypes: selectedCreditors.join(', ') // Join array into a comma-separated string
    };
    
    console.log('Submitting form data:', formData);
    
    // IMPORTANT: Replace with your NEW Google Apps Script URL
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby7ZZtF8dFUSeA8kHZ29ouCFdyKmSYEqf0VJlbZbJeipeA5YGg81heJflfC7IsxcTyYuw/exec"; 
    
    if (APPS_SCRIPT_URL === "YOUR_NEW_GOOGLE_APPS_SCRIPT_URL_HERE") {
      console.error("Please update the APPS_SCRIPT_URL in SurveyForm.js");
      setStatus("Error: Google Apps Script URL not configured. Please contact support.");
      setIsLoading(false);
      return;
    }

    try {
      const formDataUrlEncoded = new URLSearchParams(formData).toString();
      console.log('Sending form data as URL-encoded:', formDataUrlEncoded);

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataUrlEncoded,
        mode: 'no-cors', // Keep no-cors if your script is set up for it
      });
      
      console.log('Form submission completed');
      setStatus('Thank you for your enquiry! We will be in touch shortly.');
      
      // Reset form fields
      setContactInfo('');
      setTotalDebts('');
      setName('');
      setPhoneNumber('');
      setSelectedCreditors([]);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-0 bg-transparent">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-8 flex flex-col gap-7">
        <h2 className="text-2xl md:text-3xl font-bold text-heroHeadline mb-6 text-left">Get debt advice</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="contactInfo" className="block text-base font-semibold text-heroHeadline mb-2">Email Address</label>
            <input
              id="contactInfo"
              type="text"
              value={contactInfo}
              onChange={handleContactInfoChange}
              required
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-xl bg-[#f5f7fa] text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-heroAccent focus:border-heroAccent text-base transition mb-1 ${emailError ? 'border-red-500' : ''}`}
              placeholder="Enter your email address"
            />
            {emailError && <p className="text-xs text-red-500 mb-3">{emailError}</p>}
            <label htmlFor="phoneNumber" className="block text-base font-semibold text-heroHeadline mb-2">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handlePhoneChange}
              disabled={isLoading}
              className={`w-full px-4 py-3 rounded-xl bg-[#f5f7fa] text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-heroAccent focus:border-heroAccent text-base transition mb-1 ${phoneError ? 'border-red-500' : ''}`}
              placeholder="Enter your phone number with country code (e.g. +441234567890)"
            />
            {phoneError && <p className="text-xs text-red-500 mb-3">{phoneError}</p>}
          </div>
          <div>
            <h3 className="text-lg font-bold text-heroHeadline mb-2">Debt Details</h3>
            <label htmlFor="totalDebts" className="block text-base font-semibold text-heroHeadline mb-2">How much are your total debts?</label>
            <div className="relative mb-4">
              <input
                id="totalDebts"
                type="number"
                value={totalDebts}
                onChange={(e) => setTotalDebts(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 pr-4 py-3 rounded-xl bg-[#f5f7fa] text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-heroAccent focus:border-heroAccent text-base transition mb-4"
                placeholder="Amount (e.g. 5000)"
              />
            </div>
            <label htmlFor="name" className="block text-base font-semibold text-heroHeadline mb-2">Your name (Optional)</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-xl bg-[#f5f7fa] text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-heroAccent focus:border-heroAccent text-base transition"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-heroHeadline mb-2">Which types of creditors do you have?</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {CREDITOR_OPTIONS.map((creditor) => {
                const isSelected = selectedCreditors.includes(creditor);
                return (
                  <button
                    key={creditor}
                    type="button"
                    onClick={() => handleCreditorToggle(creditor)}
                    disabled={isLoading}
                    aria-pressed={isSelected}
                    className={`px-5 py-2 rounded-full text-base font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#bada55] focus:border-[#bada55] focus:z-10
                      ${!isSelected ? 'bg-[#f5f7fa] text-heroHeadline border-gray-200 hover:bg-[#bada55] hover:text-heroHeadline hover:border-[#bada55]' : ''}
                      ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    style={isSelected ? { background: '#bada55', color: '#1B4D3E', borderColor: '#bada55', boxShadow: '0 2px 8px #bada5522' } : {}}
                  >
                    {creditor}
                  </button>
                );
              })}
            </div>
            {showCreditorError && (
              <p className="text-xs text-red-500 mt-2">Please select at least one creditor type if applicable, or proceed if none.</p>
            )}
          </div>
          {/* Replace the native button with the custom Button component for consistent styling */}
          <Button
            type="submit"
            disabled={isLoading || !contactInfo || !totalDebts || emailError || phoneError}
            className="w-full font-bold py-4 rounded-full shadow-lg mt-2 tracking-wide text-lg"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              "SEND ENQUIRY"
            )}
          </Button>
          {status && !status.startsWith("Error:") && (
            <div className="mb-2 p-3 bg-green-50 border border-green-400 text-green-700 rounded-lg text-center text-sm mt-2">
              <p>{status}</p>
            </div>
          )}
          {status && status.startsWith("Error:") && (
            <div className="mb-2 p-3 bg-red-50 border border-red-400 text-red-700 rounded-lg text-center text-sm mt-2">
              <p>{status}</p>
            </div>
          )}
        </form>
        <div className="text-center text-xs text-gray-500 mt-2">
          <p>Your information is secure and encrypted. We'll never share your details without permission.</p>
        </div>
      </div>
    </div>
  );
}

export default SurveyForm;
