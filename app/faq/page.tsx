'use client';

import React from "react";

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

export default function FAQPage() {
	const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

	function toggleFaq(index: number) {
		setExpandedFaq((prev) => (prev === index ? null : index));
	}

	return (
		<div className="max-w-3xl mx-auto py-16 px-4">
			<h1 className="text-4xl font-bold mb-8 text-center">
				Frequently Asked Questions
			</h1>
			<div className="space-y-4">
				{faqData.map((faq, idx) => (
					<div key={idx} className="border rounded-lg bg-white shadow">
						<button
							className="w-full text-left px-6 py-4 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 flex justify-between items-center"
							onClick={() => toggleFaq(idx)}
							aria-expanded={expandedFaq === idx}
							aria-controls={`faq-panel-${idx}`}
						>
							{faq.question}
							<span className="ml-2">
								{expandedFaq === idx ? "-" : "+"}
							</span>
						</button>
						{expandedFaq === idx && (
							<div
								id={`faq-panel-${idx}`}
								className="px-6 pb-4 text-gray-700 text-base"
							>
								{faq.answer}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}