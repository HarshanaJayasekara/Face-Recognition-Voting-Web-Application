import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebaseConfig';
import './ElectionStart.css';
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import RightSlider from '../../components/RightSlider';

const StartElection = ({user, showImage, setShowImage, handleLogout, navCards}) => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const correctPassword = 'admin123'; // ⚠️ Make sure to store this securely in production

  const handleStart = async () => {
    if (password === correctPassword) {
      try {
        await setDoc(doc(db, 'election', 'status'), {
          isStarted: true,
          startedAt: new Date(),
        });
        setMessage('✅ Election Started Successfully!');
        
        setTimeout(() => {
          navigate('/VoterIdentify'); // redirect to voter identification
        }, 1500);
        
      } catch (err) {
        console.error('Error starting election:', err);
        setMessage('❌ Failed to start election.');
      }
    } else {
      setMessage('❌ Incorrect Password');
    }
  };

  return (
    <div>
      <Navbar />
      <LeftSidebar navCards={navCards} />
    
    <div className="start-election-container">
     
      <div className="start-election-card">
        <h2>🗳️ Start Election</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="start-election-input"
        />
        <button onClick={handleStart} className="start-election-button">
          Start Election
        </button>
        {message && <p className="start-election-message">{message}</p>}
      </div>
    </div>
    <RightSlider user={user} showImage={showImage} setShowImage={setShowImage} handleLogout={handleLogout} />
    </div>
  );
};

export default StartElection;
