import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — DevEx Tools Hub",
  description:
    "Read the Terms of Service for DevEx Tools Hub. By using our directory platform, you agree to these terms governing your use of the website and services.",
};

export default function TermsPage() {
  return (
    <div className="relative pt-32 pb-20 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#3B82F6] bg-[#162440] px-3 py-1.5 rounded-md mb-4">
            Legal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#F0F4F8] tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-[#8BA3BE] text-sm">
            Last updated: May 13, 2026
          </p>
        </div>

        <div className="space-y-8 text-[#8BA3BE] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the DevEx Tools Hub website (the "Site"), you agree to be
              bound by these Terms of Service ("Terms"). If you do not agree to all of these
              Terms, you are prohibited from using the Site. We reserve the right to modify these
              Terms at any time, and your continued use constitutes acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">2. Description of Service</h2>
            <p>
              DevEx Tools Hub is a curated directory platform that provides information,
              comparisons, reviews, and pricing details about developer experience and engineering
              tools. Our platform serves as a research and discovery resource for engineering teams. We do not
              sell, license, or distribute the software products listed on our Site unless
              explicitly stated otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">3. User Accounts and Registration</h2>
            <p className="mb-3">
              Certain features of the Site may require account registration. When creating an
              account, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, current, and complete registration information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
            <p className="mt-3">
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">4. User Conduct</h2>
            <p className="mb-3">You agree not to use the Site to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws, regulations, or third-party rights</li>
              <li>Submit false, misleading, or fraudulent information, including fake reviews</li>
              <li>Upload or transmit viruses, malware, or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems or user accounts</li>
              <li>Scrape, crawl, or data-mine the Site without our express written permission</li>
              <li>Send unsolicited communications (spam) through or about our platform</li>
              <li>Harass, abuse, or harm other users or our staff</li>
              <li>Interfere with the proper functioning of the Site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">5. Intellectual Property</h2>
            <p className="mb-3">
              The Site and its original content, features, and functionality — including but not
              limited to the layout, design, logos, trademarks, database structure, and written
              content — are owned by DevEx Tools Hub and are protected by international
              copyright, trademark, and intellectual property laws.
            </p>
            <p>
              Product names, logos, and brand names listed on our directory are the property of
              their respective owners. Our use of these trademarks is for identification and
              informational purposes only and does not imply endorsement or affiliation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">6. Tool Listings and Reviews</h2>
            <p className="mb-3">
              Information about tools listed on our platform is gathered from public sources,
              vendor-provided data, and user-submitted reviews. We strive for accuracy but make
              no guarantees regarding the completeness or accuracy of third-party information.
            </p>
            <p className="mb-3">
              User reviews reflect the opinions of individual users and do not represent the views
              of DevEx Tools Hub. We reserve the right to moderate, edit, or remove reviews
              that violate our content guidelines or Terms.
            </p>
            <p>
              Vendor listings may be based on paid partnerships or organic curation. Sponsored
              listings are clearly marked as such. We maintain editorial independence in our
              ratings and reviews.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">7. Third-Party Links and Services</h2>
            <p>
              Our Site contains links to third-party websites and services that are not owned or
              controlled by DevEx Tools Hub. We have no control over, and assume no
              responsibility for, the content, privacy policies, or practices of any third-party
              sites. You acknowledge that we shall not be liable for any damages or losses caused
              by your use of third-party services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">8. Subscription and Pricing Information</h2>
            <p className="mb-3">
              Pricing information displayed on our platform is based on publicly available data
              and may not reflect current pricing. Prices are subject to change by the respective
              vendors. We encourage users to verify pricing directly with the tool provider.
            </p>
            <p>
              DevEx Tools Hub offers free access to our directory and comparison features.
              Premium features or advertising services may be offered at additional cost in the
              future. Any paid services will be governed by separate terms provided at the time
              of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, DevEx Tools Hub, its officers, directors,
              employees, and affiliates shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or relating to your use of the
              Site. This includes, without limitation, loss of profits, data, use, or goodwill.
              Our total liability shall not exceed $100.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">10. Disclaimer of Warranties</h2>
            <p>
              The Site and all content are provided on an "as is" and "as available" basis
              without warranties of any kind, either express or implied, including but not limited
              to merchantability, fitness for a particular purpose, or non-infringement. We do
              not warrant that the Site will be uninterrupted, error-free, secure, or free of
              viruses or other harmful components.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">11. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless DevEx Tools Hub and its
              affiliates, officers, agents, and employees from any claims, damages, losses,
              liabilities, and expenses (including reasonable attorneys' fees) arising out of
              your use of the Site, your violation of these Terms, or your violation of any
              third-party rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">12. Termination</h2>
            <p>
              We may terminate or suspend your access to the Site immediately, without prior
              notice or liability, for any reason, including breach of these Terms. Upon
              termination, your right to use the Site will cease immediately. Provisions of these
              Terms that by their nature should survive termination shall survive, including
              intellectual property provisions, disclaimers, and limitations of liability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">13. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              State of California, without regard to its conflict of law provisions. Any disputes
              arising under these Terms shall be resolved in the federal or state courts located
              in San Francisco, California.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#F0F4F8] mb-3">14. Contact Information</h2>
            <div className="mt-4 p-5 bg-[#0F1D32] border border-[#1E3A5F] rounded-xl">
              <p className="mb-2"><strong className="text-[#F0F4F8]">Email:</strong> legal@devex-tools.net</p>
              <p className="mb-2"><strong className="text-[#F0F4F8]">Support:</strong> support@devex-tools.net</p>
              <p><strong className="text-[#F0F4F8]">Address:</strong> 400 1st Ave S, Suite 300, Seattle, WA 98104</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
