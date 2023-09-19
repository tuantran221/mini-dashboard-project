import { useState, useEffect } from "react";
import firebase_app from "../config";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  getAuth,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export default function useFirebaseAuth() {
  const router = useRouter();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setAuthUser(authUser);
      } else {
        setAuthUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  // function login
  const Login = async (email, password) => {
    let result = null,
      error = null;
    try {
      result = await signInWithEmailAndPassword(auth, email, password);
      const key = "token";
      const value = {
        userName: authUser.email,
        passWord: password,
      };
      localStorage.setItem(key, JSON.stringify(value));

      console.log("login", authUser);
    } catch (e) {
      error = e;
    }

    return { result, error };
  };
  // function logOut
  const logOut = () => {
    router.push("/login");
    localStorage.removeItem("token");
  };
  // function signUp
  const signUp = async (email, password) => {
    let result = null,
      error = null;
    try {
      result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("sign up");
    } catch (e) {
      error = e;
    }

    return { result, error };
  };
  // reset password
  const resetPassWord = async(email) =>{
    let result = null,
    error = null;
  try {
    result = await sendPasswordResetEmail(auth, email);
    console.log("reset pass");
  } catch (e) {
    error = e;
  }

  return { result, error };
  }

  return {
    authUser,
    loading,
    Login,
    logOut,
    signUp,
    resetPassWord
  };
}
