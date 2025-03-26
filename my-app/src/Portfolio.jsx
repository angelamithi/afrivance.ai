import React from "react";
import "./Portfolio.css";

const portfolioItems = [
  { title: "Heart Disease Model", image: "/heart_disease_model.JPG" },
  { title: "Fraud Detection System", image: "/fraud_img.PNG" },
  { title: "AI Travel Assistant", image: "/travel_bot.PNG" },
  { title: "Calorie AI", image: "/macro_ai.JPG" } // Last image
];

const Portfolio = () => {
  return (
    <div className="portfolio-wrapper">
      <h1 className="portfolio-heading">Portfolio</h1>
      <div className="portfolio-container">
        {portfolioItems.map((item, index) => (
          <div key={index} className="portfolio-card">
            <h3 className="portfolio-title">{item.title}</h3>
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
