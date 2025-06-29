"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FinovateHeroSection from "@/components/ui/FinovateHeroSection"; // Import the new hero
import { Button } from "@/components/ui/button";
import TrustpilotRating from "@/components/trustpilot-rating";
import TestimonialSlider from "@/components/testimonial-slider";
import dynamic from "next/dynamic";
import Card from "@/components/ui/StyledCard";
import DebtAdviceSection from "@/components/DebtAdviceSection";
import { HeartHandshake, Briefcase, ShieldCheck, Lightbulb, TrendingUp, Users } from 'lucide-react'; // Added more icons
import FraudAlertPopup from "@/components/ui/FraudAlertPopup";
import SurveyForm from "./SurveyForm";

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
    // The main div with bg-primary is already set in layout.tsx body
    <>
      <FinovateHeroSection /> {/* Replace old hero sections with the new one */}
      <FraudAlertPopup />
      {/* Debt Advice Form & Info Cards Section (Updated) */}
      <section className="py-20 bg-[#f7f8fa] min-h-screen flex items-center justify-center" id="debt-advice">
        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-10 items-stretch px-4 sm:px-6">
          {/* Left: Debt Advice Form */}
          <div className="bg-white rounded-2xl shadow-xl p-12 flex-1 flex flex-col justify-center min-w-[350px] max-w-xl border border-gray-100">
            <SurveyForm />
          </div>
          {/* Right: Debt Solution Tiles */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-heroHeadline mb-2">Explore Your Options</h3>
              <p className="text-gray-600 text-base max-w-2xl">Discover the best debt solutions for your situation. Click to learn more about each option and see how DebtPlus can help you regain control of your finances.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 h-full">
              {[{
                href: "/debt-management-plan",
                title: "Debt Management Plan",
                desc: "A Debt Management Plan (DMP) is an informal agreement between you and your creditors, where you arrange to pay off your debts through lower monthly payments than your contractual payments."
              }, {
                href: "/iva",
                title: "Individual Voluntary Arrangement",
                desc: "An IVA is a legally binding agreement set up between you and your creditors for you to repay an amount you can afford over a fixed period of time; usually around five years. It allows any unsecured debts to be written off at the end of the IVA."
              }, {
                href: "/self-employed-iva",
                title: "Self-employed IVA",
                desc: "A self-employed IVA (Individual Voluntary Arrangement) is a legally binding agreement between you and your creditors. It helps you avoid bankruptcy by paying off part of your debt over a fixed period of time."
              }, {
                href: "/trust-deed",
                title: "Trust deed",
                desc: "A Trust Deed is a legally binding formal arrangement between you and your creditors to repay some of your unsecured debts. Available only in Scotland."
              }].map(tile => (
                <Link
                  key={tile.href}
                  href={tile.href}
                  className="group rounded-2xl p-8 bg-white border border-gray-100 shadow-md flex flex-col min-h-[260px] h-full transition-transform hover:-translate-y-1 hover:shadow-xl focus:ring-2 focus:ring-heroAccent"
                >
                  <h4 className="text-xl font-semibold text-heroHeadline mb-2 group-hover:text-heroAccent">{tile.title}</h4>
                  <p className="text-base text-gray-700 mb-4 flex-1">{tile.desc}</p>
                  <span className="font-medium text-heroAccent underline underline-offset-4 flex items-center gap-1 group-hover:text-heroAccent">Learn more <span aria-hidden>→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* End Debt Advice Form & Info Cards Section (Updated) */}

      {/* Feature/Value Proposition Section - Example */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 space-y-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold text-heroHeadline mb-4">
              Why Choose Us for Your <span className="text-heroAccent">Financial</span> Needs?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We offer a comprehensive suite of services designed to provide clarity, support, and results, helping you navigate your financial journey with confidence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              title="Innovative Solutions"
              icon={<Lightbulb size={40} className="text-heroAccent" />}
            >
              Leveraging the latest financial technologies and strategies to provide you with cutting-edge solutions for debt management and wealth creation. Our solutions have collectively helped customers save well over a million euros.
            </Card>
            <Card 
              title="Proven Track Record"
              icon={<TrendingUp size={40} className="text-heroAccent" />}
            >
              Our experts have a history of successfully guiding clients towards their financial goals, with measurable results. We have served over 5,000 satisfied customers.
            </Card>
            <Card 
              title="Client-Centric Approach"
              icon={<Users size={40} className="text-heroAccent" />}
            >
              Your needs are at the heart of what we do. We listen, understand, and tailor our services to your unique financial situation and aspirations.
            </Card>
          </div>
        </div>
      </section>

      {/* Contrast banner section - Re-styled to match Finovate */}
      <section className="py-20 bg-contrastLightGray">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 text-center ring-1 ring-gray-200/50">
            <h2 className="text-4xl md:text-5xl font-semibold text-heroHeadline mb-6">
              Ready to Improve Your <span className="text-heroAccent">Financial</span> Outlook?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
              Take the first step towards a brighter financial future. Our experts are here to guide you with personalized advice and effective solutions.
            </p>
            <Button
              asChild
              className="bg-[#bada55] text-heroHeadline rounded-full px-10 py-7 text-xl font-semibold shadow transition hover:bg-[#bada55] hover:text-heroHeadline hover:scale-105"
            >
              <a href="#debt-advice">Get Started Now</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - New Design */}
      <footer className="bg-heroButtonPrimary text-gray-200 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/career-with-us" className="hover:text-white transition-colors">Career with Us</Link></li>
            </ul>
          </div>

          {/* Column 2: Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li><Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li><Link href="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
            </ul>
          </div>

          {/* Column 4: Refer & Earn */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">REFER & EARN</h3>
            <ul className="space-y-2">
              <li><Link href="/refer-a-friend" className="hover:text-white transition-colors">Refer a Friend & Earn</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm">
          <p>© 2025 DebtPlus. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
