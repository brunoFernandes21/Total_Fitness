import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import { useContext, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { ProtectRoutes } from "../src/ProtectedRoutes";
import { UnProtectedRoutes } from "../src/UnprotectedRoutes";
import  {auth}  from "./firebase/firebase.js"
import { signOut } from "firebase/auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import PersonalDetails from "./pages/PersonalDetails";
import UpdateUserDetails from "./pages/UpdateUserDetails";
import AccountDetails from "./pages/AccountDetails";
import UpdateAccountDetails from "./pages/UpdateAccountDetails";
import Footer from "./components/Footer";
import Workouts from "./pages/Workouts";

//SET UP ACCOUNT DETAILS UPDATE, EMAIL AND PASSWORD

function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [showInfo, setShowInfo] = useState(false)
  const logout = async() => {
    await signOut(auth)
    setCurrentUser(null)
    setShowInfo(false)
  };

  return (
    
    <div className="App">
      <Navbar user={currentUser} logout={logout} showInfo={showInfo} setShowInfo={setShowInfo} />
      <div className="max-w-[1200px] p-5 m-auto text-slate-800">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoutes user={currentUser}>
                <Home />
              </ProtectRoutes>
            }
          />
          <Route
            path="/user/personal-details"
            element={
              <ProtectRoutes user={currentUser}>
                <PersonalDetails />
              </ProtectRoutes>
            }
          />
          <Route
            path="/user/personal-details/update-personal-details"
            element={
              <ProtectRoutes user={currentUser}>
                <UpdateUserDetails />
              </ProtectRoutes>
            }
          />
          <Route
            path="/user/account-details"
            element={
              <ProtectRoutes user={currentUser}>
                <AccountDetails />
              </ProtectRoutes>
            }
          />
          <Route
            path="/user/account-details/update-account-details"
            element={
              <ProtectRoutes user={currentUser}>
                <UpdateAccountDetails />
              </ProtectRoutes>
            }
          />
          <Route
            path="/user/workouts"
            element={
              <ProtectRoutes user={currentUser}>
                <Workouts />
              </ProtectRoutes>
            }
          />
          <Route
            path="/landing-page"
            element={
              <UnProtectedRoutes user={currentUser}>
                <LandingPage />
              </UnProtectedRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <UnProtectedRoutes user={currentUser}>
                <Login/>
              </UnProtectedRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <UnProtectedRoutes user={currentUser}>
                <Register />
              </UnProtectedRoutes>
            }
          />
          <Route
            path="/reset-password"
            element={
              <UnProtectedRoutes user={currentUser}>
                <ResetPassword />
              </UnProtectedRoutes>
            }
          />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
