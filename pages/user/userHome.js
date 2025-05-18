
import {Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/py.svg';
import Navbar from './userNavbar';
import './userHome.css';

import React, {} from 'react';

const Homepage = () => {
  const navigate = useNavigate();

  const navCards = [ 
    
    {
      title: 'Voter List',
      path: '/VoterList',
      description: 'Register candidates with complete profile information, including manifesto and facial recognition.',
    },
    {
      title: 'Candidate List',
      path: '/Candidators',
      description: 'View real-time voting results and final election summaries.',
    },
    {
      title: 'Election Results',
      path: '/LeadersRegister',
      description: 'Browse and manage records of all registered voters in the system.',
    },
    {
        title: 'Location',
        path: '/VotingLocations',
        description: 'Browse and manage records of all registered voters in the system.',
      },
      {
        title: 'Rules & Guideline',
        path: '/RulesGuidelines',
        description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',
      },
      {
        title: 'Contact Us',
        path: '/IdeasComplaints',
        description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',
      },
      {
        title: 'About Us',
        path: '/AboutUs',
        description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',
      }
  ];
  
  

  return (
    <div className='cont'>
        <Navbar />
    <div className="home-container">

      <div id="home-content">
      <img src={logoImg} alt="Logo" className="logo-imgs" onClick={() => navigate('/home')} />
        <h2 className="home-title">University Face Recognition Voting System</h2>
        <p className="home-subtitle">Welcome to the University of Plymouth user Dashboard Election Portal</p>
        </div>
        <div id="card-grid">
          {navCards.map((card, index) => (
            <div key={index} className="card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <button onClick={() => navigate(card.path)}> Click Here</button>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};

export default Homepage;
