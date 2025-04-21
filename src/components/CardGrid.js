import { useNavigate } from 'react-router-dom';
import '../pages/Home.css';

const CardGrid = () => {
  const navigate = useNavigate();

  const navCards = [
    { title: 'Voter Registration', path: '/VoterRegister', description: 'Enroll eligible voters' },
    { title: 'Candidate Registration', path: '/candidate-register', description: 'Register candidates' },
    { title: 'Election Results', path: '/results', description: 'View election results' },
    { title: 'Start Election', path: '/start-election', description: 'Start the election' },
  ];

  return (
    <div className="card-grid">
      {navCards.map((card, index) => (
        <div key={index} className="card">
          <h3>{card.title}</h3>
          <p>{card.description}</p>
          <button onClick={() => navigate(card.path)}>Click Here</button>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
