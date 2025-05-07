import React, { useState } from 'react';

function SurveyForm() {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [status, setStatus] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const questions = [
    "Q1",
    "Q2",
    "Q3",
    "Q4", 
    "Q5"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);
    setStatus(''); 

    // Get current timestamp and manually format as IST
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
        case 'dayPeriod': dayPeriod = part.value.toUpperCase(); break; // Ensure AM/PM is uppercase
      }
    });

    // Construct the string in DD/MM/YYYY, HH:MM:SS AM/PM format
    const timestampIST = `${day}/${month}/${year}, ${hour}:${minute}:${second} ${dayPeriod}`;

    // Create form data object, including the timestamp
    const formData = { 
      Q1: q1, 
      Q2: q2, 
      Q3: q3, 
      Q4: q4, 
      Q5: q5,
      TimestampIST: timestampIST // Add the manually formatted timestamp
    };
    
    console.log('Submitting form data:', formData);
    
    // Update the Apps Script URL
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw3bZYDf9ovekoldw_YX7ngl2yKHKhKGPVQiXFvuvSp3_7v8rwXwAt5J18c8yY6XzxH1A/exec";
    
    try {
      const formDataUrlEncoded = new URLSearchParams(formData).toString();
      console.log('Sending form data as URL-encoded:', formDataUrlEncoded);

      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataUrlEncoded,
        mode: 'no-cors',
      });
      
      console.log('Form submission completed');
      setStatus('Thank you! We\'re reviewing your information to help you get out of debt.');
      
      setQ1('');
      setQ2('');
      setQ3('');
      setQ4('');
      setQ5('');
      setCurrentStep(1);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCurrentValue = (step) => {
    switch(step) {
      case 1: return q1;
      case 2: return q2;
      case 3: return q3;
      case 4: return q4;
      case 5: return q5;
      default: return '';
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    
    switch(currentStep) {
      case 1: setQ1(value); break;
      case 2: setQ2(value); break;
      case 3: setQ3(value); break;
      case 4: setQ4(value); break;
      case 5: setQ5(value); break;
      default: break;
    }
  };

  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between mb-1">
          <p className="text-sm font-medium text-muted-foreground">Step {currentStep} of {totalSteps}</p>
          <p className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% Complete</p>
        </div>
        <div className="w-full h-2 bg-muted rounded-full">
          <div 
            className="h-2 bg-primary rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className="bg-card rounded-xl p-8 border border-border shadow-lg"
        >
          {status ? (
            <div className="py-10 text-center">
              <svg className="w-16 h-16 text-primary mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Success!</h3>
              <p className="text-muted-foreground text-lg">{status}</p>
              <p className="mt-6 text-muted-foreground">One of our debt specialists will contact you shortly.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-card-foreground mb-6">{questions[currentStep-1]}</h3>
              
              <div className="space-y-4">
                <input
                  type={currentStep === 1 || currentStep === 5 ? "number" : "text"}
                  value={getCurrentValue(currentStep)}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full p-4 bg-input border border-border rounded-lg text-foreground text-lg focus:ring-2 focus:ring-ring focus:border-ring transition-all placeholder-muted-foreground"
                  placeholder={currentStep === 1 ? "Enter amount in £" : currentStep === 5 ? "Enter monthly income in £" : "Type your answer here..."}
                />
                
                {currentStep === 3 && (
                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setQ3("Yes")}
                      className={`flex-1 p-4 rounded-lg text-lg font-medium transition-all ${
                        q3 === "Yes" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setQ3("No")}
                      className={`flex-1 p-4 rounded-lg text-lg font-medium transition-all ${
                        q3 === "No" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      No
                    </button>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {["Employed", "Self-employed", "Unemployed", "Retired"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setQ4(option)}
                        className={`p-4 rounded-lg text-center text-lg font-medium transition-all ${
                          q4 === option ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-8 pt-4 border-t border-border">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    disabled={!getCurrentValue(currentStep)}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || !q5}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Get Your Free Assessment"
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
        
        {!status && (
          <div className="text-center text-sm text-muted-foreground mt-4">
            <p>Your information is secure and encrypted. We'll never share your details without permission.</p>
            
            <div className="flex items-center justify-center mt-4 space-x-4">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="ml-2">Secure</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="ml-2">Private</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="ml-2">No Obligation</span>
              </div>
            </div>

            {/* WhatsApp Chat Button */}
            <div className="mt-6">
              <a
                href="https://wa.me/916362966603?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors"
              >
                Chat with us on WhatsApp
              </a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SurveyForm;
