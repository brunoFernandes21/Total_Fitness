import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Profile = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updateProfile = () => {
    navigate("/update-profile");
  };
  return (
    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="border px-6 py-8 rounded shadow-md w-full">
        <h1 className="text-center mb-3 text-xl">
          <strong>Profile Page</strong>
        </h1>
        <h3>
          <strong>Name:</strong> {currentUser.displayName}
        </h3>
        <p>
          <strong>Email: </strong>
          {currentUser?.email}
        </p>
        <button className="bg-slate-800 text-white p-2 rounded">
          Delete Account
        </button>
        <button
          onClick={updateProfile}
          className="signup__btn w-full text-center py-3 mt-4 rounded text-white my-1"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
