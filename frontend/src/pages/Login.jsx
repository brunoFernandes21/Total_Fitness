import React from "react";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase.js";
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleGoogleAuth = async (event) => {
    event.preventDefault();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setCurrentUser(user);
      setLoading(false);
    } catch (error) {
      setError("Unable to login");
      setLoading(false);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = formData.email;
    const password = formData.password;
    try {
      setError("");
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUser(userCredential.user);
      setLoading(false);
    } catch (error) {
      setError("We did not recognise your details");
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="border px-6 py-8 rounded shadow-md text-slate-800 w-full flex flex-col">
        <div className="flex flex-col gap-4 mb-4">
          <button
            onClick={handleGoogleAuth}
            className="google flex gap-2 text-white p-4 w-full font-medium rounded-full"
          >
            <FcGoogle className="text-2xl" /> Sign in with Google
          </button>
        </div>
        <h1 className="mb-6 text-3xl text-center">Login to your account</h1>
        {error && (
          <div className="bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center">
            <span className="font-bold">{error}</span>
          </div>
        )}
        <form onSubmit={handleLogin} className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded-md mb-4 text-black"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="block border border-grey-light w-full text-black p-3 rounded-md mb-4"
            name="password"
            id="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            className="signup__btn text-white w-full text-center py-3 rounded-md my-1 "
          >
            Login
          </button>
          <div className="mt-3 text-center text-slate-800">
            <span>Forgotten Password? </span>
            <Link className="underline font-black" to="/reset-password">
              Click here
            </Link>
            <span> to reset it.</span>
          </div>
          <hr className="my-6" />
          <button className=" p-3 w-[60%] m-auto rounded-md bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in text-center text-lg text-white">
            <Link to="/register">
              <span> Create New Acccount</span>
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
