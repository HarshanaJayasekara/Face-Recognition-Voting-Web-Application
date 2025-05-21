# Face-Recognition-Voting-Web-Application
A secure, modern web-based voting system using face recognition technology for authenticating voters. Built with React, integrated with Firebase, and powered by face-api.js, this application ensures that only verified university students can cast their vote—once per election.

## Summary
This project is a university-level Facial Recognition Voting System built using React and Firebase. It allows voters to authenticate using their face and University ID before casting votes. Admins can manage candidates, initiate elections, view results, and more. The system is designed to ensure transparency, accessibility, and fraud prevention during elections.

## Features
Voter and Candidate Registration with webcam face capture
Admin Dashboard and Election Management
Face recognition login for voters using face-api.js
Candidate listing and profile display
Voting system with one-time vote tracking
PDF result download
Complaint and Idea Submission Module
Voting location map integration
Firebase integration for authentication, database, and image storage

## Project Poster
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Screenshot%20(64).png?raw=true)

Github link 
```bash
https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application
```
## Setup & Installation
```bash
npx create-react-app final-voting-system
cd final-voting-system
npm install
npm install react-router-dom react-webcam react-icons react-leaflet leaflet emailjs-com face-api.js jspdf
```

Firebase Setup
1. Initialize Firebase project
2. Enable Authentication, Firestore, and Storage
3. Create firebase.js:
## create firebase folder and firebase.js file
```bash
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBQXa9B22A-I56_WIwcsE_zBb7UXHl-0DU",
  authDomain: "final-voting-system-1adee.firebaseapp.com",
  projectId: "final-voting-system-1adee",
  storageBucket: "final-voting-system-1adee.firebasestorage.app",
  messagingSenderId: "1045020801698",
  appId: "1:1045020801698:web:c77c4add1d347769e275fb"
};

const app = initializeApp();
```
4. Run
```bash
firebase login
firebase init
firebase deploy
```
```bash
firebase login
```
```bash
firebase init
```
```bash
firebase deploy
```
public folder add to face-api.js Module folder
```bash
npm install face-api.js
```
## Directory Structure
```bash
src/
├── firebase/
│   └── firebaseConfig.js
├── pages/
│   ├── AdminLogin.js
│   ├── AdminRegister.js
│   ├── CandidateManager.js
│   ├── CandidateProfile.js
│   ├── CandidateRegister.js
│   ├── ElectionStart.js
│   ├── Home.js
│   ├── RulesGuidelines.js
│   ├── UserDashboard.js
│   ├── VoterIdentify.js
│   ├── VoterRegister.js
│   ├── VoterList.js
│   └── VotingPage.js
├── assets/
│   └── images/
│       └── bg.jpg
├── App.js
└── index.js
```
## Face Recognition Setup
1. Place face-api.js models inside public/models/.
2. Load the models before webcam face recognition is used.

## Map Integration
Add election location using Leaflet:
```bash
npm install react-leaflet leaflet
```
Configure with:
```bash
<MapContainer center={[latitude, longitude]} zoom={13}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[latitude, longitude]} />
</MapContainer>
```
## Email Feedback
Enable EmailJS for feedback/complaints:
```bash
npm install emailjs-com
```
```bash
import emailjs from 'emailjs-com';
```

For Additional 
```bash
App.js
function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
        </Routes>
      </Router>
    </div>
  );}
export default App;
```
index file 
```bash
import './index.css';
```
```bash
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  background-image: url("./assets/bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
}
.container {
  width: 90vw;
  height: 90vh;
  background-color: rgba(17, 25, 40, 0.75);
  backdrop-filter: blur(10px) saturate(180%);
  border-radius: 12px;
  border: 1px solid rgba(225, 225, 225, 0.125);
  display: flex;
  align-items: center;
  justify-content: center; 
}
```
##  Pages Overview
1. Admin Register & Login
2. Admin Dashboard
3. Voter & Candidate Registration
4. Start Election
5. Voter Identify (Face Recognition)
6. Candidate List & Profile
7. Voting Result
8. Complaint & Feedback Form
9. Election Rules & Location

   
# Sample Pages Preview

## Sign Up Page
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Sign%20up.png?raw=true)

## Sign In Page
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Sign%20in.png?raw=true)

## Admin DashBoard
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Admin%20Page.png?raw=true)

## Admin, Start the Election
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Election%20Start.png?raw=true)

## Registered Voter enters their Uni ID & the system verifies their identity using webcam-based face recognition 
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Voter%20Scanning.png?raw=true)

## Voters select their preferred candidate & submit their Vote
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Candidate%20list.png?raw=true)
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Candidate%20Profile.png?raw=true)

## Electin Result page & Download a PDF or text file
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Election%20Result.png?raw=true)

## Candidate management: Add/Edit/Remove
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Candidate%20Manage.png?raw=true)
## Candidate Registration 
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Candidate%20Manage.png?raw=true)
## User Home page
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/User%20Home%20page.png?raw=true)
## Voter list 
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Voter%20list.png?raw=true)
## Election Location
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Elaction%20Lcation.png?raw=true)
## Rule & guidline 
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Rules%20page.png?raw=true)
## idea & Complaint page
![qemu-system-i386_9uboZE0RkA](https://github.com/HarshanaJayasekara/Face-Recognition-Voting-Web-Application/blob/main/assets/Idea%20&%20complaine.png?raw=true)

---

👨‍💻 Developed By  
**Harshana Jayasekara**  
[GitHub](https://github.com/HarshanaJayasekara) | [Portfolio](https://harshanajayasekara.github.io/) | [LinkedIn](https://www.linkedin.com/in/harshana-jayasekara/)

