import React, { useState } from 'react';

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
  const [selectedCreditors, setSelectedCreditors] = useState([]);
  
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreditorToggle = (creditor) => {
    setSelectedCreditors(prev =>
      prev.includes(creditor)
        ? prev.filter(c => c !== creditor)
        : [...prev, creditor]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');

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
      ContactInfo: contactInfo,
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
      setSelectedCreditors([]);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full max-w-lg mx-auto p-6 md:p-8 bg-white rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Get debt advice</h2>
      
      {status && !status.startsWith("Error:") && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          <p>{status}</p>
        </div>
      )}
      {status && status.startsWith("Error:") && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          <p>{status}</p>
        </div>
      )}

      {!status || status.startsWith("Error:") ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1">
              Email or Phone Number
            </label>
            <input
              id="contactInfo"
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              required
              disabled={isLoading}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder-gray-400"
              placeholder="Enter your email or phone number"
            />
          </div>

          <div>
            <label htmlFor="totalDebts" className="block text-sm font-medium text-gray-700 mb-1">
              How much are your total debts?
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">£</span>
              <input
                id="totalDebts"
                type="number" // Use number for better input, can be parsed as string if needed by script
                value={totalDebts}
                onChange={(e) => setTotalDebts(e.target.value)}
                required
                disabled={isLoading}
                className="w-full p-3 pl-7 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder-gray-400"
                placeholder="Enter amount"
              />
            </div>
          </div>

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your name (Optional)
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder-gray-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Which types of creditors do you have?
            </label>
            <div className="flex flex-wrap gap-3">
              {CREDITOR_OPTIONS.map((creditor) => (
                <button
                  key={creditor}
                  type="button"
                  onClick={() => handleCreditorToggle(creditor)}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all
                    ${selectedCreditors.includes(creditor)
                      ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-300'
                      : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
                    }
                    ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {creditor}
                </button>
              ))}
            </div>
             {selectedCreditors.length === 0 && <p className="text-xs text-red-500 mt-1">Please select at least one creditor type if applicable, or proceed if none.</p>}
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !contactInfo || !totalDebts}
            className="w-full px-6 py-3 bg-[#1B4D3E] text-white font-semibold rounded-lg hover:bg-[#164037] shadow-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-base"
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
          </button>
        </form>
      ) : null}

      {(!status || status.startsWith("Error:")) && (
        <div className="text-center text-xs text-gray-500 mt-6">
          <p>Your information is secure and encrypted. We'll never share your details without permission.</p>
          <div className="flex items-center justify-center mt-3 space-x-3">
            <div className="flex items-center">
              <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="ml-1.5">Secure</span>
            </div>
            <div className="flex items-center">
              <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="ml-1.5">Private</span>
            </div>
          </div>
          <div className="mt-6">
            <a
              href="https://wa.me/916362966603?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-600 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.001 2.003C5.586 2.003 2 5.59 2 10.004c0 1.523.423 2.95 1.185 4.205l-1.12 3.075 3.177-1.102c1.203.68 2.576 1.063 4.008 1.063h.003c4.416 0 8.002-3.586 8.002-8.001 0-4.414-3.586-8-8.002-8zm0 14.4c-1.31 0-2.56-.343-3.638-.958l-.26-.154-2.7 1.002 1.018-2.644-.17-.276A6.406 6.406 0 013.6 10.004c0-3.53 2.87-6.401 6.401-6.401s6.402 2.87 6.402 6.4c0 3.532-2.87 6.402-6.402 6.402zm3.543-4.602c-.19-.095-1.112-.55-1.286-.613-.173-.062-.3-.095-.425.095-.125.19-.486.614-.597.738-.11.125-.22.14-.41.047-.19-.095-.803-.296-1.53- .94-.565-.498-.944-1.114-1.034-1.304-.09-.19-.01-0.29.084-.385.084-.085.19-.22.284-.33.095-.11.125-.19.19-.313s.03-.235-.016-.33c-.047-.095-.425-1.025-.58-1.405-.154-.37-.31-.32-.425-.326h-.01c-.11 0-.283.047-.425.235-.14.19-.533.52-.533 1.273s.546 1.474.62 1.585c.074.11.97 1.48 2.403 2.11.33.14.586.22.787.282.3.095.574.08.79.047.236-.046.11-.095.236-.19.125-.094.486-.395.58-.787.094-.395.094-.73.062-.788-.03-.061-.154-.094-.312-.188z"></path></svg>
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default SurveyForm;
