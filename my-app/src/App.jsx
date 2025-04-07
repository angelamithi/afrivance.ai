import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import AboutUs from "./AboutUs";  // ✅ Import the detailed AboutUs component
import Portfolio from "./Portfolio";
import AIConsultancy from "./AIConsultancy";
import CustomAiAgents from "./CustomAiAgents";
import AIBespokeSolutions from "./AIBespokeSolutions";
import Contact from "./Contact";


function Navbar() {
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1 className="logo">Afrivance.ai</h1>
      <ul className="nav-links">
        {["Home", "About us", "Services", "Portfolio", "Contact"].map((item) => {
          if (item === "Services") {
            return (
              <li
                key={item}
                className="nav-item services-menu"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {item}
                {servicesOpen && (
                  <ul className="dropdown-menu">
                    <li onClick={() => navigate("/aiconsultancy")}>AI Consultancy</li>
                    <li onClick={() => navigate("/customaiagents")}>Custom AI Agents</li>
                    <li onClick={() => navigate("/aibespokesolutions")}>AI Bespoke Solutions</li>
                  </ul>
                )}
              </li>
            );
          }
          return (
            <li
              key={item}
              className="nav-item"
              onClick={() => navigate(`/${item.toLowerCase().replace(/\s+/g, "").replace("aboutus", "about")}`)}
            >
              {item}
            </li>
          );
        })}
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
          <Route path="/aiconsultancy" element={<AIConsultancy />} />
          <Route path="/customaiagents" element={<CustomAiAgents />} />
          <Route path="/aibespokesolutions" element={<AIBespokeSolutions />} /> 
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
