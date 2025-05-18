import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import VoterSlider from "../../components/VoterSlider";
import "./CandidatesList.css";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const voter = location.state?.voter;

  useEffect(() => {
    if (!voter) navigate("/VoterIdentify");
  }, [voter, navigate]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const snapshot = await getDocs(collection(db, "candidates"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCandidates(data);
      } catch (error) {
        console.error("❌ Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  useEffect(() => {
    const handlePopState = () => navigate(1);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/CandidateProfile/${id}`, { state: { voter } });
  };

  return (
    <div className="candidate-page">
      <div className="candidate-container">
        <h2 className="candidate-heading">Choose Your Candidate</h2>

        <input
          type="text"
          className="candidate-search"
          placeholder="Search by candidate name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="candidate-list">
          {loading ? (
            <p>Loading candidates...</p>
          ) : filteredCandidates.length === 0 ? (
            <p>No candidates found.</p>
          ) : (
            filteredCandidates.map(candidate => (
              <div
                key={candidate.id}
                className="candidate-card"
                onClick={() => handleCardClick(candidate.id)}
              >
                <img
                  src={candidate.image || "https://via.placeholder.com/150"}
                  alt={candidate.name}
                  className="candidate-image"
                />
                <div className="candidate-info">
                  <h3>{candidate.name}</h3>
                  <p><strong>Party:</strong> {candidate.party}</p>
                  <p className="candidate-description">{candidate.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <VoterSlider voter={voter} />
    </div>
  );
};

export default CandidateList;
