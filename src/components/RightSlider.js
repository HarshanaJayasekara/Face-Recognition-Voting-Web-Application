import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate here
import '../pages/Home.css';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const RightSlider = () => {
  const navigate = useNavigate(); // <-- Initialize navigate
  const [user, setUser] = useState(null);
  const [showImage, setShowImage] = useState(true);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setShowImage(true);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
      await signOut(auth);
      navigate('/AdminLogin');
    };

  return (
    <div className="right-slider">
      <div className="profile">
      {user ? (
        <div className="profileImg">
          {user.photoURL && showImage && (
            <img
              src={user.photoURL}
              alt="User"
              className="user-img"
              onError={() => setShowImage(false)}
            />
          )}
          <br />
          <span className="profileName">{user.displayName || 'Admin'}</span>
          <br />
          <span className="profileEmail">{user.email || 'Admin@gmail.com'}</span>
          <button className="profileBtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button className="ProfileBtn2" onClick={() => navigate('/')}>
          Login
        </button>
      )}
    </div>
    </div>
  );
};

export default RightSlider;
