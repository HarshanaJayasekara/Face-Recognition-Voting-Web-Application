import React from 'react';
import Navbar from '../../components/Navbar';
import HomeContent from './HomeContent';
import HomeSidebar from './HomeSidebar';
import './Homes.css';

const Homes = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-main-content">
        <HomeSidebar />
        <HomeContent />
      </div>
    </div>
  );
};

export default Homes;