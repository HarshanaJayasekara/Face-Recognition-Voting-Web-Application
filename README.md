# Face-Recognition-Voting-Web-Application
Face Recognition Voting Web Application

             FACE RECOGNITION VOTING SYSTEM

```bash
create-react-app final-voting-system
cd final-voting-system
npm install
```
```bash
npm install react-router-dom
```
```bash
npm install -g firebase-tools
npm install firebase
```

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
firebase-voting-system
firebase Get start
* Authentication
* Firebase Database
* firebase Storage

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
face api model
public/module

file location
src/firebase/firebaseConfig.js
src/assets/images

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
## pages ->
1. Admin Register
2. Admin Login
3. Home 
```bash
npm install react-webcam
```
4. Voter Register
5. Candidate Register
6. Candidate Manager

```bash
npm install react-icons
```
7. Start Election
8. Voter Identify
9. Candidate List
10. Candidate Profile

```bash
User Dashboard
src/pages/user/userHome
```

11. User Dashboard
12. Voter list

```bash
npm install react-leaflet leaflet
```
13. Voting Location
14. Rules and Guideline

```bash
npm install emailjs-com
```

15.
