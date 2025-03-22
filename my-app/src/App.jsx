import React from "react";
import "./App.css"; // Import the CSS file

export default function App() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">Afrivance.ai</h1>
        <ul className="nav-links">
          {["Home", "About Us", "Portfolio", "Services", "Contact"].map(
            (item) => (
              <li key={item} className="nav-item">
                {item}
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Hero Section with Background Video */}
      <section className="hero">
        <video autoPlay muted loop className="hero-video">
          <source src="banner.mp4" type="video/mp4" />
        </video>
        <button className="top-right-button">
          <a href="#services">VIEW SERVICES</a>
        </button>
      </section>

      {/* What We Do */}
      <section className="services">
        {[
          {
            title: "AI Consultancy",
            image: "/ai_consultancy.JPG",
            description:
              "We help you navigate AI adoption, identifying the best strategies for your business.",
          },
          {
            title: "Custom AI Agents",
            image: "/ai_agent.JPG",
            description:
              "We develop AI-powered assistants and automation tools tailored to your needs.",
          },
          {
            title: "Bespoke AI Solutions",
            image: "/ai_bespoke.JPG",
            description:
              "We integrate AI into your existing workflows, boosting efficiency and scalability.",
          },
        ].map((item, index) => (
          <div key={index} className="service-card">
            <h3>{item.title}</h3>
            <img src={item.image} alt={item.title} className="service-image" />
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      {/* Image & Text Section */}
      <section className="image-text-section">
        <div className="image-container">
          <img src="/ai_generated_innovation.jpg" alt="AI Illustration" />
        </div>
        <div className="text-container">
          <h3>AI-Powered Innovation</h3>
          <ul className="bullet-list">
            <li>Create your own AI business easily.</li>
            <li>AI systems analyze data, recognize patterns, and adapt over time.</li>
            <li>Speech recognition, image processing, and decision-making capabilities.</li>
            <li>Natural Language Processing to simulate human interaction.</li>
            <li>AI-generated art, music, and literature.</li>
          </ul>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="team-section">
        <h3 className="team-title">Meet Our Team</h3>
        <div className="team-carousel">
          {["/team1.jpg", "/team2.jpg", "/team3.jpg"].map((img, index) => (
            <img key={index} src={img} alt="Team Member" className="team-img" />
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <h3>Quick Links</h3>
        <ul>
          {["Privacy Policy", "Terms of Service", "Support"].map((link) => (
            <li key={link}>{link}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
