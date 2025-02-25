import { useState } from 'react';
import './App.css';

import { Facebook, Twitter, Linkedin } from 'lucide-react';

import React from 'react';

function App() {
  return (
    <div style={{ backgroundColor: '#0e0e12', color: '#e4e4e7', minHeight: '100vh', width: '100%', fontFamily: 'Arial, sans-serif' }}>
      {/* Header Section */}
      <header style={{ display: 'flex', alignItems: 'center', padding: '0.5rem ', backgroundColor: '#fff',  marginBottom: '2rem' }}>
        <h1 style={{ color: '#000', margin: 0 }}>AFRIVANCE.AI</h1>
      </header>

      {/* Hero Section */}
      <div
        style={{
          position: 'relative',
          padding: '8rem 4rem',
          backgroundImage: 'url(/hero-image.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.6)', borderRadius: '1rem' }}></div>
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'left', maxWidth: '600px' }}>
          <h1 style={{ color: '#fff', fontSize: '4rem', marginBottom: '1rem' }}>Afrivance</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#fff' }}>
            Empowering Your Business with Advanced AI Solutions
          </p>
          <button style={{ background: 'linear-gradient(135deg, #00c853, #007d3e)', color: '#fff', padding: '1rem 2rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
            Explore
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div style={{ padding: '4rem 0' }}>
        <h2 style={{ textAlign: 'center', color: '#00c853' }}>Our Services</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          {/* Service 1 */}
          <div style={{ backgroundColor: '#1c1c24', color: '#e4e4e7', borderRadius: '1rem', width: '300px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <img src="/path-to-service1-image.jpg" alt="Custom AI Solutions" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1rem' }}>
              <h3>Custom AI Solutions for Businesses</h3>
              <p>We develop tailored AI systems to optimize operations, boost productivity, and enhance decision-making.</p>
            </div>
          </div>

          {/* Service 2 */}
          <div style={{ backgroundColor: '#1c1c24', color: '#e4e4e7', borderRadius: '1rem', width: '300px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
            <img src="/path-to-service2-image.jpg" alt="AI-Powered Consumer Solutions" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '1rem' }}>
              <h3>AI-Powered Consumer Solutions</h3>
              <p>Innovative AI applications designed for everyday use.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div style={{ backgroundColor: '#1c1c24', borderRadius: '1rem', padding: '4rem 2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
        <h2 style={{ textAlign: 'center', color: '#00c853' }}>What Our Clients Say</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#2a2a36', padding: '2rem', borderRadius: '1rem', width: '300px', color: '#e4e4e7' }}>
            <p>"AfrivanceAI transformed our business operations. Their custom AI solutions significantly improved our efficiency."</p>
            <small>- Jane Doe, CEO of TechCorp</small>
          </div>
          <div style={{ backgroundColor: '#2a2a36', padding: '2rem', borderRadius: '1rem', width: '300px', color: '#e4e4e7' }}>
            <p>"The personal AI assistant they developed for me has been a game-changer in managing my daily tasks."</p>
            <small>- John Smith, Entrepreneur</small>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ color: '#00c853' }}>Ready to Innovate with AI?</h2>
        <p style={{ marginBottom: '2rem' }}>
          Contact us today and let's transform your ideas into AI-powered reality.
        </p>
        <button style={{ background: 'linear-gradient(135deg, #00c853, #007d3e)', color: '#fff', padding: '1rem 2rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>
          Contact Us
        </button>
      </div>

      {/* Footer Section */}
      <div style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid #2a2a36', marginTop: '2rem' }}>
        <p>&copy; 2024 AfrivanceAI. All Rights Reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00c853' }}>
            <Facebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00c853' }}>
            <Twitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: '#00c853' }}>
            <Linkedin />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
