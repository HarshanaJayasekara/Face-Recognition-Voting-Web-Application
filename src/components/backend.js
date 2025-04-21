import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebaseConfig';

export const handleLogout = async () => {
  await signOut(auth);
};

export const checkAuthState = (setUser) => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  return unsubscribe;
};
