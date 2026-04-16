import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-blue-100">Last updated: April 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
            <p>Travel Planner ("we", "us", "our") is a travel planning application that helps users discover destinations, plan trips, book flights and hotels, track budgets, and share reviews. This Privacy Policy explains how we collect, use, and protect your personal data when you use our app or website.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-800">Account Information</p>
                <p>When you register, we collect your name and email address. This is used to create and manage your account.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Travel Plans & Budget Data</p>
                <p>Any travel plans, destinations, expenses, and budget items you create are stored securely in our database and linked to your account.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Booking Information</p>
                <p>When you make a booking, we record the booking type, title, and amount. Payment details (card numbers) are never stored by us — they are handled entirely by Stripe, our payment provider.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Reviews</p>
                <p>Reviews you submit, including your name and the destination reviewed, are stored and displayed publicly within the app.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Profile Photo</p>
                <p>If you upload a profile photo, it is stored securely via Supabase Storage.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To create and manage your account</li>
              <li>To save and display your travel plans, bookings, and budget items</li>
              <li>To process payments securely via Stripe</li>
              <li>To display reviews to other users</li>
              <li>To send password reset emails when requested</li>
              <li>To improve and maintain the app</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Third-Party Services</h2>
            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-800">Supabase</p>
                <p>We use Supabase for authentication and database storage. Your data is stored on Supabase's secure servers. See <a href="https://supabase.com/privacy" className="text-blue-600 underline" target="_blank" rel="noreferrer">Supabase's Privacy Policy</a>.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Stripe</p>
                <p>All payments are processed by Stripe. We never see or store your full card details. See <a href="https://stripe.com/privacy" className="text-blue-600 underline" target="_blank" rel="noreferrer">Stripe's Privacy Policy</a>.</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Google Places API</p>
                <p>We use Google Places to power destination search. Search queries are sent to Google's servers. See <a href="https://policies.google.com/privacy" className="text-blue-600 underline" target="_blank" rel="noreferrer">Google's Privacy Policy</a>.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Retention</h2>
            <p>Your data is kept for as long as your account is active. You may delete your account at any time by contacting us, after which your personal data will be permanently removed from our systems within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your data</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at the email below.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Security</h2>
            <p>We take data security seriously. All data is transmitted over HTTPS, passwords are managed by Supabase Auth (never stored in plain text), and payment data is handled exclusively by Stripe's PCI-compliant infrastructure.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Children's Privacy</h2>
            <p>Travel Planner is not intended for use by anyone under the age of 13. We do not knowingly collect personal data from children under 13.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Last updated" date at the top of this page.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <div className="mt-3 p-4 bg-blue-50 rounded-lg">
              <p className="font-semibold text-gray-900">Travel Planner</p>
              <p className="text-blue-600">support@travelplanner.app</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
