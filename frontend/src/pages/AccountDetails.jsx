import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { deleteUser } from "firebase/auth";

const AccountDetails = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateDetails = () => {
    navigate("/user/account-details/update-account-details");
  };

  const handleDelete = async() => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      await deleteUser(currentUser)
      
      setError(null)
      setMessage("Your account has been deleted successfully")
      setLoading(false)
      console.log("User deleted")
      setTimeout(() => {
        setCurrentUser(null)
        navigate("/landing-page")
      }, 3000);
    } catch (error) {
      setError("Unable to delete account")
      setMessage(null)
      setLoading(false)
    }

  }
  return (
    <div className="container max-w-2xl mx-auto px-5 md:px-0">
      <div className="border px-6 py-8 rounded shadow-md w-full flex flex-col">
        <h1 className="text-center mb-3 text-xl">
          <strong>Account Details</strong>
        </h1>
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
        <div className="grid md:grid-cols-2 md:gap-4">
          <div className="py-4">
            <p><strong>Email address</strong></p>

            <div className="bg-slate-100 p-4 rounded-md mt-2">
            <p>
              {currentUser.email}
            </p>
            </div>
          </div>
          <div className="py-4">
          <strong>Password</strong>
          <div className="bg-slate-100 p-4 rounded-md mt-2">
            <p>
              ***************
            </p>
          </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between">
        <button
          onClick={updateDetails}
          className="signup__btn w-lg m-auto text-center p-3 mt-4 rounded text-white my-1"
        >
          Update Details
        </button>

        <button disabled={loading} onClick={handleDelete} className="signup__btn w-lg m-auto text-center p-3 mt-4 rounded text-white my-1">
          Delete Account
        </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
