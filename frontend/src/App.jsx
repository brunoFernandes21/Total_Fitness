import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";

import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";

function App() {
  const { user } = useContext(UserContext);

  console.log(user);
  return (
    <div className="App">
      <Navbar />
      <div className="max-w-[1200px] px-5 m-auto  text-slate-800">
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/landing-page" />} />
          <Route path="/landing-page" element={!user ? <LandingPage /> : <Navigate to="/" /> } />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
