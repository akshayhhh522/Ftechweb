import React from "react";

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-[#f5f6fa] flex flex-col">
      <section className="flex-1 flex flex-col justify-center items-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-heroHeadline mb-6">
          About Us
        </h1>
        <div className="max-w-2xl text-lg text-gray-700 text-center space-y-6">
          <p>
            DebtPlus serves the mission-critical needs of asset managers with
            clients spanning mutual funds, AIFs (alternative investments),
            pension, wealth managers and corporates in India and abroad.
          </p>
          <p>
            We provide SaaS based end-to-end transaction management, channel
            management, compliance solutions, data analytics and various other
            digital services to asset managers across segments, as well as
            outsourcing services for global players.
          </p>
        </div>
      </section>
    </main>
  );
}
