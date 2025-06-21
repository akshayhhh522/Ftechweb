import SurveyForm from "./SurveyForm";
import Link from "next/link";

export default function SampleAlignedSection() {
  return (
    <section className="py-20 bg-[#f7f8fa] min-h-screen flex items-center justify-center">
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-10 items-stretch">
        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-12 flex-1 flex flex-col justify-center min-w-[350px] max-w-xl border border-gray-100">
          <SurveyForm />
        </div>
        {/* Tiles Section */}
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
  );
}
