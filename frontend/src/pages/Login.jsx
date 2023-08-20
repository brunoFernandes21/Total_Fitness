import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <Link to="/" onClick={()=> setUser("Neia")}>Login</Link>
    </div>
  )
}

export default Login