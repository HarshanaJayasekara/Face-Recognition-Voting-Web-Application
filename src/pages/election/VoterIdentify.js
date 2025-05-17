import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { db } from '../../firebase/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import './VoterIdentify.css';
import { FaPowerOff } from 'react-icons/fa';

const VoterIdentify = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null); // ➤ New canvas reference
  const navigate = useNavigate();

  const [uniId, setUniId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
      ]);
    };

    const startFaceDetection = () => {
      const interval = setInterval(async () => {
        if (
          webcamRef.current &&
          webcamRef.current.video.readyState === 4
        ) {
          const video = webcamRef.current.video;

          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();

          const canvas = canvasRef.current;
          const displaySize = { width: video.videoWidth, height: video.videoHeight };
          faceapi.matchDimensions(canvas, displaySize);

          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }
      }, 500);

      return () => clearInterval(interval);
    };

    loadModels().then(startFaceDetection);
  }, []);

  const handleIdentify = async () => {
  if (!uniId.trim()) {
    setMessage('Please enter your University ID.');
    return;
  }

  setLoading(true);
  setMessage('');

  try {
    const screenshot = webcamRef.current.getScreenshot();
    const img = await faceapi.fetchImage(screenshot);

    const detection = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setMessage('❌ No face detected. Please try again.');
      setLoading(false);
      return;
    }

    // 🛡️ SPOOF CHECK – Estimate if the face might be a photo based on eye distance
    const landmarks = detection.landmarks;
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();
    const eyeDistance = Math.abs(leftEye[0].x - rightEye[3].x);

    if (eyeDistance < 30) {
      setMessage('🛑 Possible spoof attempt. Face is too small or flat. Please show your real face.');
      setLoading(false);
      return;
    }

    const inputDescriptor = detection.descriptor;
    const voterSnapshot = await getDocs(collection(db, 'voters'));
    const allVoters = voterSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const matchedVoter = allVoters.find(v => v.uniId === uniId && v.faceDescriptors?.length === 384);

    if (!matchedVoter) {
      setMessage('❌ University ID not found or face data missing.');
      setLoading(false);
      return;
    }

    const storedDescriptors = [];
    for (let i = 0; i < 3; i++) {
      const descriptor = matchedVoter.faceDescriptors.slice(i * 128, (i + 1) * 128);
      storedDescriptors.push(new Float32Array(descriptor));
    }

    const distances = storedDescriptors.map(d => faceapi.euclideanDistance(inputDescriptor, d));
    const bestMatch = Math.min(...distances);

    if (bestMatch < 0.5) {
      const votesSnapshot = await getDocs(collection(db, 'votes'));
      const alreadyVoted = votesSnapshot.docs.some(doc => doc.data().voterId === matchedVoter.id);

      if (alreadyVoted) {
        setMessage('🗳️ You have already voted!');
      } else {
        navigate('/CandidateList', { state: { voter: matchedVoter } });
      }
    } else {
      setMessage('❌ Face does not match your ID.');
    }
  } catch (err) {
    console.error('Identification error:', err);
    setMessage('❌ An error occurred during verification.');
  }

  setLoading(false);
};


  const handleAdminSubmit = () => {
    if (adminPassword === 'admin123') {
      navigate('/StartElection');
    } else {
      alert('❌ Incorrect admin password.');
    }
    setShowPasswordPrompt(false);
    setAdminPassword('');
  };

  return (
    <div className="identify-page">
      <div className="top-right-icon" onClick={() => setShowPasswordPrompt(!showPasswordPrompt)}>
        <FaPowerOff size={24} title="End Election" />
      </div>

      {showPasswordPrompt && (
        <div className="dropdown-box" onClick={(e) => e.stopPropagation()}>
          <h4>Enter Admin Password</h4>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            placeholder="Admin Password"
          />
          <div className="dropdown-actions">
            <button onClick={handleAdminSubmit}>Submit</button>
            <button onClick={() => setShowPasswordPrompt(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="identify-container">
        <h2>🧑‍💼 Voter Identification</h2>

        <div className="camera-wrapper">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
            width={320}
            audio={false}
          />
          <canvas ref={canvasRef} className="overlay-canvas" />
        </div>

        <input
          type="text"
          placeholder="Enter University ID"
          value={uniId}
          onChange={(e) => setUniId(e.target.value)}
          className="input-box"
          id='in-box'
        />

        <button onClick={handleIdentify} className="btn-primary" disabled={loading}>
          {loading ? 'Checking...' : 'Check'}
        </button>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default VoterIdentify;
