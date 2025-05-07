"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TrustpilotRating from "@/components/trustpilot-rating";
import TestimonialSlider from "@/components/testimonial-slider";
import dynamic from "next/dynamic";
import { useState } from "react";

const QualifyForm = dynamic(() => import("./qualify-form"), { ssr: false });

export default function Home() {
  const faqData = [
    {
      question: "Is an IVA suitable for me?",
      answer:
        "An Individual Voluntary Arrangement (IVA) is a formal debt solution that creates a legally binding agreement between you and the people you owe money to. You may decide to enter an IVA if you’re struggling to repay the total amount of unsecured debt you currently have, but can afford to repay some. Your free debt advice consultation with UK Debt Expert will help you decide whether an IVA is the best solution for you.",
    },
    {
      question: "Can an IVA affect my credit rating?",
      answer:
        "Yes, an IVA will have an impact on your credit rating as it will show on your credit report for six years after it has been approved. However, it’s important to note this is the case for most debt solutions and your credit score will likely already have been affected by being in debt in the first place. Once your IVA is complete you will be offered a fresh start to begin rebuilding your credit rating.",
    },
    {
      question: "Will entering an IVA affect my job?",
      answer:
        "In most cases entering an IVA won’t affect employment. However, in certain professions, such as accountants and solicitors, having an IVA may mean that you can no longer practice or you may only be able to practice under certain conditions.",
    },
    {
      question: "Can creditors still contact me when I'm in an IVA?",
      answer:
        "Once you enter an IVA, creditors can take no further action against you and can’t contact you directly.",
    },
    {
      question: "How can an IVA change my life?",
      answer:
        "An IVA can be a positive way to manage unaffordable unsecured debt and allow you to better manage your monthly finances. In an IVA a single monthly payment is agreed with your current financial situation taken into consideration – this payment is then divided between the people you owe money to. During the course of your plan all interest and fees associated with your debts are frozen. At the end of the IVA the remaining debts are written off.",
    },
    {
      question: "What are the disadvantages of an IVA?",
      answer:
        "When you’re considering entering an IVA, it’s important to be aware of the following: Your credit rating will be affected. If you’re a homeowner you may be required to release equity from your home towards the end of your arrangement. Only the unsecured debts included in your IVA will be written off at the end of the agreement. Your IVA will be recorded on a public register. This isn’t an exhaustive list of considerations to be aware of before deciding to enter an IVA. When you speak to a UK Debt Expert advisor, they will ensure you’re aware of the advantages and disadvantages to help you make an informed decision.",
    },
    {
      question: "Why do you work with UK Debt Expert?",
      answer:
        "UK Debt Expert is the debt advice arm of The Creditfix Group. They offer free debt advice based on all UK debt solutions, so they’re the best people to look at your financial situation and advise you on the best solution for your lifestyle and circumstances. At Creditfix, we specialise in Individual Voluntary Arrangements (IVAs) and are the biggest provider of IVAs in the UK. If you’re advised that an IVA is the best solution for your situation, we will take care of the setup and management of the arrangement, which allows you to focus on getting your finances back on track.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We offer free debt advice tailored to your circumstances. We’ll find out more about your current financial situation and your lifestyle to advise on the best solution for you. Although we offer advice on all debt help solutions available, we specialise in Individual Voluntary Arrangements (IVAs).",
    },
    {
      question: "What fees apply?",
      answer:
        "All of our initial advice is free; however, fees will apply should you decide to enter into an arrangement. We operate a transparent fixed fee model, which incorporates the Nominee Fee, Supervisory Fee and all costs and expenses associated with the arrangement. Fees will be taken from your monthly payment or asset realisations paid into your arrangement. These will be discussed by an expert advisor to make sure you are fully aware of the costs involved.",
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  function toggleFaq(index: number) {
    setExpandedFaq((prev) => (prev === index ? null : index));
  }

  return (
    <main className="bg-background min-h-screen">
      {/* Hero Section */}
      <section
        className="relative text-primary-foreground py-12 md:py-16 bg-primary bg-cover bg-center"
        style={{ backgroundImage: "url('/177.png')" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Write Off Up to 81% of Your Debts</h1>
          <p className="text-base md:text-lg mb-6">
            We've helped over 250,000 people out of debt. Let us help you too.
          </p>
          <Button
            className="bg-background text-primary hover:bg-background/90 px-6 py-3 rounded-full font-semibold text-base md:text-lg"
            onClick={() => setShowForm(true)}
          >
            Check if You Qualify
          </Button>
          {showForm && <QualifyForm onClose={() => setShowForm(false)} />}
        </div>
      </section>

      {/* Informational Sections */}
      <section className="py-12 md:py-16 bg-card rounded-xl shadow-lg mx-4 md:mx-8 my-6 md:my-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-4 md:p-6 bg-card rounded-md shadow-md text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <Image src="/placeholder-logo.png" alt="Placeholder for Free Advice Icon" width={80} height={80} className="mx-auto" />
            <h3 className="text-lg md:text-xl font-bold mt-4 text-foreground">Free Advice</h3>
            <p className="text-sm md:text-base text-muted-foreground mt-2">Get expert advice tailored to your situation.</p>
          </div>
          <div className="p-4 md:p-6 bg-card rounded-md shadow-md text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <Image src="/placeholder-logo.png" alt="Placeholder for Trusted by Thousands Icon" width={80} height={80} className="mx-auto" />
            <h3 className="text-lg md:text-xl font-bold mt-4 text-foreground">Trusted by Thousands</h3>
            <p className="text-sm md:text-base text-muted-foreground mt-2">Over 250,000 people have trusted us to help them.</p>
          </div>
          <div className="p-4 md:p-6 bg-card rounded-md shadow-md text-center hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <Image src="/placeholder-logo.png" alt="Placeholder for Simple Process Icon" width={80} height={80} className="mx-auto" />
            <h3 className="text-lg md:text-xl font-bold mt-4 text-foreground">Simple Process</h3>
            <p className="text-sm md:text-base text-muted-foreground mt-2">Our process is quick, easy, and stress-free.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="py-12 md:py-16 bg-primary text-primary-foreground rounded-xl shadow-lg mx-4 md:mx-8 my-6 md:my-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/1690.jpg')" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Deal with your debt today. Feel better tomorrow.</h2>
          <p className="mt-4 mb-8 text-base md:text-lg">
            Taking care of debt is a big deal, so we've broken it down into small steps.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Step 1 */}
          <div className="p-4 md:p-6 bg-background text-foreground rounded-md shadow-md text-center space-y-3 md:space-y-4 hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto flex items-center justify-center rounded-full text-primary text-xl md:text-2xl font-bold">
              1
            </div>
            <h3 className="text-lg md:text-xl font-bold">Answer a few quick questions</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Use our easy online questionnaire to provide a few details about yourself and find out how much you can write off.
            </p>
          </div>
          {/* Step 2 */}
          <div className="p-4 md:p-6 bg-background text-foreground rounded-md shadow-md text-center space-y-3 md:space-y-4 hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto flex items-center justify-center rounded-full text-primary text-xl md:text-2xl font-bold">
              2
            </div>
            <h3 className="text-lg md:text-xl font-bold">Speak to a debt specialist</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              An advisor at UK Debt Expert, the debt advice arm of The Creditfix Group, will explain all of the available options on your free debt advice call.
            </p>
          </div>
          {/* Step 3 */}
          <div className="p-4 md:p-6 bg-background text-foreground rounded-md shadow-md text-center space-y-3 md:space-y-4 hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 md:w-16 md:h-16 mx-auto flex items-center justify-center rounded-full text-primary text-xl md:text-2xl font-bold">
              3
            </div>
            <h3 className="text-lg md:text-xl font-bold">Choose your plan</h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              You will be given a recommendation based on your situation and you can choose the best fit for your circumstances and lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-background text-foreground rounded-xl shadow-lg mx-4 md:mx-8 my-6 md:my-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-4 md:p-6 bg-card text-card-foreground rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-2">Expert Guidance</h3>
              <p className="text-sm md:text-base text-muted-foreground">Our team of experts will guide you every step of the way.</p>
            </div>
            <div className="p-4 md:p-6 bg-card text-card-foreground rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-2">Personalized Solutions</h3>
              <p className="text-sm md:text-base text-muted-foreground">We tailor our solutions to fit your unique financial situation.</p>
            </div>
            <div className="p-4 md:p-6 bg-card text-card-foreground rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-sm md:text-base text-muted-foreground">We have a track record of helping people achieve financial freedom.</p>
            </div>
            <div className="p-4 md:p-6 bg-card text-card-foreground rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-lg md:text-xl font-bold mb-2">Confidential & Secure</h3>
              <p className="text-sm md:text-base text-muted-foreground">Your information is always kept private and secure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground rounded-xl shadow-lg mx-4 md:mx-8 my-6 md:my-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">What Our Clients Say</h2>
          <TestimonialSlider />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-background text-foreground rounded-xl shadow-lg mx-4 md:mx-8 my-6 md:my-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-card p-4 rounded-md shadow-md">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left flex justify-between items-center focus:outline-none text-card-foreground"
                >
                  <span className="text-base md:text-lg font-semibold">{faq.question}</span>
                  <span>{expandedFaq === index ? "-" : "+"}</span>
                </button>
                {expandedFaq === index && (
                  <p className="mt-2 text-sm md:text-base text-muted-foreground">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trustpilot Section */}
      <section className="py-12 md:py-16 bg-card rounded-xl shadow-lg mx-4 md:mx-8 my-6 md:my-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Rated Excellent on Trustpilot</h2>
          <TrustpilotRating />
          <p className="text-sm md:text-base text-muted-foreground mt-4">Based on thousands of reviews from satisfied customers.</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground rounded-xl shadow-lg mx-4 md:mx-8 my-6 md:my-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Take Control of Your Debt?</h2>
          <p className="text-base md:text-lg mb-6">
            Find out how much you could write off today. It only takes a minute.
          </p>
          <Button 
            className="bg-background text-primary hover:bg-background/90 px-8 py-3 rounded-full font-semibold text-base md:text-lg"
            onClick={() => setShowForm(true)}
          >
            Check if You Qualify Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 md:py-8 bg-muted text-muted-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs md:text-sm">© 2025 {'<your company>'}. All rights reserved.</p>
          <div className="mt-4">
            <Link href="#" className="text-xs md:text-sm text-muted-foreground hover:text-primary mx-2">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs md:text-sm text-muted-foreground hover:text-primary mx-2">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs md:text-sm text-muted-foreground hover:text-primary mx-2">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
