import React from "react";
import { FaEye, FaBullseye, FaTasks } from "react-icons/fa"; // Import icons
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Image */}
      <div className="hero-container">
        <div className="hero-image">
          <img src="/hero-image.jpeg" alt="Afrivance AI Hero" />
          <div className="about-header">
            <p>Pioneering Africa’s AI Revolution</p>
          </div>
        </div>
      </div>

      <div className="about-section section-light">
        <h2 style={{ marginTop: "20px" }}>
          <FaEye color="grey" size={22}/> Our Vision
        </h2>
        <p>
          "To be a world-class AI powerhouse—driving innovation, shaping the
          future of AI in Africa, and making cutting-edge technology accessible
          to all."
        </p>
        <h2 style={{ marginTop: "40px" }}>
          <FaBullseye color="grey" size={22} /> Our Mission
        </h2>
        <ul>
          <li>Develop cutting-edge AI solutions that address global challenges</li>
          <li>Mentor and inspire the next generation of AI innovators</li>
          <li>Democratize AI, ensuring accessibility to businesses and individuals across Africa</li>
        </ul>
        <h2 style={{ marginTop: "40px" }}>
          <FaTasks color="grey" size={22} /> What We Do
        </h2>
        <ul>
          <li>AI Consultancy: Helping businesses navigate AI adoption.</li>
          <li>Custom AI Agents: Developing AI-powered assistants and automation tools.</li>
          <li>Bespoke AI Solutions: Integrating AI into workflows to boost efficiency.</li>
        </ul>
      </div>

      <div className="about-footer">
        <h2>🤝 Let’s Collaborate!</h2>
        <p>
          Partner with us, support our journey, or explore AI solutions for your challenges. Stay updated on AI innovations,
          trends, and our journey—Follow us on Facebook: <strong>Afrivance.ai</strong>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
