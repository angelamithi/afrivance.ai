import React from "react";
import "./App.css"; // Import the updated CSS file

export default function Home() {
  return (
    <div className="container">
      {/* Navbar */}
      

      {/* Hero Section with Background Video */}
      <section className="hero">
        <video autoPlay muted loop className="hero-video">
          <source src="banner.mp4" type="video/mp4" />
        </video>
        <button className="top-right-button">
          <a href="#services">Contact us</a>
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
          <h3>Why Choose Us?</h3>
          <ul className="bullet-list">
            <li>Expert AI Engineers – Our team brings deep technical expertise.</li>
            <li>Scalable Solutions – AI that grows with your business.</li>
            <li>End-to-End Support – From strategy to deployment, we've got you covered.</li>
            <li>Industry-Specific AI – Tailored solutions for healthcare, finance, retail, and more.</li>
            <li>Seamless Integration – AI that works smoothly with your existing systems.</li> 
          </ul>
        </div>
      </section>

      {/* Quick Links Footer */}
      
    </div>
  );
}
