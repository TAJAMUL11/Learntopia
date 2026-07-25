import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Icon from "../Components/ui/Icon";

// ─── Static data ─────────────────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    icon: "mail",
    label: "Email us directly",
    value: "tajamul.270@gmail.com",
    href: "mailto:tajamul.270@gmail.com",
    color: "from-violet-500/20 to-purple-600/10 border-violet-500/20",
    iconColor: "text-violet-400",
    glow: "bg-violet-600/10",
  },
  {
    icon: "clock",
    label: "Response time",
    value: "Within 1–2 business days",
    color: "from-sky-500/20 to-blue-600/10 border-sky-500/20",
    iconColor: "text-sky-400",
    glow: "bg-sky-600/10",
  },
  {
    icon: "book",
    label: "Documentation",
    value: "Read the docs →",
    to: "/doc",
    color: "from-emerald-500/20 to-teal-600/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    glow: "bg-emerald-600/10",
  },
  {
    icon: "shield",
    label: "Data privacy",
    value: "Your message is stored securely on our servers — never shared.",
    color: "from-amber-500/20 to-orange-600/10 border-amber-500/20",
    iconColor: "text-amber-400",
    glow: "bg-amber-600/10",
  },
];

const MAX_MSG = 1000;

// ─── Component ────────────────────────────────────────────────────────────────
const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MSG) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    else if (formData.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "ContactMessages"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || "(no subject)",
        message: formData.message.trim(),
        submittedAt: serverTimestamp(),
      });
      // Navigate to dedicated Thank You page, pass name via state
      navigate("/thank-you", { state: { name: formData.name.trim() } });
    } catch (err) {
      console.error("Contact form error:", err);
      setErrors({ form: "Something went wrong. Please try again or email us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase = (hasError) =>
    `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[0.95rem] text-ink-hi outline-none
     transition-all duration-200 placeholder:text-ink-low focus:bg-white/[0.05] focus:ring-2
     ${
       hasError
         ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
         : "border-white/[0.08] focus:border-violet-500 focus:ring-violet-500/25"
     }`;

  return (
    <div className="container-page py-16 md:py-24">

      {/* ── Page header ── */}
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-violet-400">
          <Icon name="message-circle" size={13} /> Get in touch
        </span>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-ink-hi sm:text-5xl">
          We'd love to{" "}
          <span className="bg-gradient-to-r from-violet-400 to-sky bg-clip-text text-transparent">
            hear from you
          </span>
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink sm:text-lg">
          Have a question, spotted a bug, or want to suggest a course? Drop us a message and we'll
          get back to you shortly.
        </p>
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.5fr]">

        {/* ── Left: info sidebar ── */}
        <div className="flex flex-col gap-4">
          {CONTACT_CARDS.map((card) => (
            <div
              key={card.label}
              className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_-4px_rgba(139,99,227,0.18)] ${card.color}`}
            >
              <div className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full blur-2xl ${card.glow}`} />
              <div className="flex items-start gap-4">
                <div className={`grid h-11 w-11 flex-none place-items-center rounded-xl border border-white/[0.1] bg-white/[0.05] ${card.iconColor}`}>
                  <Icon name={card.icon} size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-low">
                    {card.label}
                  </p>
                  {card.href ? (
                    <a
                      href={card.href}
                      className="mt-1 block truncate text-sm font-medium text-ink-hi transition-colors hover:text-violet-400"
                    >
                      {card.value}
                    </a>
                  ) : card.to ? (
                    <Link
                      to={card.to}
                      className="mt-1 block text-sm font-medium text-ink-hi transition-colors hover:text-violet-400"
                    >
                      {card.value}
                    </Link>
                  ) : (
                    <p className="mt-1 text-sm leading-snug text-ink-hi">{card.value}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Right: form ── */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7 backdrop-blur-md md:p-9">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/8 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-sky-600/6 blur-3xl" />

          <div className="relative mb-7">
            <h2 className="text-xl font-bold text-ink-hi">Send a message</h2>
            <p className="mt-1 text-sm text-ink-low">
              Fill in the details below — we read every message.
            </p>
          </div>

          {errors.form && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              <Icon name="warning" size={16} className="mt-0.5 flex-none" />
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-5">

            {/* Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-low"
                >
                  Your name <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputBase(!!errors.name)}
                />
                {errors.name && (
                  <span className="flex items-center gap-1 text-xs text-red-400">
                    <Icon name="info" size={12} /> {errors.name}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-low"
                >
                  Email address <span className="text-red-400">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputBase(!!errors.email)}
                />
                {errors.email && (
                  <span className="flex items-center gap-1 text-xs text-red-400">
                    <Icon name="info" size={12} /> {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="contact-subject"
                className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-low"
              >
                Subject{" "}
                <span className="text-[10px] normal-case tracking-normal text-ink-low/50">
                  (optional)
                </span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="e.g. Course suggestion, Bug report…"
                value={formData.subject}
                onChange={handleChange}
                className={inputBase(false)}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-low"
                >
                  Your message <span className="text-red-400">*</span>
                </label>
                <span
                  className={`text-xs tabular-nums ${
                    formData.message.length >= MAX_MSG * 0.9 ? "text-amber-400" : "text-ink-low"
                  }`}
                >
                  {formData.message.length}/{MAX_MSG}
                </span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                placeholder="Describe your question or feedback in detail…"
                value={formData.message}
                onChange={handleChange}
                className={`${inputBase(!!errors.message)} resize-none`}
              />
              {errors.message && (
                <span className="flex items-center gap-1 text-xs text-red-400">
                  <Icon name="info" size={12} /> {errors.message}
                </span>
              )}
            </div>

            {/* Privacy note */}
            <p className="text-xs text-ink-low">
              By submitting, you agree to our{" "}
              <Link to="/privacy" className="text-violet-400 hover:text-violet-300">
                Privacy Policy
              </Link>
              . We only use your email to respond to your message.
            </p>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_-4px_rgba(139,99,227,0.5)] transition-all duration-200 hover:brightness-110 hover:shadow-[0_4px_28px_-4px_rgba(139,99,227,0.65)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                    />
                  </svg>
                  Sending…
                </>
              ) : (
                <>
                  <Icon name="arrow" size={17} />
                  Send message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
