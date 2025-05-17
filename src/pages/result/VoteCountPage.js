import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import RightSlider from '../../components/RightSlider';
import "./VoteCountPage.css";

const VoteCountPage = ({user, showImage, setShowImage, handleLogout, navCards}) => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "candidates"));
        const candidateData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        const sorted = candidateData.sort(
          (a, b) => (b.votes || 0) - (a.votes || 0)
        );

        setCandidates(sorted);
        setFilteredCandidates(sorted);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = candidates.filter((c) =>
      c.name.toLowerCase().includes(value)
    );
    setFilteredCandidates(filtered);
  };

  if (loading) return <p className="text-center">Loading vote count...</p>;

  return (
    <div className="count">
      <Navbar />
      <LeftSidebar navCards={navCards} />
    <div className="vote-container">
      <div>
      <h2 className="vote-title">Election Result</h2>

      <input
        type="text"
        placeholder="Search candidate by name..."
        className="vote-search"
        value={searchTerm}
        onChange={handleSearch}
      />
      </div>
      {filteredCandidates.length === 0 ? (
        <p className="vote-empty">No candidates found.</p>
      ) : (
        <div className="vote-list">
          {filteredCandidates.map((candidate) => (
            <div key={candidate.id} className="vote-card">
              <img
                src={candidate.image || "https://via.placeholder.com/100"}
                alt={candidate.name}
                className="vote-image"
              />
              <div className="vote-info">
                <h3 className="vote-name">{candidate.name}</h3>
                <p className="vote-party">Party: {candidate.party}</p>
              </div>
              <div className="vote-count">
                0<span>{candidate.votes || 0}</span><span> </span>
                <small>Votes</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <RightSlider user={user} showImage={showImage} setShowImage={setShowImage} handleLogout={handleLogout} />
    </div>
  );
};

export default VoteCountPage;
