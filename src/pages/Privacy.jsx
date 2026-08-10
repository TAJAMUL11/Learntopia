import { Link } from "react-router-dom";

const LAST_UPDATED = "July 24, 2026";

const SECTIONS = [
  {
    heading: "1. Introduction",
    body: [
      "This Privacy Policy explains how Learntopia (\"we\", \"us\", \"our\") collects, uses, stores, and protects your information when you use our website and services (the \"Service\"). We are committed to handling your data responsibly and to collecting only what is necessary to provide the Service.",
      "By using Learntopia, you agree to the practices described in this policy.",
    ],
  },
  {
    heading: "2. Information We Collect",
    body: ["We collect the following limited categories of information:"],
    list: [
      "Account information — your display name and email address, provided when you register or through your Google account if you use Google sign-in.",
      "Profile photo — only where one is provided by your Google account.",
      "Learning data — the courses you enrol in, your module and course progress, your quiz attempts and scores, and your daily login streak.",
      "Technical data — authentication session tokens required to keep you securely signed in.",
    ],
  },
  {
    heading: "3. How We Collect Information",
    body: [
      "We collect information directly from you when you create an account or use features of the Service, and automatically as you make progress through courses and quizzes. If you choose to sign in with Google, we receive basic profile details (name, email, and photo) from Google in accordance with your Google account settings.",
    ],
  },
  {
    heading: "4. How We Use Your Information",
    body: ["We use your information solely to operate and improve the Service, specifically to:"],
    list: [
      "Create and secure your account and maintain your authenticated session.",
      "Save and display your course enrolments, progress, and quiz scores on your dashboard.",
      "Calculate and display daily login streaks and leaderboard rankings.",
      "Provide the core educational features of the platform.",
      "Maintain the security, integrity, and reliability of the Service.",
    ],
  },
  {
    heading: "5. How We Store and Protect Your Data",
    body: [
      "Your data is stored using Google Firebase — specifically Firebase Authentication and the Cloud Firestore database. Access is governed by strict server-side security rules which ensure that your profile, progress, and quiz data can be read and written only by you while you are authenticated.",
      "Leaderboard data (display name and total score only) is stored in a separate collection and is readable by any authenticated user. Your email address, course progress, and quiz history are never exposed through the leaderboard.",
      "We take reasonable technical measures to protect your information; however, no method of transmission or storage is completely secure.",
    ],
  },
  {
    heading: "6. Data Sharing and Disclosure",
    body: ["We respect your privacy and limit disclosure of your data. Specifically:"],
    list: [
      "We do not sell, rent, or trade your personal information to anyone.",
      "We do not use your data for targeted advertising.",
      "We share data only with the infrastructure provider (Google Firebase) that processes and stores it on our behalf.",
      "We may disclose information if required to do so by law or to protect the rights, safety, or security of users and the Service.",
    ],
  },
  {
    heading: "7. Children's Privacy",
    body: [
      "Learntopia is intended for children and teenagers, so we take children's privacy especially seriously. We collect only the minimal information required to deliver the learning experience and never request unnecessary personal details. We encourage parents and guardians to supervise their child's use of the Service.",
      "A parent or guardian may contact us at any time to review, correct, or request deletion of a child's information, and we will act on such requests promptly.",
    ],
  },
  {
    heading: "8. Cookies and Similar Technologies",
    body: [
      "We use only the storage strictly necessary to keep you signed in between visits, such as authentication session data managed by Firebase. We do not use advertising or cross-site tracking cookies.",
    ],
  },
  {
    heading: "9. Data Retention",
    body: [
      "We retain your information for as long as your account remains active or as needed to provide the Service. When you request deletion of your account, we will remove your associated personal data, except where we are required to retain it to comply with a legal obligation.",
    ],
  },
  {
    heading: "10. Your Rights and Choices",
    body: ["Depending on your location, you may have rights in relation to your personal data, including the right to:"],
    list: [
      "Access the personal information we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your account and associated data.",
      "Withdraw consent for optional processing where applicable.",
    ],
  },
  {
    heading: "11. International Data Transfers",
    body: [
      "Because we use Google Firebase, your data may be processed and stored on servers located in other countries. Where data is transferred internationally, it remains subject to appropriate safeguards provided by the infrastructure provider.",
    ],
  },
  {
    heading: "12. Third-Party Services and Links",
    body: [
      "The Service depends on Google Firebase for authentication and storage, and your use of Google sign-in is also governed by Google's own privacy policy. The Service may occasionally reference third-party resources; we are not responsible for the privacy practices of those third parties.",
    ],
  },
  {
    heading: "13. Changes to This Policy",
    body: [
      'We may update this Privacy Policy from time to time. When we make material changes, we will revise the "Last updated" date at the top of this page and, where appropriate, provide additional notice. We encourage you to review this page periodically.',
    ],
  },
];

import { useLanguage } from "../context/LanguageContext";

const Privacy = () => {
  const { t } = useLanguage();

  return (
    <div className="container-page py-12 md:py-16">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-10">
          <span className="inline-block rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold uppercase tracking-widest text-ink-low mb-3">{t("privacy.badge")}</span>
          <h1 className="text-3xl font-bold tracking-tight text-ink-hi">{t("privacy.title")}</h1>
          <p className="mt-2 text-sm text-ink-low/60">{t("privacy.lastUpdated")}</p>
          <p className="mt-4 text-ink-low leading-relaxed text-sm border-l-2 border-violet-500/40 pl-4">
            {t("privacy.subtitle")}
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
        <p className="font-semibold text-ink-hi text-sm">Questions about your privacy?</p>
        <p className="mt-1.5 text-sm text-ink-low">
          Contact us at{" "}
          <a href="mailto:tajamul.270@gmail.com" className="text-violet-400 hover:underline underline-offset-2">
            Email Privacy Team
          </a>
          {" "}or review our{" "}
          <Link to="/terms" className="text-violet-400 hover:underline underline-offset-2">Terms of Service</Link>.
        </p>
      </div>

      </div>
    </div>
  );
};

export default Privacy;
