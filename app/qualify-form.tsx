import React from "react";
import SurveyForm from "./SurveyForm";

interface QualifyFormProps {
  onClose: () => void;
}

const QualifyForm: React.FC<QualifyFormProps> = ({ onClose }) => {
  // You can add your form code here later
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-2xl relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Check if You Qualify</h2>
        <div className="p-2">
          <SurveyForm />
        </div>
      </div>
    </div>
  );
};

export default QualifyForm;
