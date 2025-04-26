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
import VotePage from './pages/election/VotePage';
import ThankYou from './pages/election/ThankYou';

// Vote Counting
import VoteCountPage from '../src/pages/result/VoteCountPage';
import ResetElection from '../src/pages/result/ResetElection';

// user home page
import Homepage from './pages/user/userHome';
import VoterList from './pages/user/voterList';
import VotingLocations from './pages/user/VotingLocations';
import RulesGuidelines from './pages/user/RulesGuidelines';
import IdeasComplaints from './pages/user/IdeasComplaints';

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
          <Route path='/VotePage' element={<VotePage />} />
          <Route path='/ThankYou' element={<ThankYou />} />

          {/* Vote Counting */}
          <Route path='/VoteCountPage' element={<VoteCountPage />} />
          <Route path='/ResetElection' element={<ResetElection />} />

          {/* user home page */}
          <Route path='/Homepage'  element={<Homepage />} />
          <Route path='/VoterList' element={<VoterList />} />
          <Route path='/VotingLocations' element={<VotingLocations />} />
          <Route path='/RulesGuidelines' element={<RulesGuidelines />} />
          <Route path='/IdeasComplaints' element={<IdeasComplaints />} />



          
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
