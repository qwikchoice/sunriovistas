import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions — SunRio Vistas',
  description: 'Terms and conditions for SunRio Vistas RV glamping bookings near Folsom Lake, California.',
}

const sections = [
  {
    title: '1. Nature of Service',
    content: `SunRio Vistas provides stationary RV glamping experiences in Northern California. Guests ("you") drive your own vehicle to a campground or designated site where our RV has been delivered and set up prior to your arrival. You do not drive, tow, or operate the RV in any way. SunRio Vistas ("we," "our," "the company") retains full ownership and responsibility for all RV equipment.`,
  },
  {
    title: '2. Booking & Approval',
    content: `All bookings are subject to manual review and approval by our team. Submitting a booking request does not constitute a confirmed reservation. We reserve the right to approve or reject any booking request at our discretion. You will receive notification of approval or rejection within 24 hours of your request. A confirmed booking requires receipt of your deposit payment via the Stripe payment link we send upon approval.`,
  },
  {
    title: '3. Payment Terms',
    content: `Upon approval, you will receive a Stripe payment link for your deposit. The deposit amount is set at the time of booking. The remaining balance will be automatically charged to your stored payment method on the day of check-in. A mandatory cleaning fee of $60 is added to every booking and is non-refundable once your stay has begun. All prices are in US dollars and subject to change.`,
  },
  {
    title: '4. Minimum Stay',
    content: `A minimum of 2 nights is required for all bookings. Single-night stays are not available due to the logistics involved in RV delivery, setup, and retrieval.`,
  },
  {
    title: '5. Cancellation & Refund Policy',
    content: `Cancellations are subject to the following refund schedule based on the number of days before your check-in date:\n\n• 14 or more days before check-in: Full refund\n• 7–13 days before check-in: 50% refund\n• 48 hours to 6 days before check-in: 25% refund\n• Less than 48 hours before check-in: No refund\n\nThe $60 cleaning fee is non-refundable once your stay has commenced. Campground fees paid directly to campgrounds are subject to the individual campground's cancellation policy, which is outside our control.`,
  },
  {
    title: '6. Campground Fees',
    content: `Campground fees are paid directly to the campground, host, or relevant authority by you (the guest). These fees are NOT collected by SunRio Vistas and are NOT included in your booking total. Fee estimates shown on our website are for informational purposes only. We make no guarantee as to the accuracy of campground fee information. Always confirm current rates directly with the campground or host.`,
  },
  {
    title: '7. Check-In & Check-Out',
    content: `Standard check-in time is 3:00 PM. Standard check-out time is 11:00 AM. The RV will be delivered and set up prior to your check-in time. You must vacate the RV and surrounding site by check-out time to allow us to retrieve the unit. Early check-in and late check-out may be available as optional add-ons at an additional fee, subject to availability. Unauthorized overstays may result in additional charges.`,
  },
  {
    title: '8. Guest Conduct & Responsibilities',
    content: `You are responsible for the conduct of all guests in your party during your stay. You agree to treat the RV and all equipment with care and to follow all campground rules and regulations. Smoking inside any RV is strictly prohibited and will result in a minimum cleaning surcharge of $300. Excessive damage beyond normal wear and tear will be charged to your stored payment method. You agree not to exceed the maximum guest occupancy stated for your booked RV.`,
  },
  {
    title: '9. Pets',
    content: `Pets are permitted in designated pet-friendly bookings only. A pet fee applies and must be declared at the time of booking. Undisclosed pets may result in additional charges. You are responsible for ensuring your pets comply with campground pet policies. Pets must not be left unattended inside the RV. Damage caused by pets will be charged accordingly.`,
  },
  {
    title: '10. Liability & Indemnification',
    content: `SunRio Vistas provides the RV in good working condition. We are not liable for any injury, loss, damage, or claim arising from your use of the RV or your stay at any campground, except where required by applicable law. You use the campsite, surrounding areas, and any outdoor activities entirely at your own risk. You agree to indemnify and hold SunRio Vistas harmless from any claims arising from your actions or the actions of your guests during your booking.`,
  },
  {
    title: '11. Modifications to Terms',
    content: `We reserve the right to update these Terms & Conditions at any time. The version of the Terms in effect at the time of your booking confirmation governs your stay. We will note the effective date of any updated Terms. Continued use of the platform constitutes acceptance of any revised Terms.`,
  },
  {
    title: '12. Governing Law',
    content: `These Terms & Conditions are governed by the laws of the State of California, USA. Any disputes shall be resolved in the courts of Sacramento County, California.`,
  },
  {
    title: '13. Contact',
    content: `For questions about these Terms, contact us at sunriovistas@gmail.com.`,
  },
]

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>

        {/* Hero */}
        <section className="relative pt-32 pb-16 bg-earth-950 overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <span className="inline-block text-brand-400 text-sm font-bold uppercase tracking-widest mb-4">
              Legal
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
              Terms & Conditions
            </h1>
            <p className="text-earth-400 text-base">
              Effective: January 1, 2025 · Version 1.0
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">

            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-earth-500 hover:text-brand-600 mb-10 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>

            <div className="prose prose-earth max-w-none space-y-8">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
                <p className="text-sm text-amber-800 leading-relaxed">
                  <span className="font-semibold">Please read these terms carefully before booking.</span> By submitting a booking request and checking the agreement checkbox, you agree to be bound by these Terms & Conditions.
                </p>
              </div>

              {sections.map((section) => (
                <div key={section.title} className="border-b border-earth-100 pb-8 last:border-0">
                  <h2 className="font-display text-xl font-bold text-earth-900 mb-4">{section.title}</h2>
                  <div className="text-earth-600 text-sm leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-earth-50 rounded-3xl p-6 border border-earth-100 text-center">
              <p className="text-sm text-earth-600 mb-4">
                Ready to book? By proceeding, you agree to these Terms & Conditions.
              </p>
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3.5 rounded-full transition-all hover:shadow-glow text-sm"
              >
                Check Availability
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
