import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import './userNavbar.css';
import logoImg from '../../assets/nsbm.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setShowImage(true); // Reset image visibility when user changes
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav id="navbar">
      <div id="navbar-left">
        <img src={logoImg} alt="Logo" id="logo-img" onClick={() => navigate('/home')} />
        <h1 id="logo-text" onClick={() => navigate('/home')}>NSBM Green University</h1>
      </div>

      <ul id="nav-links">
        <li><Link to="/Homepage">Home Page</Link></li>
        <li><Link to="/view">Location</Link></li>
        <li><Link to="/voter-register">Contact</Link></li>
        <li><Link to="/voter-register">About us</Link></li>
      </ul>

      <div id="navbar-right">
        {user ? (
          <div id="user-info">
            {user.photoURL && showImage && (
              <img
                src={user.photoURL}
                alt="User"
                id="user-img"
                onError={() => setShowImage(false)} // Hide image if it fails to load
              />
            )}
            <span id="username">{user.displayName || 'Admin'}</span>
            <button id="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button id="login-btn" onClick={() => navigate('/AdminLogin')}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
