import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeHeader from './HomeHeader';
import Profile from './Profile';
import './Homes.css';

const HomeContent = () => {
  const navigate = useNavigate();

  const navCards = [
    {
      title: 'Voter Registration',
      path: '/VoterRegister',
      description: 'Enroll eligible voters...',
    },
    {
      title: 'Candidate Registration',
      path: '/candidate-register',
      description: 'Register candidates...',
    },
    {
      title: 'Election Results',
      path: '/results',
      description: 'View real-time...',
    },
    {
      title: 'Voter LeadersRegister',
      path: '/LeadersRegister',
      description: 'Browse and manage...',
    },
    {
      title: 'Candidate Manager',
      path: '/CandidateManager',
      description: 'View a list of...',
    },
    {
      title: 'Edit Profiles',
      path: '/LeaderList',
      description: 'Update and manage...',
    },
    {
      title: 'reset-election',
      path: '/reset-election',
      description: 'Overview of system...',
    },
    {
      title: 'Start Election',
      path: '/start-election',
      description: 'Initiate the election...',
    },
    {
      title: 'Edit Profiles',
      path: '/LeaderList',
      description: 'Update and manage...',
    },
    {
      title: 'reset-election',
      path: '/reset-election',
      description: 'Overview of system...',
    },
    {
      title: 'Start Election',
      path: '/start-election',
      description: 'Initiate the election...',
    },
  ];

  return (
    <div className="home-content">
      <HomeHeader />
      <div className="card-grid">
        {navCards.map((card, index) => (
          <div key={index} className="card">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button onClick={() => navigate(card.path)}>Click Here</button>
          </div>
        ))}
      </div>
      <div className="right-slider">
        <Profile />
        <div className="right-slider-content">
          <h5>Rules & Conditions</h5>
          <p>• All voters must be registered...</p>
          <p>• Each voter is allowed...</p>
          {/* ... other rules ... */}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;