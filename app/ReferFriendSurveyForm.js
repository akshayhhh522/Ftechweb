"use client";

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

function ReferFriendSurveyForm() {
  const [contactInfo, setContactInfo] = useState('');
  const [contactInfoError, setContactInfoError] = useState('');
  const [totalDebts, setTotalDebts] = useState('');
  const [name, setName] = useState('');
  const [selectedCreditors, setSelectedCreditors] = useState([]);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreditorError, setShowCreditorError] = useState(false);

  const handleCreditorToggle = (creditor) => {
    setSelectedCreditors(prev =>
      prev.includes(creditor)
        ? prev.filter(c => c !== creditor)
        : [...prev, creditor]
    );
  };

  // Email validation (simple)
  const validateEmail = (email) => {
    // Basic RFC 5322 compliant regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // International phone validation (e.g. +441234567890)
  const validatePhone = (phone) => {
    return /^\+[0-9]{8,15}$/.test(phone);
  };

  const handleContactInfoChange = (e) => {
    const value = e.target.value;
    setContactInfo(value);
    if (!validateEmail(value) && !validatePhone(value)) {
      setContactInfoError('Please enter a valid email or phone number (with country code).');
    } else {
      setContactInfoError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");
    setShowCreditorError(false);
    // Validate contactInfo before submit
    if (!validateEmail(contactInfo) && !validatePhone(contactInfo)) {
      setContactInfoError('Please enter a valid email or phone number (with country code).');
      setIsLoading(false);
      return;
    }
    if (selectedCreditors.length === 0) {
      setShowCreditorError(true);
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
      ContactInfo: contactInfo,
      TotalDebts: totalDebts,
      Name: name,
      CreditorTypes: selectedCreditors.join(', '),
      Referral: true
    };
    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwphDqnLgV2X9vgcYf1SXmoMdbFdcpQTB6-__J6J8HaqsnBqjlf_svv6dlhtbYVoeMenA/exec";
    try {
      const formDataUrlEncoded = new URLSearchParams(formData).toString();
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataUrlEncoded,
        mode: 'no-cors',
      });
      setStatus('Thank you for your enquiry! We will be in touch shortly.');
      setContactInfo('');
      setTotalDebts('');
      setName('');
      setSelectedCreditors([]);
    } catch (error) {
      setStatus(`Error: ${error.message || 'Something went wrong. Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] py-8 px-2">
      <div className="w-full max-w-2xl bg-gradient-to-br from-[#e0ffe7] via-[#f5f7fa] to-[#e0eaff] rounded-3xl shadow-2xl border border-gray-100 px-12 py-14 flex flex-col gap-10 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#bada55]/30 rounded-full blur-2xl z-0" />
        <h2 className="text-4xl md:text-5xl font-extrabold text-heroHeadline mb-2 text-center z-10 drop-shadow-sm tracking-tight">Refer a Friend</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 z-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="contactInfo" className="block text-base font-semibold text-heroHeadline mb-2">Your email or phone (with country code)</label>
              <input
                id="contactInfo"
                type="text"
                value={contactInfo}
                onChange={handleContactInfoChange}
                required
                disabled={isLoading}
                className={`w-full px-5 py-3 rounded-2xl bg-white/80 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-heroAccent focus:border-heroAccent text-base transition shadow-sm ${contactInfoError ? 'border-red-500' : ''}`}
                placeholder="Enter your email or phone"
              />
              {contactInfoError && (
                <p className="text-xs text-red-500 mt-1">{contactInfoError}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label htmlFor="totalDebts" className="block text-base font-semibold text-heroHeadline mb-2">Friend's total debts?</label>
              <input
                id="totalDebts"
                type="number"
                value={totalDebts}
                onChange={(e) => setTotalDebts(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-5 py-3 rounded-2xl bg-white/80 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-heroAccent focus:border-heroAccent text-base transition shadow-sm"
                placeholder="Amount (e.g. 5000)"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="name" className="block text-base font-semibold text-heroHeadline mb-2">Friend's contact (Mail or Phone)</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="w-full px-5 py-3 rounded-2xl bg-white/80 text-gray-900 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-heroAccent focus:border-heroAccent text-base transition shadow-sm"
                placeholder="Enter friend's contact"
              />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-heroHeadline mb-3 text-center md:text-left">Which types of creditors does your friend have?</h3>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-2">
              {CREDITOR_OPTIONS.map((creditor) => {
                const isSelected = selectedCreditors.includes(creditor);
                return (
                  <button
                    key={creditor}
                    type="button"
                    onClick={() => handleCreditorToggle(creditor)}
                    disabled={isLoading}
                    aria-pressed={isSelected}
                    className={`px-6 py-2 rounded-full text-base font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#bada55] focus:border-[#bada55] focus:z-10 shadow-sm
                      ${!isSelected ? 'bg-white/80 text-heroHeadline border-gray-300 hover:bg-[#bada55] hover:text-heroHeadline hover:border-[#bada55]' : ''}
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
              <p className="text-xs text-red-500 mt-2 text-center md:text-left">Please select at least one creditor type if applicable, or proceed if none.</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isLoading || !contactInfo || !totalDebts}
            className="w-full rounded-2xl py-4 text-lg font-bold mt-2 tracking-wide shadow-xl"
            size="lg"
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
        <div className="text-center text-xs text-gray-500 mt-2 z-10">
          <p>Your information is secure and encrypted. We'll never share your details without permission.</p>
        </div>
      </div>
    </div>
  );
}

export default ReferFriendSurveyForm;
