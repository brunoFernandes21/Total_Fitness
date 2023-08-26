import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { auth, storage } from "../firebase/firebase.js";
import { updateProfile } from "firebase/auth";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { BiSolidUserCircle } from "react-icons/bi";

const UpdateUserDetails = () => {
  const { currentUser, setUserName, newPhoto, setNewPhoto } =
    useContext(UserContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name !== "" || avatar !== null) {
      setLoading(true);
      setError(null);
      setMessage(null);

      if (name !== "" && currentUser.name !== name) {
        try {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });
          setUserName(name);
          setMessage("You profile pic has been updated");
          setTimeout(() => {
            navigate("/user/personal-details");
          }, 3000);
          setError(null);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError("Unable to update details");
          setMessage(null);
        }
      }
      if (
        (avatar !== null && currentUser.photoURL !== newPhoto) ||
        currentUser.photoURL === null
      ) {
        try {
          const avatarRef = storageRef(storage, `${currentUser.uid}`);
          const snapshot = await uploadBytes(avatarRef, avatar);
          const url = await getDownloadURL(snapshot.ref);
          setNewPhoto(url);
          await updateProfile(auth.currentUser, {
            photoURL: url,
          });
          setMessage("You profile pic has been updated");
          setTimeout(() => {
            navigate("/user/personal-details");
          }, 3000);
          setError(null);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError("Unable to update details");
          setMessage(null);
        }
      }
    } else {
      setError("You must fill in the form to change name or avatar");
    }
  };

  return (
    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-5 md:px-0">
      <form
        className="border px-6 py-8 rounded shadow-md w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-3xl text-center">Update Details</h1>

        {error && (
          <div className='bg-red-100 border flex justify-center mb-5 border-red-400 text-red-700 px-4 py-3 mt-4 rounded "'>
            <span className="font-bold">{error}</span>
          </div>
        )}
        {message && (
          <div className='bg-green-100 border mb-5 flex justify-center border-green-400 text-green-700 px-4 py-3 mt-4 rounded " '>
            <span className="font-bold">{message}</span>
          </div>
        )}
           <div className="text-lg mx-auto text-slate-800 transition duration-150 ease-in font-bold bg-blue-700 w-20 h-20 rounded-full overflow-hidden flex justify-center items-center">
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

        <div className="flex justify-center mt-4">
        <label htmlFor="avatar" className="inline-block mb-4 p-2 rounded-md border cursor-pointer bg-blue-700 text-white">Upload avatar
        <input
          type="file"
          className="hidden  border border-grey-light w-full p-3 rounded mb-4"
          name="avatar"
          id="avatar"
          accept="image/png,image/jpeg"
          placeholder="Leave blank to keep the same"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
        </label>
        </div>

        <label htmlFor="name">Name</label>
        <input
          type="name"
          className="block bg-slate-100 text-black border border-grey-light w-full p-3 rounded mb-4"
          name="name"
          id="name"
          placeholder="Leave blank to keep the same"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          disabled={loading}
          className="signup__btn w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Save
        </button>

        <div className="text-grey-dark mt-4 text-center">
          <Link className="hover:underline text-xl" to="/user/personal-details">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetails;
