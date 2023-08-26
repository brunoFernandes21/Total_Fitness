import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { BiSolidUserCircle } from "react-icons/bi";

const PersonalDetails = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updateDetails = () => {
    navigate("/user/personal-details/update-personal-details");
  };
  return (
    <div className="container max-w-lg mx-auto px-5 md:px-0">
      <div className="border px-6 py-8 rounded shadow-md w-full flex flex-col">
      <h1 className="mb-2 text-3xl text-center">Personal Details</h1>
        <div className="grid">
          <div className="py-4 text-center flex flex-col">
            {currentUser.photoURL && <strong>Your avatar</strong>}
            {!currentUser.photoURL && <strong>Upload an avatar</strong>}
            <div className="mt-2 mx-auto bg-blue-700 rounded-full w-20 h-20 overflow-hidden">
              {currentUser.photoURL && (
                <img
                  src={currentUser.photoURL}
                  alt="New user photo"
                  className="w-20 h-20 text-white"
                />
              )}
              {!currentUser.photoURL && (
                <BiSolidUserCircle className="w-20 h-20 text-white" />
              )}
            </div>
          </div>
          <div className="py-4 flex flex-col justify-center items-center">
            <p>
              <strong>Name:</strong> {currentUser.displayName}
            </p>
          </div>
        </div>
        <button
          onClick={updateDetails}
          className="signup__btn w-[50%] m-auto text-center py-3 mt-4 rounded text-white my-1"
        >
          Update Details
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
