import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const PersonalDetails = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const updateDetails = () => {
    navigate("/user/personal-details/update-personal-details");
  };
  return (
    <div className="container max-w-2xl mx-auto px-5 md:px-0">
      <div className="border px-6 py-8 rounded shadow-md w-full flex flex-col">
        <h1 className="text-center mb-3 text-xl">
          <strong>Personal Details</strong>
        </h1>
        <div className="grid md:grid-cols-2 md:gap-4">

          <div className="py-4">
          <strong>Avatar</strong>
          <div className="bg-slate-100 p-4 rounded-md mt-2">
            <p>
              Default Avatar
            </p>
          </div>
          </div>
          <div className="py-4">
            <p><strong>Name</strong></p>
            <div className="bg-slate-100 p-4 rounded-md mt-2">
            <p>
              {currentUser.displayName}
            </p>
            </div>
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
