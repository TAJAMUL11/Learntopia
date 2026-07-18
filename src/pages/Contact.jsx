import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import gsap from "gsap";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out" }
      );
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("Thank you! Your message has been sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 py-12 flex flex-col items-center justify-center min-h-[80vh] select-none text-white">
      <div
        ref={containerRef}
        className="w-full max-w-lg background-blur p-6 md:p-8 rounded-3xl border border-light-bg-color shadow-custom-shadow"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">Contact Us</h1>
          <p className="text-xs md:text-sm text-gray-400 mt-2">
            {"Have questions or feedback? Drop us a line and we'll reply shortly."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="inputContainers">
            <label htmlFor="name" className="inputLabels">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="inputbox"
            />
          </div>

          {/* Email Field */}
          <div className="inputContainers">
            <label htmlFor="email" className="inputLabels">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="inputbox"
            />
          </div>

          {/* Message Field */}
          <div className="inputContainers">
            <label htmlFor="message" className="inputLabels">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              required
              rows={4}
              className="inputbox resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-style py-3 font-semibold uppercase tracking-wider text-xs shadow-md active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "Sending inquiry..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;