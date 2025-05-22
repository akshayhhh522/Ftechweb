"use client"; // Add this line at the top

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Assuming you have a Label component
import { Checkbox } from "@/components/ui/checkbox"; // Assuming you have a Checkbox component

interface QualifyFormProps {
  onClose: () => void;
}

const creditorTypes = [
  { id: "credit-card", label: "Credit Card" },
  { id: "loans", label: "Loans" },
  { id: "store-card", label: "Store Card & Catalogue" },
  { id: "council-tax", label: "Council Tax" },
  { id: "hmrc", label: "HMRC & Other" },
];

const QualifyForm: React.FC<QualifyFormProps> = ({ onClose }) => {
  const [contactInfo, setContactInfo] = useState("");
  const [debtAmount, setDebtAmount] = useState("");
  const [name, setName] = useState("");
  const [selectedCreditors, setSelectedCreditors] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCreditorChange = (creditorId: string) => {
    setSelectedCreditors((prev) =>
      prev.includes(creditorId)
        ? prev.filter((id) => id !== creditorId)
        : [...prev, creditorId]
    );
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!contactInfo) {
      newErrors.contactInfo = "Email or phone number is required.";
    } else {
      // Basic email or phone validation (can be improved)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[0-9\s-()]{7,}$/;
      if (!emailRegex.test(contactInfo) && !phoneRegex.test(contactInfo)) {
        newErrors.contactInfo = "Please enter a valid email or phone number.";
      }
    }
    if (!debtAmount) {
      newErrors.debtAmount = "Debt amount is required.";
    } else if (isNaN(Number(debtAmount))) {
        newErrors.debtAmount = "Debt amount must be a number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", {
        contactInfo,
        debtAmount,
        name,
        selectedCreditors,
      });
      // Add submission logic here
      // onClose(); // Optionally close form on successful submission
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
      <div className="bg-card rounded-xl shadow-xl p-6 sm:p-8 w-full max-w-2xl relative my-8">
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-2xl font-bold"
          onClick={onClose}
          aria-label="Close form"
        >
          ×
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-foreground text-center">
          Check if You Qualify
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Intro Section */}
          <div>
            <Label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700 mb-1.5">
              Email or Phone Number
            </Label>
            <Input
              id="contactInfo"
              type="text"
              placeholder="Enter your email or phone number"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className={`w-full bg-background border ${errors.contactInfo ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              aria-describedby="contactInfoError privacyNote"
            />
            {errors.contactInfo && <p id="contactInfoError" className="text-red-500 text-xs mt-1">{errors.contactInfo}</p>}
            <p id="privacyNote" className="text-xs text-gray-500 mt-1.5">
              We respect your privacy. Your information is safe with us.
            </p>
          </div>

          {/* Debt Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="debtAmount" className="block text-sm font-medium text-gray-700 mb-1.5">
                Total Debt Amount
              </Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none text-sm">
                  £
                </span>
                <Input
                  id="debtAmount"
                  type="text" // Changed to text to allow numeric keyboard on mobile, validation handles non-numeric
                  inputMode="numeric" // Helps mobile browsers show numeric keyboard
                  placeholder="Enter amount"
                  value={debtAmount}
                  onChange={(e) => setDebtAmount(e.target.value)}
                  className={`w-full bg-background border ${errors.debtAmount ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 pl-7`}
                  aria-describedby="debtAmountError"
                />
              </div>
              {errors.debtAmount && <p id="debtAmountError" className="text-red-500 text-xs mt-1">{errors.debtAmount}</p>}
            </div>
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Your Name (Optional)
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Creditor Type Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Which types of creditors do you have?
            </h3>
            <div className="flex flex-wrap gap-3">
              {creditorTypes.map((creditor) => (
                <button
                  key={creditor.id}
                  type="button" // Important: prevent form submission
                  onClick={() => handleCreditorChange(creditor.id)}
                  className={`border px-4 py-2 rounded-full hover:bg-emerald-50 cursor-pointer text-sm
                    ${selectedCreditors.includes(creditor.id) ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-background border-gray-300 text-gray-700'}`}
                  aria-pressed={selectedCreditors.includes(creditor.id)}
                >
                  {creditor.label}
                </button>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <Button
            type="submit"
            className="w-full bg-[#1B4D3E] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#164037] shadow transition-colors text-sm uppercase tracking-wider"
          >
            Send Enquiry
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QualifyForm;
