import { useState } from "react";
import { Mail } from "lucide-react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject:"",
  });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch("http://127.0.0.1:5000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again later.");
      }

      setSuccess("Message sent successfully!");
      setFormData({ name: "", email: "",subject:"", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="hero-container6">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">We'd Love to Hear from You!</p>
      </div>
      <div className="contact-card">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input
              type="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Your Subject"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              rows={4}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="contact-button" disabled={isSending}>
            <Mail size={16} /> {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
