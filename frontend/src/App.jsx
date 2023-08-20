import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { ProtectRoutes } from "../src/ProtectedRoutes";
import { UnProtectedRoutes } from "../src/UnprotectedRoutes";
import  {auth}  from "./firebase/firebase.js"
import { signOut } from "firebase/auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";


function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const logout = async() => {
    await signOut(auth)
    setCurrentUser(null)
  };

  console.log(currentUser)
  return (
    
    <div className="App">
      <Navbar user={currentUser} logout={logout} />
      <div className="max-w-[1200px] px-5 m-auto  text-slate-800">
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
            path="/profile"
            element={
              <ProtectRoutes user={currentUser}>
                <Profile />
              </ProtectRoutes>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectRoutes user={currentUser}>
                <UpdateProfile />
              </ProtectRoutes>
            }
          />
          {/* <Route path="/" element={user ? <Home /> : <Navigate to="/landing-page" />} /> */}
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
                <Login setCurrentUser={setCurrentUser}/>
              </UnProtectedRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <UnProtectedRoutes user={currentUser}>
                <Register setCurrentUser={setCurrentUser} />
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
    </div>
  );
}

export default App;
