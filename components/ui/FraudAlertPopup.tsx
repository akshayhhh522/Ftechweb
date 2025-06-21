"use client";
import { useState, useEffect } from "react";
import { XCircle } from "lucide-react";

export default function FraudAlertPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Always show on refresh
    setTimeout(() => setVisible(true), 1200);
  }, []);

  function handleClose() {
    setVisible(false);
    sessionStorage.setItem("fraudAlertDismissed", "1");
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-white border-l-4 border-red-400 shadow-xl rounded-lg p-4 flex items-start gap-3 animate-fade-in">
      <XCircle className="text-red-400 flex-shrink-0 mt-1" size={28} />
      <div className="flex-1">
        <div className="font-semibold text-yellow-600 text-base mb-1">Fraud Caution</div>
        <div className="text-sm text-gray-700 mb-2">
          Beware of fraudulent calls, emails, or messages requesting payments in our name. We never ask for payments for recruitment or offer letters.
        </div>
        <div className="text-xs text-gray-500">If in doubt, contact us on WhatsApp <a href="https://wa.me/441614640828" className="text-red-500 font-medium underline ml-1" target="_blank" rel="noopener noreferrer">+44 161 464 0828</a></div>
      </div>
      <button onClick={handleClose} aria-label="Dismiss" className="ml-2 text-gray-400 hover:text-red-500 transition"><span aria-hidden>×</span></button>
    </div>
  );
}
