import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f5f6fa] flex flex-col">
      <section className="flex-1 flex flex-col justify-center items-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-heroHeadline mb-6">
          Privacy Policy
        </h1>
        <div className="max-w-2xl text-lg text-gray-700 text-center space-y-6">
          <p>
            Your privacy is important to us. DebtPlus is committed to protecting
            your personal information and ensuring transparency in how we use it.
            We do not share your confidential information with third parties
            except as required by law or with your explicit consent.
          </p>
          <p>
            We take all possible precautions to safeguard your data and use it
            only for the purposes of providing our services, improving user
            experience, and complying with legal obligations.
          </p>
        </div>
      </section>
    </main>
  );
}