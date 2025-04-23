import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';

// Home page
import Home from './pages/Home';

import Homes from './pages/Home/Home';

// Voter  & Candidate pages
import VoterRegister from './pages/voter/VoterRegister';
import CandidateRegister from './pages/candidate/CandidateRegister';
import CandidateManager from './pages/candidate/CandidateManager';

// Start Election
import StartElection from '../src/pages/election/ElectionStart';
import VoterIdentify from '../src/pages/election/VoterIdentify';
import CandidateList from '../src/pages/election/CandidatesList';
import CandidateProfile from './pages/election/CandidateProfile';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          {/* test home page */}
          <Route path='/Homes' element={<Homes />} />

          {/* Admin Routes */}
          <Route path="/" element={<AdminLogin />} />
          <Route path="/AdminRegister" element={<AdminRegister />} />

          {/* home page */}
          <Route path="/Home" element={<Home />} />

          {/* Voter & Candidate pages */}
          <Route path='/VoterRegister' element={<VoterRegister />} />
          <Route path='/CandidateRegister' element={<CandidateRegister />} />
          <Route path='/CandidateManager' element={<CandidateManager />} />

          {/* Start Election */}
          <Route path='/StartElection' element={<StartElection />} />
          <Route path='/VoterIdentify' element={<VoterIdentify />} />
          <Route path='/CandidateList' element={<CandidateList />} />
          <Route path='/CandidateProfile/:id' element={<CandidateProfile />} />
          



          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
