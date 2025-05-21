import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import RightSlider from '../../components/RightSlider';
import { jsPDF } from "jspdf";
import "./VoteCountPage.css";

const VoteCountPage = ({ user, showImage, setShowImage, handleLogout, navCards }) => {
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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Election Results", 20, 20);
    doc.setFontSize(12);
    
    filteredCandidates.forEach((candidate, index) => {
      const text = `${index + 1}. ${candidate.name} (${candidate.party}) - ${candidate.votes || 0} votes`;
      doc.text(text, 20, 30 + index * 10);
    });

    doc.save("election_results.pdf");
  };

  const handleDownloadTXT = () => {
    let text = "Election Results\n\n";
    filteredCandidates.forEach((candidate, index) => {
      text += `${index + 1}. ${candidate.name} (${candidate.party}) - ${candidate.votes || 0} votes\n`;
    });

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "election_results.txt";
    link.click();
  };

    const handleDownloadCSV = () => {
    const headers = ["Name", "Party", "Votes"];
    const rows = filteredCandidates.map((c) => [
      `"${c.name}"`,
      `"${c.party}"`,
      c.votes || 0
    ]);

    const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "election_results.csv";
    link.click();
  };


  if (loading) return <p className="text-center">Loading vote count...</p>;

  return (
    <div className="count">
      <Navbar />
      <LeftSidebar navCards={navCards} />
      <div className="vote-container">
        <div className="vote-header">
          <h2 className="vote-title">Election Result</h2>
          <div className="vote-controls">
            <input
              type="text"
              placeholder="Search candidate by name..."
              className="vote-search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn-pdf" onClick={handleDownloadPDF}>Download PDF</button>
            <button className="btn-txt" onClick={handleDownloadTXT}>Download TXT</button>

          </div>
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
                  <span>{candidate.votes || 0}</span> <small>Votes</small>
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
