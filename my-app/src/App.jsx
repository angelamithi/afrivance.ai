import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import AboutUs from "./AboutUs";  // ✅ Import the detailed AboutUs component
import Portfolio from "./Portfolio";


const Services = () => <h2>Services Page</h2>;
const Contact = () => <h2>Contact Page</h2>;

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h1 className="logo">Afrivance.ai</h1>
      <ul className="nav-links">
        {["Home", "About us", "Portfolio", "Services", "Contact"].map((item) => (
          <li
            key={item}
            className="nav-item"
            onClick={() => navigate(`/${item.toLowerCase().replace(/\s+/g, "").replace("aboutus", "about")}`)}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="quick-links-footer">
      <ul>
        {["Privacy Policy", "Terms of Service", "Support"].map((link) => (
          <li key={link}>{link}</li>
        ))}
      </ul>
    </footer>
  );
}

export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />  {/* ✅ Fixed path */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
