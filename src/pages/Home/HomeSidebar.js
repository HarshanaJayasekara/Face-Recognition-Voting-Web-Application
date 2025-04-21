import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/nsbm.png';
import './Homes.css';

const HomeHeader = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`home-header ${scrolled ? 'blurred' : ''}`}>
      <img src={logoImg} alt="Logo" className="logo-imgs" onClick={() => navigate('/home')} />
      <h2 className="home-title">Face Recognition Smart Voting System</h2>
      <p className="home-subtitle">Welcome to the NSBM Admin Election Portal</p>
    </div>
  );
};

export default HomeHeader;