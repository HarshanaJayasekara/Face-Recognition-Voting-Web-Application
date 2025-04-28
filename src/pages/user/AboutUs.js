
import React from 'react';
import './AboutUs.css'; // Import the CSS file for styling
import Navbar from './userNavbar';
import BackButton from './components/BackButton';

const AboutUsPage = () => {
  return (
    <div className="about-page">
        <Navbar />
        <BackButton />
        <div className="about-me-container">
            <div className="about-me-header">
      {/* Profile Section */}
      <div className="profile-section">
        <div className='profile-container'>
        
        </div>
        
        <div className="profile-details">
          <h1 className="profile-name">Harshan (HS)</h1>
          <button className="profile-follow-button">Follow</button>
          <button className="profile-contact-button">Get in Touch</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stat-item">
          <strong>123</strong>
          <span>Projects</span>
        </div>
        <div className="stat-item">
          <strong>456</strong>
          <span>Connections</span>
        </div>
        <div className="stat-item">
          <strong>789</strong>
          <span>Ideas Shared</span>
        </div>
      </div>

      </div>

      {/* Description Section */}
      <div className="about-content">
        <h2>About Me</h2>
        <p>
          Hi, I’m Harshan, a passionate and driven Computer Science student at <strong>NSBM Green University Town</strong>, Western Province, Sri Lanka. My university ID is <strong>12345678</strong>. I’m pursuing a Bachelor of Computer Science, focusing on innovation, technology, and making ideas come to life.
        </p>
        <h2>What I Do</h2>
        <p>
          My project is a personal endeavor aimed at creating impactful solutions for secure voting systems. I enjoy coding, problem-solving, and turning complex challenges into simple, user-friendly experiences.
        </p>
        <h2>How You Can Reach Me</h2>
        <p>
          Interested in collaborating or sharing feedback? Click the "Get in Touch" button to send me a message!
        </p>
      </div>
    </div>
    </div>
  );
};

export default AboutUsPage;
