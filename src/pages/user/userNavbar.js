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
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logoImg} alt="Logo" className="logo-img" onClick={() => navigate('/home')} />
        <h1 className="logo-text" onClick={() => navigate('/home')}>NSBM Green University</h1>
      </div>

      <ul className="nav-links">
        <li><Link to="/Homepage">Home Page</Link></li>
        <li><Link to="/view">Location</Link></li>
        <li><Link to="/voter-register">Contact</Link></li>
        <li><Link to="/voter-register">About us</Link></li>
      </ul>

      <div className="navbar-right">
        {user ? (
          <div className="user-info">
            {user.photoURL && showImage && (
              <img
                src={user.photoURL}
                alt="User"
                className="user-img"
                onError={() => setShowImage(false)} // Hide image if it fails to load
              />
            )}
            <span className="username">{user.displayName || 'Admin'}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate('/')}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
