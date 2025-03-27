import React from "react";
import "./AIConsultancy.css"; // Import the external CSS file

const AIConsultancy = () => {
  return (
    <div className="consultancy-container">
      {/* Hero Section */}
      <div className="hero-text2">
        <h1 className="hero-title2">AI Consultancy</h1>
        <p className="hero-subtitle2">Unlock the Power of AI for Your Business</p>
      </div>

      <div className="hero-section2">
        {/* Left: Image */}
        <div className="hero-image2">
          <img
            src="/ai_consultancy2.jpg"
            alt="AI Consultancy"
          />
        </div>

        {/* Right: Description */}
        <div className="hero-description2">
          <p>
            At Afrivance AI, we help businesses like yours navigate the complex world 
            of artificial intelligence. 
          </p>
          <p>Whether you're just beginning your AI journey 
            or looking to refine an existing strategy, our consultancy services provide 
            expert guidance tailored to your needs.</p>
        </div>
      </div>

      {/* Services Section */}
      <div className="services-section">
        <h2 className="services-title">Our AI Consultancy Services Include:</h2>
        <ul className="services-list">
          <li><strong> AI Strategy Development</strong> – We analyze your business goals and craft a roadmap for AI integration.</li>
          <li><strong> Use Case Identification</strong> – We pinpoint high-impact AI applications that align with your industry.</li>
          <li><strong> Feasibility Assessment</strong> – We evaluate the technical and financial viability of AI solutions.</li>
          <li><strong> AI Ethics & Compliance</strong> – We ensure your AI adoption aligns with regulations and ethical best practices.</li>
        </ul>
      </div>

      {/* Why Choose Us + CTA */}
      <div className="cta-section">
        <h2 className="cta-title">💡 Why Choose Us?</h2>
        <p className="cta-description">
          We simplify AI for businesses, ensuring that you make informed, 
          strategic decisions. Contact us today to explore how AI can 
          drive growth for your organization.
        </p>
        <a href="/contact" className="cta-button">Contact Us</a>
      </div>
    </div>
  );
};

export default AIConsultancy;
