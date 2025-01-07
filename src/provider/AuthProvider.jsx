import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import auth from "../utils/firebase.config.js";

export const AuthContext = createContext();


const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  async function registerUser(name, email) {
    try {
      const response = await fetch(`${VITE_BACKEND_URL}register`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });
      await response.json();
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  const createUser = async (email, password, name, imageURL) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      await updateProfile(newUser, {
        displayName: name,
        photoURL: imageURL,
      });
      await registerUser(name, email)
      setUser({ ...newUser, displayName: name, photoURL: imageURL });

      return newUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Failed to sign in: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user.photoURL || user.displayName) {
        await updateProfile(auth.currentUser, {
          photoURL: user.photoURL || null,
          displayName: user.displayName || null,
        });
      }
      await registerUser(user.displayName, user.email)
      return user;
    } catch (error) {
      throw new Error(`Failed to sign in with Google: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGitHub = async () => {
    const provider = new GithubAuthProvider();
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      await registerUser(user.displayName, user.email)
      if (user.photoURL || user.displayName) {
        await updateProfile(auth.currentUser, {
          photoURL: user.photoURL || null,
          displayName: user.displayName || null,
        });
      }
      return user;
    } catch (error) {
      throw new Error(`Failed to sign in with GitHub: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);

    } catch (error) {
      throw new Error(`Failed to sign out: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const authInfo = {
    user,
    setUser,
    createUser,
    signIn,
    signInWithGoogle,
    signInWithGitHub,
    signOutUser,
    loading,

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
