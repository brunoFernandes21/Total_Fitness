import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [dbError, setDbError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => {
      return {
        ...current,
        [name]: value,
      };
    });
  };

  const validatePassword = () => {
    let isValid = true;
    if (formData.password !== formData.confirmPassword) {
      isValid = false;
      setPasswordError("Passwords do not match");
      return isValid;
    }
    setPasswordError(null);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userName = formData.username;
    const email = formData.email;
    const password = formData.password;
    if (validatePassword()) {
      try {
        setDbError(null);
        setLoading(true);
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredentials.user;
        await updateProfile(auth.currentUser, {
          displayName: userName,
        });
        setCurrentUser(user);
        console.log("Profile updated", user.displayName);
        setLoading(false);
        console.log("user created", user);
      } catch (error) {
        setDbError("Password should be at least 6 characters (weak-password).");
        setLoading(false);
      }
    }
  };

  return (
    <div className="container max-w-lg mx-auto  px-2">
      <form
        onSubmit={handleSubmit}
        className="border px-6 py-8 rounded shadow-md w-full"
      >
        <div className="flex flex-col gap-4 mb-4">
          <button className="google flex gap-2 text-white bg-gray-700 p-4 w-full font-medium rounded-full">
            <FcGoogle className="text-2xl" /> Sign in with Google
          </button>
        </div>
        <h1 className="mb-6 text-3xl text-center">Register</h1>
        {passwordError && (
          <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center "'>
            <span className="font-bold ">{passwordError}</span>
          </div>
        )}
        {dbError && (
          <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center "'>
            <span className="font-bold ">{dbError}</span>
          </div>
        )}
        <input
          type="text"
          className="block text-black border border-grey-light w-full p-3 rounded-md mb-4"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className="block text-black border border-grey-light w-full p-3 rounded-md mb-4"
          name="email"
          value={formData.email}
          placeholder="Email address"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className={`${
            passwordError ? " border-red-600" : ""
          } block text-black border border-grey-light w-full p-3 rounded-md mb-4`}
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className={`${
            passwordError ? " border-red-600" : ""
          } block text-black border border-grey-light w-full p-3 rounded-md mb-4`}
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="signup__btn w-full text-center py-3 rounded-md bg-green text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Create Account
        </button>
        <hr className="my-6" />
        <div className="mt-4 text-center">
          <p>Already have an account?</p>
          <button className="py-3 w-[60%] mt-2 rounded-md bg-blue-500 hover:bg-blue-600 transition duration-150 ease-in text-center text-white">
            <Link className="font-black" to="/login">
              <span > Login</span>
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
