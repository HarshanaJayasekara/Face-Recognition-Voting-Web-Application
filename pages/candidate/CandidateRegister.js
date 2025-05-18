import React, { useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import RightSlider from '../../components/RightSlider';
import './CandidateRegister.css';

const CandidateRegister = ({user, showImage, setShowImage, handleLogout, navCards}) => {
  const [formData, setFormData] = useState({
    name: "",
    party: "",
    position: "",
    description: "",
    image: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "candidates"), formData);
      alert("Candidate added successfully!");
      navigate("/Home"); 
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div className="candidate-register">
      <Navbar />
      <LeftSidebar navCards={navCards} />
      <div className="form-container">
        <h2>🗳️ Candidate Registration</h2>
        <form onSubmit={handleSubmit} className="candidate-form">
          <label>Full Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            required
          />

          <label>University ID*</label>
          <input
            type="text"
            name="universityId"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter University ID "
            required
          />

          <label>Political Party*</label>
          <input
            type="text"
            name="party"
            value={formData.party}
            onChange={handleChange}
            placeholder="Enter party name"
            required
          />

          <label>Position*</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="e.g. President, Secretary"
            required
          />

          <label>Description / Vision*</label>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the candidate's vision or goals"
            rows="4"
            required
          />

          <label>Upload Candidate Photo*</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="form-input"
          />

          <button type="submit" >
          Candidate Registered
          </button>
        </form>

      </div>
      <RightSlider user={user} showImage={showImage} setShowImage={setShowImage} handleLogout={handleLogout} />
    </div>
  );
};

export default CandidateRegister;
