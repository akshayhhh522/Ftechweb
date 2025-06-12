import React from "react";

export default function CareerWithUsPage() {
  return (
    <main className="min-h-screen bg-[#f5f6fa] flex flex-col">
      <section className="flex-1 flex flex-col justify-center items-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-heroHeadline mb-6">
          Career with Us
        </h1>
        <div className="max-w-2xl text-lg text-gray-700 text-center space-y-6">
          <p>
            Join DebtPlus and be part of a team that delivers mission-critical
            solutions to asset managers, mutual funds, and corporates. We are
            always looking for talented individuals who are passionate about
            technology, finance, and innovation.
          </p>
          <p>
            Explore exciting career opportunities and help us shape the future of
            digital financial services in India and abroad.
          </p>
        </div>
      </section>
    </main>
  );
}