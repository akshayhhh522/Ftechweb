import React from "react";

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#f5f6fa] flex flex-col">
      <section className="flex-1 flex flex-col justify-center items-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-heroHeadline mb-6">
          Terms of Use
        </h1>
        <div className="max-w-2xl text-lg text-gray-700 text-left space-y-6">
          <p>
            The following terms and conditions will be deemed to have been accepted
            by the user on usage of this website. Please read them carefully
            before using the services of this site.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Subscription</h2>
          <p>
            Any User subscribing to, using, or accessing the services available
            through this site, is registered as a single user of the services.
            The applicable rate of the Subscription Fees for some of the services
            provided herein shall be such as mentioned on the site and/or as
            discussed with the concerned users from time to time. User’s Liability
            for the Subscription Fees, if any, shall accrue from the Date of
            Commencement.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            Processing of Transactions
          </h2>
          <p>
            All transactions/changes, as applied to/requested, by the user shall
            be processed as per the applicable rules, laws and regulations,
            business practices and as agreed with the users/clients.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            NAV applicability – Cut-off timings
          </h2>
          <p>
            As per SEBI circulars, the applicable NAV in respect of purchase of
            units of mutual fund scheme shall be subject to realization &
            availability of the funds in the bank account of mutual fund before
            the applicable cut off timings for purchase transactions, irrespective
            of the amount of investment, under ALL mutual fund schemes. (The above
            rule is already applicable for purchase transactions under Liquid
            funds and Overnight Funds). Ref: AMFI
          </p>
          <ul className="list-disc pl-6">
            <li>Subscription (Liquid and Overnight schemes): 1.30 PM</li>
            <li>Subscription (All other schemes): 3.00 PM</li>
            <li>Redemption (All schemes): 3.00 PM</li>
            <li>Switch (All schemes): 3.00 PM</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            Value of investments as stated on the site
          </h2>
          <p>
            The value of your investment(s) as stated on the site is based on
            yesterday’s published unit prices (NAV) and unit balance currently
            recorded. The unit price shown may differ from the actual unit price
            for your investment due to change in NAV. The unit balance may not
            include recent transactions that have not yet been processed.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Use of Password</h2>
          <p>
            If a User is given a password, the User shall ensure that such
            password is kept in a secure manner. The user shall take all
            necessary measures to protect the secrecy of their user identification
            and/or password and shall not reveal the same to any other person(s).
            In the event of theft and/or loss of user identification and/or
            password, the user shall notify us immediately. The user shall remain
            liable for use/misuse of the services by any third party until such
            theft or loss is notified.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            Unauthorised Access
          </h2>
          <p>
            As a condition for your use of this site, you will not use the site
            for any purpose that is unlawful or prohibited by these terms,
            conditions, and notices. You may not use the site in any manner that
            could damage, disable, overburden, or impair the network(s) connected
            to this site or interfere with any other party’s use and enjoyment of
            this site. You may not attempt to gain unauthorised access to this
            site, other accounts, computer systems or networks connected to the
            site, through hacking, password mining or any other means.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">
            Discontinuation or Modification to Services
          </h2>
          <p>
            We reserve the unilateral right to add to, change, delete, or end the
            service(s) available through the site at any time with or without
            notice to the User. Except for paid services, a pro-rated refund shall
            be affected for the remaining unused period.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Suspension of Service</h2>
          <p>
            If any monies payable by the user are not paid on the due date or if,
            at our sole discretion, any user is found to be using this site for
            illegal purposes or is observed having violated any of the terms and
            conditions, we may suspend the service(s) provided to such user.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Confidentiality</h2>
          <p>
            The User shall keep confidential and not disclose to any third party
            any confidential information, unless upon prior permission in
            writing. No use, reproduction, transformation or storage of the
            Proprietary Information shall be made by the user without prior
            written permission, except where required to be disclosed pursuant to
            any applicable laws or legal process.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Variation</h2>
          <p>
            We reserve the right to amend, vary or change the terms and
            conditions contained herein and appearing elsewhere on the site, upon
            notice (in such form as may be determined by us) to the user. The
            terms and conditions of use of this site will be periodically updated
            and changed and the changed or updated terms shall be posted at the
            site. The User should visit the site periodically to review the
            latest Terms of Use.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Termination</h2>
          <p>
            Either the user or we may terminate this arrangement by giving 10
            days prior notice in writing. It shall be at our discretion that the
            period of notice of 10 days may be waived or a shorter period of
            notice may be accepted in writing from the user.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Non-exclusive Remedy</h2>
          <p>
            Termination or expiration of this arrangement, in part or in whole,
            shall not limit either party from pursuing other remedies available to
            it, nor shall either party be relieved of its obligation to pay all
            fees that are due and owing through the effective date of termination.
            Neither party shall be liable to the other for any damages resulting
            solely from termination as permitted herein.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-2">Governing Law</h2>
          <p>
            Any dispute arising out of this arrangement shall be governed by the
            Laws of India. The Courts of law at Hyderabad shall have exclusive
            jurisdiction over any disputes arising under this arrangement.
          </p>
        </div>
      </section>
    </main>
  );
}