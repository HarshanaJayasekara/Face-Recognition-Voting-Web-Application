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

  // Redirect if voter data is missing
  useEffect(() => {
    if (!voter) {
      navigate("/VoterIdentify");
    }
  }, [voter, navigate]);

  // Fetch candidates from Firebase
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

  // Disable browser back navigation after entering candidate list
  useEffect(() => {
    const handlePopState = () => {
      navigate(1); // Forces forward navigation
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  // Filtered candidates
  const filteredCandidates = candidates.filter(candidate =>
    candidate.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    navigate(`/CandidateProfile/${id}`, { state: { voter: location.state?.voter } });
    console.log("Candidate ID from URL:", id);

  };

  return (
    <div className="new">
      <div className="manager-container">
        <div id="heder">
          <h2 className="manager-title">Choose Candidate</h2>

          <input
            type="text"
            className="manager-search"
            id="search"
            placeholder="Search candidates by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="heder-card">
            {loading ? (
              <p>Loading candidates...</p>
            ) : filteredCandidates.length === 0 ? (
              <p>No candidates found.</p>
            ) : (
              filteredCandidates.map(candidate => (
                <div
                  key={candidate.id}
                  className="manager-card"
                  onClick={() => handleCardClick(candidate.id)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={candidate.image || "https://via.placeholder.com/150"}
                    alt={candidate.name}
                    className="manager-img"
                  />
                  <div className="manager-details">
                    <h3 className="manager-name">{candidate.name}</h3>
                    <p className="manager-party">Party: {candidate.party}</p>
                    <p className="manager-description">{candidate.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <VoterSlider voter={voter} />
    </div>
  );
};

export default CandidateList;
