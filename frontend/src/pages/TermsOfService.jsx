import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-blue-100">Last updated: April 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8 text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By downloading, installing, or using the Travel Planner app or website ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p>Travel Planner is a travel planning platform that allows users to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Browse and search travel destinations</li>
              <li>Create and manage personal travel plans and itineraries</li>
              <li>Search and book flights and hotels</li>
              <li>Track travel budgets and expenses</li>
              <li>Read and write destination reviews</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Accounts</h2>
            <div className="space-y-3">
              <p>To use most features of the Service, you must create an account. You are responsible for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Providing accurate information during registration</li>
                <li>Keeping your password secure and confidential</li>
                <li>All activity that occurs under your account</li>
              </ul>
              <p>You must be at least 13 years old to create an account. We reserve the right to suspend or terminate accounts that violate these terms.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Payments and Bookings</h2>
            <div className="space-y-3">
              <p>Travel Planner facilitates flight and hotel bookings through our platform. By making a payment you agree that:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>All payments are processed securely by Stripe</li>
                <li>You are responsible for ensuring your payment details are accurate</li>
                <li>Prices are displayed in USD unless otherwise stated</li>
                <li>Bookings are confirmed upon successful payment</li>
              </ul>
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mt-3">
                <p className="text-yellow-800 font-medium">Refund Policy</p>
                <p className="text-yellow-700 text-sm mt-1">Refund eligibility depends on the specific flight or hotel provider's policies. Please contact us within 24 hours of booking if you wish to request a cancellation.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. User Content</h2>
            <p>When you submit a review or any other content to the Service, you:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Grant us a non-exclusive licence to display that content within the app</li>
              <li>Confirm the content is accurate and not misleading</li>
              <li>Agree not to post offensive, abusive, or illegal content</li>
              <li>Understand that reviews are visible to all users of the platform</li>
            </ul>
            <p className="mt-3">We reserve the right to remove any content that violates these terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Prohibited Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Use the Service for any unlawful purpose</li>
              <li>Attempt to access other users' accounts or data</li>
              <li>Submit false reviews or misleading information</li>
              <li>Use automated tools to scrape or overload our servers</li>
              <li>Resell or redistribute access to the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Disclaimer of Warranties</h2>
            <p>The Service is provided "as is" without warranties of any kind. Travel Planner does not guarantee:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>That flight or hotel prices are always up to date</li>
              <li>That the Service will be uninterrupted or error-free</li>
              <li>The accuracy of destination information or reviews posted by users</li>
            </ul>
            <p className="mt-3">Always verify bookings directly with the airline or hotel provider.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Travel Planner shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service, including but not limited to missed flights, incorrect bookings, or data loss.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to Terms</h2>
            <p>We reserve the right to update these Terms of Service at any time. Continued use of the Service after changes are posted constitutes your acceptance of the new terms. We will notify users of significant changes via email or in-app notification.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Governing Law</h2>
            <p>These Terms of Service are governed by and construed in accordance with the laws of the United Kingdom. Any disputes shall be resolved in the courts of the United Kingdom.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact Us</h2>
            <p>For any questions regarding these Terms of Service, please contact us at:</p>
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
