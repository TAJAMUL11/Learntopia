import { Link } from "react-router-dom";
import Card from "../Components/ui/Card";
import Icon from "../Components/ui/Icon";
import SectionHeading from "../Components/ui/SectionHeading";

const LAST_UPDATED = "July 21, 2026";

const SECTIONS = [
  {
    heading: "1. Introduction",
    body: [
      "This Privacy Policy explains how Learntopia (“we”, “us”, “our”) collects, uses, stores, and protects your information when you use our website and services (the “Service”). We are committed to handling your data responsibly and to collecting only what is necessary to provide the Service. By using Learntopia, you agree to the practices described in this policy.",
    ],
  },
  {
    heading: "2. Information we collect",
    body: ["We collect the following limited categories of information:"],
    list: [
      "Account information: your name and email address, provided when you register or through your Google account if you use Google sign-in.",
      "Profile information: a profile photo, only where one is provided by your Google account.",
      "Learning data: the courses you enrol in, your module and course progress, and your quiz attempts and scores.",
      "Technical data: basic information required to keep you securely signed in, such as an authentication session token.",
    ],
  },
  {
    heading: "3. How we collect information",
    body: [
      "We collect information directly from you when you create an account or use features of the Service, and automatically as you make progress through courses and quizzes. If you choose to sign in with Google, we receive basic profile details (name, email, and photo) from Google in accordance with your Google account settings.",
    ],
  },
  {
    heading: "4. How we use your information",
    body: ["We use your information solely to operate and improve the Service, specifically to:"],
    list: [
      "Create and secure your account and keep you signed in.",
      "Save and display your course enrolments, progress, and quiz scores on your dashboard.",
      "Provide the core educational features of the platform.",
      "Maintain the security, integrity, and reliability of the Service.",
    ],
  },
  {
    heading: "5. How we store and protect your data",
    body: [
      "Your data is stored using Google Firebase, specifically Firebase Authentication and the Cloud Firestore database. Access is governed by strict security rules which ensure that your profile, progress, and quiz data can be read and written only by you while you are authenticated. We take reasonable technical measures to protect your information; however, no method of transmission or storage is completely secure.",
    ],
  },
  {
    heading: "6. Data sharing and disclosure",
    body: ["We respect your privacy and limit disclosure of your data. Specifically:"],
    list: [
      "We do not sell, rent, or trade your personal information to anyone.",
      "We do not use your data for targeted advertising.",
      "We share data only with the infrastructure provider (Google Firebase) that processes and stores it on our behalf.",
      "We may disclose information if required to do so by law or to protect the rights, safety, or security of users and the Service.",
    ],
  },
  {
    heading: "7. Children's privacy",
    body: [
      "Learntopia is intended for children and teenagers, so we take children's privacy especially seriously. We collect only the minimal information required to deliver the learning experience and never request unnecessary personal details. We encourage parents and guardians to supervise their child's use of the Service. A parent or guardian may contact us at any time to review, correct, or request deletion of a child's information, and we will act on such requests promptly.",
    ],
  },
  {
    heading: "8. Cookies and similar technologies",
    body: [
      "We use only the storage strictly necessary to keep you signed in between visits, such as authentication session data managed by Firebase. We do not use advertising or cross-site tracking cookies.",
    ],
  },
  {
    heading: "9. Data retention",
    body: [
      "We retain your information for as long as your account remains active or as needed to provide the Service. When you request deletion of your account, we will remove your associated personal data, except where we are required to retain it to comply with a legal obligation.",
    ],
  },
  {
    heading: "10. Your rights and choices",
    body: ["Depending on your location, you may have rights in relation to your personal data, including the right to:"],
    list: [
      "Access the personal information we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your account and associated data.",
      "Withdraw consent for optional processing where applicable.",
    ],
  },
  {
    heading: "11. International data transfers",
    body: [
      "Because we use Google Firebase, your data may be processed and stored on servers located in other countries. Where data is transferred internationally, it remains subject to appropriate safeguards provided by the infrastructure provider.",
    ],
  },
  {
    heading: "12. Third-party services and links",
    body: [
      "The Service depends on Google Firebase for authentication and storage, and your use of Google sign-in is also governed by Google's own privacy policy. The Service may occasionally reference third-party resources; we are not responsible for the privacy practices of those third parties.",
    ],
  },
  {
    heading: "13. Changes to this policy",
    body: [
      "We may update this Privacy Policy from time to time. When we make material changes, we will revise the “Last updated” date at the top of this page and, where appropriate, provide additional notice. We encourage you to review this page periodically.",
    ],
  },
];

const Privacy = () => (
  <div className="container-page py-16 md:py-20">
    <div className="mx-auto max-w-3xl">
      <SectionHeading
        centered
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated ${LAST_UPDATED}`}
      />

      {/* Plain-language summary */}
      <Card className="mt-8 border-violet-500/20 bg-gradient-to-br from-violet-500/[0.06] to-transparent p-6">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-violet-300">
          <Icon name="shield" size={18} /> In plain words
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          We collect only what we need — your name, email, and learning progress — and store it
          securely with Google Firebase so that only you can access it. We never sell your data or
          show you ads. The full policy is below.
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
        <h2 className="text-lg font-bold text-ink-hi">Questions about your privacy?</h2>
        <p className="mt-1.5 text-sm text-ink-low">
          Contact us at{" "}
          <a href="mailto:tajamul.270@gmail.com" className="font-semibold text-sky hover:underline">
            tajamul.270@gmail.com
          </a>{" "}
          or read our{" "}
          <Link to="/terms" className="font-semibold text-sky hover:underline">Terms of Service</Link>.
        </p>
      </Card>
    </div>
  </div>
);

export default Privacy;
