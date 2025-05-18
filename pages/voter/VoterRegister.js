import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { db, storage } from '../../firebase/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar';
import LeftSidebar from '../../components/LeftSidebar';
import RightSlider from '../../components/RightSlider';
import * as faceapi from 'face-api.js';
import './VoterRegister.css';

const VoterRegister = ({ user, showImage, setShowImage, handleLogout, navCards }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
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
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);
        console.log('✅ Face-api models loaded');
      } catch (err) {
        console.error('❌ Model load error:', err);
        setError('Failed to load face-api models.');
      }
    };
    loadModels();
  }, []);

  const detectFaceLandmarks = useCallback(async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4 && canvasRef.current) {
      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      detectFaceLandmarks();
    }, 150);
    return () => clearInterval(interval);
  }, [detectFaceLandmarks]);

  const handleChange = (e) => {
    setVoter({ ...voter, [e.target.name]: e.target.value });
  };

  const captureImage = async () => {
    if (capturedImages.length >= 3) {
      alert('You’ve already captured 3 images.');
      return;
    }

    const screenshot = webcamRef.current.getScreenshot();
    const img = await faceapi.fetchImage(screenshot);
    const detection = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setError('No face detected! Try again.');
      return;
    }

    setCapturedImages([...capturedImages, screenshot]);
    setDescriptors([...descriptors, Array.from(detection.descriptor)]);
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
    setError('');
    setSuccess('');

    if (capturedImages.length !== 3 || descriptors.length !== 3) {
      setError('Please capture 3 images before submitting.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 🔍 Check if uniId already exists
      const q = query(collection(db, 'voters'), where('uniId', '==', voter.uniId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setError('❌ University ID already registered!');
        setIsSubmitting(false);
        return;
      }

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
      console.error(err);
      setError(`❌ Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <LeftSidebar navCards={navCards} />
      <div className="voter-register-page">
        <div className="voter-container">
          <div className="form-section">
            <h2>Voter Registration</h2>
            <p>Register by capturing 3 facial images with landmarks.</p>
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

          <div className="camera-section">
            <div style={{ position: 'relative' }}>
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                width={400}
                height={300}
                videoConstraints={{ width: 400, height: 300 }}
              />
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                style={{ position: 'absolute', top: 0, left: 0 }}
              />
            </div>

            <div className="buttons">
              <button onClick={captureImage} disabled={capturedImages.length >= 3} className="btn btn-capture">
                📸 Capture ({capturedImages.length}/3)
              </button>
              <button onClick={resetCaptures} className="btn btn-reset">
                🔄 Reset
              </button>
            </div>

            <div className="captured-images">
              {capturedImages.map((img, idx) => (
                <img key={idx} src={img} alt={`Capture ${idx + 1}`} className="captured-image" />
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
