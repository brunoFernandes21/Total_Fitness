import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
    const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const {name, value} = event.target
    setFormData((current) => {
        return {
            ...current,
            [name]: value
        }
    })
  }

  const handleSubmit = async(event) => {
    event.preventDefault()
  } 

  return (
    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="border px-6 py-8 rounded shadow-md w-full">
        <h1 className="mb-6 text-3xl text-center">Update Profile</h1>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="block text-black border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          id="email"
          placeholder="Leave blank to keep the same"
          value={formData.email}
          onChange={handleChange}
        //   defaultValue={currentUser.email}
        />
        <label htmlFor="email">Password</label>
        <input
          type="password"
          className="block text-black border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          id="password"
          placeholder="Leave blank to keep the same"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          className="block text-black border border-grey-light w-full p-3 rounded mb-4"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Leave blank to keep the same"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="signup__btn w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Update Profile
        </button>

        <div className="text-grey-dark mt-4 text-center">
          <Link className="hover:underline text-xl" to="/profile">
            <p>Cancel</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
