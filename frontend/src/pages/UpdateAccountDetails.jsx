import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase.js";
import {
  updateEmail,
  updatePassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";

const UpdateAccountDetails = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentEmail: currentUser.email,
    newEmail: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => {
      return {
        ...current,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.newEmail !== "" || formData.password !== "") {
      if (currentUser.email !== formData.newEmail) {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
          await updateEmail(auth.currentUser, formData.newEmail);
          await sendEmailVerification(auth.currentUser);
          setLoading(false);
        } catch (error) {
          setLoading(true);
          setError("Unable to update details");
        }
      }

      if (currentUser.password !== formData.password) {
        setLoading(true);
        setError(null);
        setMessage(null);
        try {
          await updatePassword(currentUser, formData.password);
          await sendPasswordResetEmail(auth, formData.email);
          setLoading(false);
        } catch (error) {
          setLoading(true);
          setError("Unable to update details");
        }
      }
      setMessage("Check your email for instructions");
      navigate("/user/account-details");
    }
  };

  return (
    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <form
        className="border px-6 py-8 rounded shadow-md w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-3xl text-center">Update Details</h1>
        {error && (
          <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"'>
            <span className="font-bold">{error}</span>
          </div>
        )}
        {message && (
          <div className='bg-green-100 border mb-5 border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert"'>
            <span className="font-bold">{message}</span>
          </div>
        )}

        <label htmlFor="currentEmail">Current Email</label>
        <input
          type="email"
          className="block text-black border border-grey-light w-full p-3 rounded mb-4"
          name="currentEmail"
          id="currentEmail"
          placeholder="Leave blank to keep the same"
          value={formData.currentEmail}
          onChange={handleChange}
        />
        <label htmlFor="newEmail">New Email</label>
        <input
          type="email"
          className="block text-black border border-grey-light w-full p-3 rounded mb-4"
          name="newEmail"
          id="newEmail"
          placeholder="Leave blank to keep the same"
          value={formData.newEmail}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="block text-black border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          id="password"
          placeholder="Leave blank to keep the same"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className={` w-full text-center py-3 rounded bg-blue text-white hover:bg-green-dark focus:outline-none my-1 bg-slate-800`}
        >
          Save
        </button>

        <div className="text-grey-dark mt-4 text-center">
          <Link className="hover:underline text-xl" to="/user/account-details">
            <p>Cancel</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateAccountDetails;
