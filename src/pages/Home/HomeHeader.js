import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homes.css';

const HomeSidebar = () => {
  const navigate = useNavigate();

  const navCards = [
    {
      title: 'Voter Registration',
      path: '/VoterRegister',
    },
    {
      title: 'Candidate Registration',
      path: '/candidate-register',
    },
    {
      title: 'Election Results',
      path: '/results',
    },
    // ... other navigation items ...
  ];

  return (
    <div className="home-sidebar">
      <h3 className="sidebar-title">Admin Dashboard</h3>
      <ul className="sidebar-list">
        {navCards.map((card, index) => (
          <li key={index} onClick={() => navigate(card.path)} className="sidebar-link">
            {card.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeSidebar;