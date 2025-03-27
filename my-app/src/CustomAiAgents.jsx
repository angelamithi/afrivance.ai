import React from "react";
import "./CustomAIAgents.css"; // Import the external CSS file

const CustomAiAgents = () => {
  return (
    <div className="consultancy-container3">
      {/* Hero Section */}
      <div className="hero-text3">
        <h1 className="hero-title3">Custom AI Agents</h1>
        <p className="hero-subtitle3">AI-Powered Assistants for Your Unique Needs</p>
      </div>

      <div className="hero-section3">
        {/* Left: Image */}
        <div className="hero-image3">
          <img src="/ai_consultancy2.jpg" alt="AI Consultancy" />
        </div>

        {/* Right: Description */}
        <div className="hero-description3">
          <p>
            Imagine having an intelligent assistant that works around the clock to automate tasks, answer queries, and optimize workflows.
          </p>
          <p>
    At Afrivance AI, we build AI-powered agents designed to enhance efficiency and productivity.
          </p>
        </div> 
      </div> {/* <-- Moved the closing div here to fix the issue */}

      {/* Services Section */}
      <div className="services-section3">
        <h2 className="services-title3">What Our AI Agents Can Do:</h2>
        <ul className="services-list3">
          <li><strong> Customer Support Automation</strong> – AI chatbots that handle inquiries, book appointments, and provide 24/7 assistance.</li>
          <li><strong> Task Automation</strong> – AI-driven bots that streamline data entry, email responses, and routine processes.</li>
          <li><strong> Intelligent Virtual Assistants</strong> – AI-powered tools that support decision-making, data analysis, and workflow automation.</li>
          <li><strong> Conversational AI</strong> – AI chatbots and voice assistants that provide natural, human-like interactions.</li>
        </ul>
      </div>

      {/* Why Choose Us + CTA */}
      <div className="cta-section3">
        <h2 className="cta-title3">💡 Why Choose Us?</h2>
        <p className="cta-description3">
          Our AI agents are tailored to your needs, seamlessly integrating into your business to enhance customer experiences and operational efficiency.
        </p>
        <p className="cta-description3"> Contact us to discuss your AI automation needs.</p>
        <a href="/contact" className="cta-button3">Contact Us</a>
      </div>
    </div>
  );
};

export default CustomAiAgents;
