import React from "react";
import "./CustomAIAgents.css"; // Import the external CSS file

const AIBespokeSolutions= () => {
  return (
    <div className="consultancy-container3">
      {/* Hero Section */}
      <div className="hero-text3">
        <h1 className="hero-title3">Bespoke AI Solutions</h1>
        <p className="hero-subtitle3">AI Solutions Designed Specifically for Your Business</p>
      </div>

      <div className="hero-section3">
        {/* Left: Image */}
        <div className="hero-image3">
          <img src="/ai_consultancy2.jpg" alt="AI Consultancy" />
        </div>

        {/* Right: Description */}
        <div className="hero-description3">
          <p>
          AI is not a one-size-fits-all solution. Every business has unique challenges and goals, which is why Afrivance AI specializes in developing custom AI solutions tailored to your needs. 
          </p>
          <p>
          Our AI seamlessly integrates into your existing workflows, ensuring minimal disruption while enhancing automation, accuracy, and decision-making.
          </p>
        </div> 
      </div> {/* <-- Moved the closing div here to fix the issue */}

      {/* Services Section */}
      <div className="services-section3">
        <h2 className="services-title3">Our Bespoke AI Services Include:</h2>
        <ul className="services-list3">
          <li><strong> AI-Powered Data Analytics</strong> – Unlock valuable insights with machine learning and predictive analytics.</li>
          <li><strong> AI Process Automation</strong> – Enhance efficiency by automating repetitive and time-consuming tasks.</li>
          <li><strong> AI Integration with Existing Software </strong> – Upgrade your current systems with intelligent AI features.</li>
          <li><strong> Computer Vision & NLP Solutions</strong> – Use AI for image recognition, speech processing, and text analysis.</li>
        </ul>
      </div>

      {/* Why Choose Us + CTA */}
      <div className="cta-section3">
        <h2 className="cta-title3">💡 Why Choose Us?</h2>
        <p className="cta-description">
        We don’t just implement AI—we align it with your business objectives, ensuring seamless adoption and maximum impact.
        </p>
        <p className="cta-description3"> Contact us to discover how custom AI solutions can revolutionize your business.</p>
        <a href="/contact" className="cta-button3">Contact Us</a>
      </div>
    </div>
  );
};

export default AIBespokeSolutions;
