"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Define an interface for the card props to ensure type safety
interface InfoCardProps {
  title: string;
  description: string;
}

const creditorTypes = [
  { id: "credit-card", label: "Credit Card" },
  { id: "loans", label: "Loans" },
  { id: "store-card", label: "Store Card & Catalogue" },
  { id: "council-tax", label: "Council Tax" },
  { id: "hmrc", label: "HMRC & Other" },
];

const DebtAdviceSection = () => {
  const [contactInfo, setContactInfo] = useState("");
  const [debtAmount, setDebtAmount] = useState("");
  const [name, setName] = useState("");
  const [selectedCreditors, setSelectedCreditors] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [status, setStatus] = useState(""); // For success/error messages
  const [isLoading, setIsLoading] = useState(false); // For loading state

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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\+?[0-9\s()-]{7,}$/;
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setStatus("");

    // Generate IST Timestamp
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const formatter = new Intl.DateTimeFormat("en-IN", options);
    const parts = formatter.formatToParts(now);
    let day = "",
      month = "",
      year = "",
      hour = "",
      minute = "",
      second = "",
      dayPeriod = "";
    parts.forEach((part) => {
      switch (part.type) {
        case "day":
          day = part.value;
          break;
        case "month":
          month = part.value;
          break;
        case "year":
          year = part.value;
          break;
        case "hour":
          hour = part.value;
          break;
        case "minute":
          minute = part.value;
          break;
        case "second":
          second = part.value;
          break;
        case "dayPeriod":
          dayPeriod = part.value.toUpperCase();
          break;
      }
    });
    const timestampIST = `${day}/${month}/${year}, ${hour}:${minute}:${second} ${dayPeriod}`;

    // Map selected creditor IDs to their labels for submission
    const selectedCreditorLabels = selectedCreditors.map((id) => {
      const creditor = creditorTypes.find((c) => c.id === id);
      return creditor ? creditor.label : id; // Fallback to ID if label not found
    });

    const formData = {
      TimestampIST: timestampIST,
      ContactInfo: contactInfo,
      TotalDebts: debtAmount, // Use debtAmount state
      Name: name,
      CreditorTypes: selectedCreditorLabels.join(", "),
    };

    console.log("Submitting to Google Sheets:", formData);

    const APPS_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycby7ZZtF8dFUSeA8kHZ29ouCFdyKmSYEqf0VJlbZbJeipeA5YGg81heJflfC7IsxcTyYuw/exec";

    try {
      const formDataUrlEncoded = new URLSearchParams(formData as any).toString(); // Cast to any for URLSearchParams
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataUrlEncoded,
        mode: "no-cors",
      });

      setStatus("Thank you for your enquiry! We will be in touch shortly.");
      // Reset form fields
      setContactInfo("");
      setDebtAmount("");
      setName("");
      setSelectedCreditors([]);
      setErrors({});
    } catch (error) {
      console.error("Error submitting form to Google Sheets:", error);
      setStatus(
        `Error: ${
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again."
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const infoCards: InfoCardProps[] = [
    {
      title: "Debt Management",
      description:
        "A Debt Management Plan (DMP) is an informal solution designed for people with unmanageable debts over £1,000 with repayments from just £90/month",
    },
    {
      title: "Bankruptcy",
      description:
        "Bankruptcy is often viewed as a solution of last resort but it can be a great solution for people who know they will never repay their debts.",
    },
    {
      title: "IVA",
      description:
        "An IVA (Individual Voluntary Arrangement) is a formal solution designed for people struggling with debts over £10,000",
    },
    {
      title: "Debt Consolidation",
      description:
        "Debt Consolidation is a way of paying off all of your debts with a loan that offers you just one monthly payment to cover all your debts.",
    },
  ];

  return (
    <section className="bg-[#f5f6fa] py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto md:flex md:gap-12 md:items-start">
        {/* Form Panel: Applied container wrapper styles */}
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto space-y-6 mb-12 md:mb-0 md:mx-0">
          {/* Heading: Applied typography styles */}
          <h2 className="text-xl font-semibold text-[#1B4D3E] mb-6 text-center md:text-left">
            Get debt advice
          </h2>

          {/* Status Messages */}
          {status && !status.startsWith("Error:") && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm text-center">
              <p>{status}</p>
            </div>
          )}
          {status && status.startsWith("Error:") && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
              <p>{status}</p>
            </div>
          )}

          {/* Hide form on successful submission, show if error or no status */}
          {(!status || status.startsWith("Error:")) && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section: Contact Information */}
              <section>
                {/* Section Title: Applied typography styles - not explicitly requested for this one, but good for consistency */}
                {/* <h3 className="text-lg font-semibold text-[#1B4D3E] mb-2">Contact Information</h3> */}
                <div className="flex flex-col space-y-1">
                  <Label
                    htmlFor="contactInfo"
                    // Label: Applied typography styles
                    className="text-sm md:text-base text-gray-700 font-medium"
                  >
                    Email or Phone Number
                  </Label>
                  <Input
                    id="contactInfo"
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    // Input: Applied input field design
                    className={`w-full bg-[#f5f6fa] border ${
                      errors.contactInfo ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                    aria-describedby={
                      errors.contactInfo ? "contactInfoError" : undefined
                    }
                    aria-label="Email or Phone Number"
                  />
                  {errors.contactInfo && (
                    <p
                      id="contactInfoError"
                      className="text-red-500 text-xs mt-1"
                    >
                      {errors.contactInfo}
                    </p>
                  )}
                </div>
              </section>

              {/* Section: Debt Details */}
              <section>
                {/* Section Title: Applied typography styles */}
                <h3 className="text-lg font-semibold text-[#1B4D3E] mb-2">
                  Debt Details
                </h3>
                {/* Layout: Changed grid to always be 1 column */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex flex-col space-y-1">
                    <Label
                      htmlFor="debtAmount"
                      // Label: Applied typography styles
                      className="text-sm md:text-base text-gray-700 font-medium"
                    >
                      How much are your total debts?
                    </Label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none text-sm">
                        £
                      </span>
                      <Input
                        id="debtAmount"
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter amount"
                        value={debtAmount}
                        onChange={(e) => setDebtAmount(e.target.value)}
                        // Input: Applied input field design
                        className={`w-full bg-[#f5f6fa] border ${
                          errors.debtAmount ? "border-red-500" : "border-gray-300"
                        } rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 pl-7`}
                        aria-describedby={
                          errors.debtAmount ? "debtAmountError" : undefined
                        }
                        aria-label="Total debt amount"
                      />
                    </div>
                    {errors.debtAmount && (
                      <p
                        id="debtAmountError"
                        className="text-red-500 text-xs mt-1"
                      >
                        {errors.debtAmount}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Label
                      htmlFor="name"
                      // Label: Applied typography styles
                      className="text-sm md:text-base text-gray-700 font-medium"
                    >
                      Your name (Optional)
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      // Input: Applied input field design
                      className="w-full bg-[#f5f6fa] border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      aria-label="Your name (Optional)"
                    />
                  </div>
                </div>
              </section>

              {/* Section: Creditor Types */}
              <section>
                {/* Section Title: Applied typography styles */}
                <h3 className="text-lg font-semibold text-[#1B4D3E] mb-2">
                  Which types of creditors do you have?
                </h3>
                {/* Layout: Applied flex wrap and gap */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {creditorTypes.map((creditor) => (
                    <button
                      key={creditor.id}
                      type="button"
                      onClick={() => handleCreditorChange(creditor.id)}
                      // Tags: Applied base, active, and inactive styles
                      className={`px-4 py-2 border rounded-full text-sm font-medium cursor-pointer transition 
                        ${
                          selectedCreditors.includes(creditor.id)
                            ? "bg-emerald-600 text-white border-transparent shadow-sm"
                            : "bg-white hover:bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      aria-pressed={selectedCreditors.includes(creditor.id)}
                      aria-label={creditor.label}
                    >
                      {creditor.label}
                    </button>
                  ))}
                </div>
              </section>

              <Button
                type="submit"
                disabled={isLoading} // Disable button when loading
                // CTA Button: Applied button styles
                className="w-full bg-[#1B4D3E] text-white text-center font-semibold py-3 rounded-full hover:bg-[#164037] transition shadow-md disabled:opacity-50"
                aria-label="Send Enquiry"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "SEND ENQUIRY"
                )}
              </Button>
            </form>
          )}
        </div>

        {/* Info Cards Section (remains the same) */}
        <div className="w-full md:w-auto md:flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 md:mt-0">
          {infoCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md space-y-4 flex flex-col justify-between transition transform hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                <h3 className="text-lg font-semibold text-[#1B4D3E] mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DebtAdviceSection;
