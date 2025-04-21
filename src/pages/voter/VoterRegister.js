import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { db, storage } from '../../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import RightSlider from '../../components/RightSlider';
import * as faceapi from 'face-api.js';
import './VoterRegister.css';

const VoterRegister = ({ user, showImage, setShowImage, handleLogout, navCards }) => {
  const webcamRef = useRef(null);
  const [voter, setVoter] = useState({ name: '', uniId: '', faculty: '', batch: '' });
  const [capturedImages, setCapturedImages] = useState([]);
  const [descriptors, setDescriptors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        ]);
        console.log('Models loaded successfully!');
      } catch (err) {
        console.error('Error loading face-api.js models:', err);
        setError('Error loading face recognition models.');
      }
    };
    loadModels();
  }, []);

  const handleChange = (e) => {
    setVoter({ ...voter, [e.target.name]: e.target.value });
  };

  const captureImage = async () => {
    if (capturedImages.length >= 3) {
      alert("You’ve already captured 3 images.");
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    const img = await faceapi.fetchImage(screenshot);
    const detections = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detections) {
      setError('Face not detected! Please try again.');
      return;
    }

    setCapturedImages([...capturedImages, screenshot]);
    setDescriptors([...descriptors, Array.from(detections.descriptor)]);
    setError('');
  };

  const resetCaptures = () => {
    setCapturedImages([]);
    setDescriptors([]);
    setSuccess('');
    setError('');
  };

  const uploadImagesToFirebase = async () => {
    const urls = [];
    for (let base64 of capturedImages) {
      const imageRef = ref(storage, `voters/${uuidv4()}.jpg`);
      const response = await fetch(base64);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const url = await getDownloadURL(imageRef);
      urls.push(url);
    }
    return urls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (capturedImages.length !== 3 || descriptors.length !== 3) {
      alert('Please capture 3 valid images with face recognition.');
      return;
    }

    setIsSubmitting(true);
    try {
      const photoUrls = await uploadImagesToFirebase();
      const flattenedDescriptors = descriptors.flat();

      await addDoc(collection(db, 'voters'), {
        ...voter,
        photoUrls,
        faceDescriptors: flattenedDescriptors,
        createdAt: new Date(),
      });

      setSuccess('✅ Voter registered successfully!');
      resetCaptures();
      setVoter({ name: '', uniId: '', faculty: '', batch: '' });
    } catch (err) {
      console.error('Error submitting data:', err);
      setError(`❌ Submission failed: ${err.message}`);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Navbar />
      <LeftSidebar navCards={navCards} />

      <div className="voter-register-page">
        <div className="voter-container">

          {/* Left side: Form */}
          <div className="form-section">
            <h2>🗳️ Voter Registration</h2>
            <p>Register new university voters with 3 face-recognized images.</p>
            <form onSubmit={handleSubmit} className="form-grid">
              <input name="name" placeholder="Full Name" value={voter.name} onChange={handleChange} required />
              <input name="uniId" placeholder="University ID" value={voter.uniId} onChange={handleChange} required />
              <input name="faculty" placeholder="Faculty" value={voter.faculty} onChange={handleChange} required />
              <input name="batch" placeholder="Batch" value={voter.batch} onChange={handleChange} required />

              <div className="submit-section">
                <button type="submit" disabled={isSubmitting} className="btn btn-submit">
                  {isSubmitting ? 'Submitting...' : 'Register Voter'}
                </button>
              </div>
            </form>

            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-msg">{error}</p>}
          </div>

          {/* Right side: Camera & images */}
          <div className="camera-section">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam"
            />
            <div className="buttons">
              <button type="button" onClick={captureImage} disabled={capturedImages.length >= 3} className="btn btn-capture">
                📸 Capture Image ({capturedImages.length}/3)
              </button>
              <button type="button" onClick={resetCaptures} className="btn btn-reset">
                🔄 Reset
              </button>
            </div>

            <div className="captured-images">
              {capturedImages.map((img, i) => (
                <img key={i} src={img} alt={`Capture ${i + 1}`} className="captured-image" />
              ))}
            </div>
          </div>

        </div>
      </div>

      <RightSlider user={user} showImage={showImage} setShowImage={setShowImage} handleLogout={handleLogout} />
    </>
  );
};

export default VoterRegister;
