import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link } from "react-router-dom";
import { useState } from "react";


const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
  
    const handleChange = (event) => {
      setEmail(event.target.value);
    };
    const validatePassword = () => {
      let isValid = true;
      if (email === "") {
        return isValid = false;
      } 
      return isValid
    };
    const reset = async () => {
      if (validatePassword()) {
        try {
          setMessage("");
          setError("");
          setLoading(true);
          await sendPasswordResetEmail(auth, email);
          setEmail("")
          setMessage("Check your email for instructions");
          console.log("Password reset email sent!");
        } catch (error) {
          setError("Invalid email address");
          setLoading(false);
        }
      }
    };
  
  return (
    <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="px-6 py-8 border rounded shadow-md w-full">
        <div className="flex flex-col gap-4 mb-4"></div>
        <h1 className="mb-6 text-3xl text-center">Password Reset</h1>
        {error && (
          <div className='bg-red-100 border mb-5 border-red-400 text-red-700 px-4 py-3 rounded flex justify-center'>
            <span className="font-bold">{error}</span>
          </div>
        )}
        {message && (
          <div className='bg-green-100 border mb-5 border-green-400 text-green-700 px-4 py-3 rounded flex justify-center'>
            <span className="font-bold">{message}</span>
          </div>
        )}
        <input
          type="email"
          className="block border text-black border-grey-light w-full p-3 rounded-full mb-4"
          name="email"
          value={email}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          onClick={reset}
          className="signup__btn w-full text-center py-3 rounded-full text-white my-1"
        >
          Reset Password
        </button>
        <div className=" mt-3 text-center rounded text-xl">
          <Link to="/login" className="hover:underline">
            <p> Back to Login </p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword