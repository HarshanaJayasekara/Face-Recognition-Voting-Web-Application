import { Link, useNavigate } from 'react-router-dom';
import '../pages/Home.css'; // Adjust the path to your CSS if needed

const LeftSidebar = () => {
  const navigate = useNavigate();
  
  const navCards = [
    {title: 'Voter Registration',path: '/VoterRegister',description: 'Enroll eligible voters by collecting personal details and capturing face data for verification.',},
    {title: 'Candidate Registration',path: '/CandidateRegister',description: 'Register candidates with complete profile information, including manifesto and facial recognition.',},
    {title: 'Start Election',path: '/StartElection',description: 'Initiate the election process with admin-level authentication and controls.',},
    {title: 'Candidate Manager',path: '/CandidateManager',description: 'View a list of all registered candidates with their respective details.',},
    {
      title: 'Election Results',
      path: '/results',
      description: 'View real-time voting results and final election summaries.',
    },
    {
      title: 'Voter LeadersRegister',
      path: '/LeadersRegister',
      description: 'Browse and manage records of all registered voters in the system.',
    },
    {
      title: 'Edit Profiles',
      path: '/LeaderList',
      description: 'Update and manage voter and candidate profiles securely.',
    },
    {
      title: 'reset-election',
      path: '/reset-election',
      description: 'Overview of system statistics including registration counts and election status.',
    },
    {
      title: 'Edit Profiles',
      path: '/LeaderList',
      description: 'Update and manage voter and candidate profiles securely.',
    },
    {
      title: 'reset-election',
      path: '/reset-election',
      description: 'Overview of system statistics including registration counts and election status.',
    },
    {
      title: 'Start Election',
      path: '/start-election',
      description: 'Initiate the election process with admin-level authentication and controls.',
    },
  ];


  return (
    <div className="home-sidebar">
      <h3 className="sidebar-title">Admin Dashboard</h3>
      <ul className="sidebar-list">
        {navCards.map((card, index) => (
          <li key={index} onClick={() => navigate(card.path)} className="sidebar-link">
            {card.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
