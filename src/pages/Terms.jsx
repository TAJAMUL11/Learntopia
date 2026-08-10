import { Link } from "react-router-dom";

const LAST_UPDATED = "July 24, 2026";

const SECTIONS = [
  {
    heading: "1. Introduction and Acceptance",
    body: [
      'These Terms of Service ("Terms") govern your access to and use of the Learntopia website, courses, quizzes, and related services (collectively, the "Service"). By creating an account or otherwise using the Service, you confirm that you have read, understood, and agree to be bound by these Terms and by our Privacy Policy, which is incorporated here by reference.',
      "If you do not agree with any part of these Terms, you must not access or use the Service.",
    ],
  },
  {
    heading: "2. Definitions",
    body: ["For clarity, the following terms are used throughout this document:"],
    list: [
      '"We", "us", and "our" refer to the operator of Learntopia.',
      '"You" and "User" refer to any person who accesses or uses the Service.',
      '"Content" refers to all courses, modules, exercises, quizzes, text, graphics, and other material made available through the Service.',
      '"Account" refers to the personal profile you create to access features of the Service.',
    ],
  },
  {
    heading: "3. Eligibility and Parental Consent",
    body: [
      "The Service is designed as an educational tool for children and teenagers. If you are a minor, you may use the Service only with the knowledge, involvement, and consent of a parent or legal guardian, who agrees to be responsible for your use of the Service and for compliance with these Terms.",
      "By using the Service, you represent that you have the legal capacity to enter into these Terms, or that a parent or guardian has provided the necessary consent on your behalf.",
    ],
  },
  {
    heading: "4. Account Registration and Security",
    body: [
      "To access certain features, you must create an Account using a valid email address or a supported third-party sign-in provider (such as Google). You agree to provide accurate and complete information and to keep it up to date.",
      "You are responsible for safeguarding your login credentials and for all activity that occurs under your Account. You must notify us promptly of any unauthorized use of, or access to, your Account. We are not liable for any loss arising from your failure to keep your credentials secure.",
    ],
  },
  {
    heading: "5. Acceptable Use",
    body: ["You agree to use the Service only for lawful, educational purposes. In particular, you agree to:"],
    list: [
      "Use the courses, modules, and quizzes for genuine learning and self-assessment.",
      "Treat other users and the community with respect in any interaction.",
      "Comply with all applicable laws and these Terms while using the Service.",
      "Provide truthful information when creating and maintaining your Account.",
    ],
  },
  {
    heading: "6. Prohibited Activities",
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
    heading: "7. Intellectual Property",
    body: [
      "The Service and all Content — including the Learntopia name, logo, design, course materials, and software — are owned by us or our licensors and are protected by intellectual-property laws. Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable licence to access and use the Service and Content for your own personal, non-commercial learning.",
      "No other rights are granted. All rights not expressly granted to you are reserved by us.",
    ],
  },
  {
    heading: "8. Educational Disclaimer",
    body: [
      "The Content is provided for general educational and informational purposes only. While we strive to keep it accurate and up to date, we make no warranty regarding the completeness or accuracy of any Content, and we do not guarantee any particular learning outcome, score, qualification, or result from using the Service.",
    ],
  },
  {
    heading: "9. Service Availability and Modifications",
    body: [
      "The Service is currently provided free of charge. We may add, modify, suspend, or discontinue any part of the Service at any time, and we may need to make the Service temporarily unavailable for maintenance or updates. We will make reasonable efforts to minimize disruption but are not liable for any unavailability of the Service.",
    ],
  },
  {
    heading: "10. Third-Party Services",
    body: [
      "The Service relies on third-party providers — including Google Firebase for authentication and data storage. Your use of such features may also be subject to the applicable third party's terms and policies. We are not responsible for the practices of third-party services.",
    ],
  },
  {
    heading: "11. Suspension and Termination",
    body: [
      "We may suspend or terminate your access to the Service, with or without notice, if you breach these Terms or misuse the Service. You may stop using the Service and request deletion of your Account at any time. Provisions that by their nature should survive termination — including intellectual-property, disclaimer, and liability provisions — will continue to apply.",
    ],
  },
  {
    heading: "12. Disclaimer of Warranties",
    body: [
      'The Service is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement, to the maximum extent permitted by law.',
    ],
  },
  {
    heading: "13. Limitation of Liability",
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
    heading: "15. Governing Law",
    body: [
      "These Terms are governed by the laws applicable in the operator's jurisdiction, without regard to conflict-of-law principles. Any dispute arising from these Terms will be handled by the competent courts of that jurisdiction.",
    ],
  },
  {
    heading: "16. Changes to These Terms",
    body: [
      'We may update these Terms from time to time. When we make material changes, we will revise the "Last updated" date at the top of this page and, where appropriate, provide additional notice. Your continued use of the Service after changes take effect constitutes acceptance of the revised Terms.',
    ],
  },
];

import { useLanguage } from "../context/LanguageContext";

const Terms = () => {
  const { t } = useLanguage();

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-10">
          <span className="inline-block rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-ink-low mb-3">{t("terms.badge")}</span>
          <h1 className="text-3xl font-bold tracking-tight text-ink-hi">{t("terms.title")}</h1>
          <p className="mt-2 text-sm text-ink-low/60">{t("terms.lastUpdated")}</p>
          <p className="mt-4 text-sm text-ink-low leading-relaxed border-l-2 border-violet-500/40 pl-4">
            {t("terms.subtitle")}
          </p>
        </div>


      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.heading} id={s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
            <h2 className="text-lg font-bold text-ink-hi mb-3 pb-2 border-b border-white/[0.06]">{s.heading}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-ink-low mb-3 last:mb-0">{p}</p>
            ))}
            {s.list && (
              <ul className="mt-3 space-y-2">
                {s.list.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-low">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-violet-500/60" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* Contact footer */}
      <div className="mt-12 rounded-xl border border-white/[0.07] bg-white/[0.02] p-6">
        <p className="font-semibold text-ink-hi text-sm">Questions about these Terms?</p>
        <p className="mt-1.5 text-sm text-ink-low">
          Contact us at{" "}
          <a href="mailto:tajamul.270@gmail.com" className="text-violet-400 hover:underline underline-offset-2">
            Email Support
          </a>
          {" "}or review our{" "}
          <Link to="/privacy" className="text-violet-400 hover:underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>

      </div>
    </div>
  );
};

export default Terms;
