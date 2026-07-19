import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../Components/ui/Card";
import Button from "../Components/ui/Button";
import Field from "../Components/ui/Field";
import Icon from "../Components/ui/Icon";
import SectionHeading from "../Components/ui/SectionHeading";

const CONTACT_POINTS = [
  { icon: "mail", label: "Email us", value: "tajamul.270@gmail.com", href: "mailto:tajamul.270@gmail.com" },
  { icon: "clock", label: "Response time", value: "Within 1–2 business days" },
  { icon: "book", label: "Documentation", value: "Read the docs", to: "/doc" },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Thanks! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-page py-16 md:py-20">
      <SectionHeading
        centered
        eyebrow="Get in touch"
        title="Contact us"
        description="Have questions or feedback? Drop us a line and we'll get back to you shortly."
      />

      <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.3fr]">
        {/* Info column */}
        <div className="flex flex-col gap-4">
          {CONTACT_POINTS.map((point) => (
            <Card key={point.label} className="flex items-center gap-4 p-5">
              <div className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-white/[0.08] bg-white/[0.05] text-violet-400">
                <Icon name={point.icon} size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-low">{point.label}</p>
                {point.href ? (
                  <a href={point.href} className="mt-0.5 block truncate text-sm font-medium text-ink-hi transition-colors hover:text-sky">
                    {point.value}
                  </a>
                ) : point.to ? (
                  <Link to={point.to} className="mt-0.5 block text-sm font-medium text-ink-hi transition-colors hover:text-sky">
                    {point.value}
                  </Link>
                ) : (
                  <p className="mt-0.5 text-sm font-medium text-ink-hi">{point.value}</p>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Form */}
        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Field
              label="Your name"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <Field
              label="Email address"
              id="email"
              name="email"
              type="email"
              icon="mail"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <Field
              label="Your message"
              id="message"
              name="message"
              textarea
              rows={5}
              placeholder="How can we help you?"
              required
              value={formData.message}
              onChange={handleChange}
            />
            <Button type="submit" fullWidth loading={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send message"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
