import React from 'react';
import { useLocation } from 'react-router-dom';
import '../pages/Home.css';

const VoterSlider = () => {
  const location = useLocation();
  const voter = location.state?.voter;

  return (
    <div className="right-slider">
      <div id="profile">
        {voter ? (
          <div className="profile-content">
            {voter.photoUrls && voter.photoUrls.length > 0 ? (
              <img
                src={voter.photoUrls[0]}
                alt="Voter"
                id="user-img"
                onError={(e) => (e.target.style.display = 'none')}
              />
            ) : (
              <div className="default-img">👤</div>
            )}
            <div id="profile-text">
              <span className="profile-name">{voter.name}</span>
              <br />
              <span className="profile-id">University ID: {voter.uniId}</span>
            </div>
          </div>
        ) : (
          <p className="not-logged">Voter not identified</p>
        )}
      </div>
    </div>
  );
};

export default VoterSlider;
