import { Link } from "react-router-dom";
import Card from "../Components/ui/Card";
import Icon from "../Components/ui/Icon";
import SectionHeading from "../Components/ui/SectionHeading";

const LAST_UPDATED = "July 21, 2026";

const SECTIONS = [
  {
    heading: "1. Introduction and acceptance",
    body: [
      "These Terms of Service (the “Terms”) govern your access to and use of the Learntopia website, courses, quizzes, and related services (collectively, the “Service”). By creating an account or otherwise using the Service, you confirm that you have read, understood, and agree to be bound by these Terms and by our Privacy Policy, which is incorporated here by reference.",
      "If you do not agree with any part of these Terms, you must not access or use the Service.",
    ],
  },
  {
    heading: "2. Definitions",
    body: ["For clarity, the following terms are used throughout this document:"],
    list: [
      "“We”, “us”, and “our” refer to the operator of Learntopia.",
      "“You” and “User” refer to any person who accesses or uses the Service.",
      "“Content” refers to all courses, modules, exercises, quizzes, text, graphics, and other material made available through the Service.",
      "“Account” refers to the personal profile you create to access features of the Service.",
    ],
  },
  {
    heading: "3. Eligibility and parental consent",
    body: [
      "The Service is designed as an educational tool for children and teenagers. If you are a minor, you may use the Service only with the knowledge, involvement, and consent of a parent or legal guardian, who agrees to be responsible for your use of the Service and for compliance with these Terms.",
      "By using the Service, you represent that you have the legal capacity to enter into these Terms, or that a parent or guardian has provided the necessary consent on your behalf.",
    ],
  },
  {
    heading: "4. Account registration and security",
    body: [
      "To access certain features, you must create an Account using a valid email address or a supported third-party sign-in provider (such as Google). You agree to provide accurate and complete information and to keep it up to date.",
      "You are responsible for safeguarding your login credentials and for all activity that occurs under your Account. You must notify us promptly of any unauthorized use of, or access to, your Account. We are not liable for any loss arising from your failure to keep your credentials secure.",
    ],
  },
  {
    heading: "5. Acceptable use",
    body: ["You agree to use the Service only for lawful, educational purposes. In particular, you agree to:"],
    list: [
      "Use the courses, modules, and quizzes for genuine learning and self-assessment.",
      "Treat other users and the community with respect in any interaction.",
      "Comply with all applicable laws and these Terms while using the Service.",
      "Provide truthful information when creating and maintaining your Account.",
    ],
  },
  {
    heading: "6. Prohibited activities",
    body: ["You must not, and must not attempt to:"],
    list: [
      "Copy, reproduce, resell, or redistribute any Content without our prior written permission.",
      "Interfere with, disrupt, or gain unauthorized access to the Service, its servers, or its underlying systems.",
      "Circumvent, disable, or tamper with any security or progress-tracking feature of the Service.",
      "Use the Service to transmit harmful, unlawful, or malicious material, or to harass any person.",
      "Use automated means to access the Service in a way that places unreasonable load on our infrastructure.",
    ],
  },
  {
    heading: "7. Intellectual property",
    body: [
      "The Service and all Content, including the Learntopia name, logo, design, course materials, and software, are owned by us or our licensors and are protected by intellectual-property laws. Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Service and Content for your own personal, non-commercial learning.",
      "No other rights are granted. All rights not expressly granted to you are reserved by us.",
    ],
  },
  {
    heading: "8. Educational disclaimer",
    body: [
      "The Content is provided for general educational and informational purposes only. While we strive to keep it accurate and up to date, we make no warranty regarding the completeness or accuracy of any Content, and we do not guarantee any particular learning outcome, score, qualification, or result from using the Service.",
    ],
  },
  {
    heading: "9. Service availability and modifications",
    body: [
      "The Service is currently provided free of charge. We may add, modify, suspend, or discontinue any part of the Service at any time, and we may need to make the Service temporarily unavailable for maintenance or updates. We will make reasonable efforts to minimize disruption but are not liable for any unavailability of the Service.",
    ],
  },
  {
    heading: "10. Third-party services",
    body: [
      "The Service relies on third-party providers — including Google Firebase for authentication and data storage. Your use of such features may also be subject to the applicable third party's terms and policies. We are not responsible for the practices of third-party services.",
    ],
  },
  {
    heading: "11. Suspension and termination",
    body: [
      "We may suspend or terminate your access to the Service, with or without notice, if you breach these Terms or misuse the Service. You may stop using the Service and request deletion of your Account at any time. Provisions that by their nature should survive termination — including intellectual-property, disclaimer, and liability provisions — will continue to apply.",
    ],
  },
  {
    heading: "12. Disclaimer of warranties",
    body: [
      "The Service is provided on an “as is” and “as available” basis, without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by law.",
    ],
  },
  {
    heading: "13. Limitation of liability",
    body: [
      "To the maximum extent permitted by applicable law, we will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of data or goodwill, arising out of or related to your use of, or inability to use, the Service.",
    ],
  },
  {
    heading: "14. Indemnification",
    body: [
      "You agree to indemnify and hold us harmless from any claims, damages, or expenses arising out of your misuse of the Service or your breach of these Terms, to the extent permitted by applicable law.",
    ],
  },
  {
    heading: "15. Governing law",
    body: [
      "These Terms are governed by the laws applicable in the operator's jurisdiction, without regard to conflict-of-law principles. Any dispute arising from these Terms will be handled by the competent courts of that jurisdiction.",
    ],
  },
  {
    heading: "16. Changes to these Terms",
    body: [
      "We may update these Terms from time to time. When we make material changes, we will revise the “Last updated” date at the top of this page and, where appropriate, provide additional notice. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
];

const Terms = () => (
  <div className="container-page py-16 md:py-20">
    <div className="mx-auto max-w-3xl">
      <SectionHeading
        centered
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated ${LAST_UPDATED}`}
      />

      {/* Plain-language summary */}
      <Card className="mt-8 border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] to-transparent p-6">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-violet-300">
          <Icon name="info" size={18} /> In plain words
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          Learntopia is a free educational platform for kids and teens. Learn honestly, be
          respectful, keep your account secure, and don&rsquo;t copy or misuse the content. Minors
          should use it with a parent&rsquo;s consent. The full legal terms are below.
        </p>
      </Card>

      {/* Sections */}
      <div className="mt-8 space-y-6">
        {SECTIONS.map((s) => (
          <section key={s.heading}>
            <h2 className="text-lg font-bold text-ink-hi">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-2 leading-relaxed text-ink-low">{p}</p>
            ))}
            {s.list && (
              <ul className="mt-3 space-y-2">
                {s.list.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-ink-low">
                    <span className="mt-1 flex-none text-violet-400"><Icon name="check" size={15} /></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Contact */}
      <Card className="mt-10 p-6 text-center md:p-8">
        <h2 className="text-lg font-bold text-ink-hi">Questions about these Terms?</h2>
        <p className="mt-1.5 text-sm text-ink-low">
          Contact us at{" "}
          <a href="mailto:tajamul.270@gmail.com" className="font-semibold text-sky hover:underline">
            tajamul.270@gmail.com
          </a>{" "}
          or read our{" "}
          <Link to="/privacy" className="font-semibold text-sky hover:underline">Privacy Policy</Link>.
        </p>
      </Card>
    </div>
  </div>
);

export default Terms;
