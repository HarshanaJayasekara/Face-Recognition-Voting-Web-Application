import React from 'react';
import './style.css'; 
import { FaArrowLeft } from 'react-icons/fa';
// Import your CSS file for styling

const BackButton = () => {
  return (
    <button
        className="back-button"
        onClick={() => window.history.back()}
        ><FaArrowLeft /></button>

  );
};

export default BackButton;
