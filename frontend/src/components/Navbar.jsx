import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";

const Navbar = ({ logout, showInfo, setShowInfo }) => {
  const { currentUser, newPhoto } = useContext(UserContext);
  const [welcomeMessage, setWelcomeMessage] = useState(null);

  useEffect(() => {
    welcomeMsg();
  }, []);
  const welcomeMsg = () => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let time = hours + ":" + minutes;

    if (time > "00:00" && time < "12:00") {
      setWelcomeMessage(`Good Morning,`);
    } else if (time > "12:00" && time < "18:00") {
      setWelcomeMessage(`Good Afternoon,`);
    } else {
      setWelcomeMessage(`Good Evening,`);
    }
  };
  return (
    //className="sticky top-0 z-30" -add this to make nav fixed
    <header className="sticky top-0 z-30 bg-white">
      <nav className="nav max-w-[1200px] flex justify-between items-center m-auto py-3 px-4 md:py-5 relative">
        <Link to={"/"}>
          <h1 className="text-xl md:text-2xl text-blue-700 transition duration-150 ease-in hover:text-blue-500 font-black">
            TotalFitness
          </h1>
        </Link>

        <div className=" flex justify-center items-center gap-6 ">
          {currentUser && (
            <div className="flex justify-center items-center gap-4">
              <p>
                {welcomeMessage} <strong>{currentUser.displayName}</strong>
              </p>
              <button
                className=" bg-blue-700 w-10 h-10 rounded-full overflow-hidden flex justify-center items-center"
                onClick={() => setShowInfo(!showInfo)}
              >
                {newPhoto && (
                  <img
                    src={newPhoto}
                    alt="New user photo"
                    className="w-10 h-10 text-white"
                  />
                )}
                {!newPhoto && currentUser.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt="New user photo"
                    className="w-10 h-10 text-white"
                  />
                )}
                {!currentUser.photoURL && (
                  <BiSolidUserCircle className="w-10 h-10 text-white" />
                )}
              </button>

              {showInfo && (
                <div className="bg-white rounded-md absolute top-[52px] md:top-[60px] right-4 shadow-md border">
                  <div className="p-4 flex gap-4 justify-center items-center">
                    <div className=" text-lg text-slate-800 transition duration-150 ease-in font-bold bg-blue-700 w-10 h-10 rounded-full overflow-hidden flex justify-center items-center">
                      {newPhoto && (
                        <img
                          src={newPhoto}
                          alt="New user photo"
                          className="w-10 h-10 text-white"
                        />
                      )}
                      {!newPhoto && currentUser.photoURL && (
                        <img
                          src={currentUser.photoURL}
                          alt="New user photo"
                          className="w-10 h-10 text-white"
                        />
                      )}
                      {!currentUser.photoURL && (
                        <BiSolidUserCircle className="w-10 h-10 text-white" />
                      )}
                    </div>
                    <div>
                      <p>{currentUser.displayName}</p>
                      <p>{currentUser.email}</p>
                    </div>
                  </div>

                  <hr className=" border-2" />

                  <ul className=" flex flex-col justify-start items-start text-lg divide-y">
                    <Link
                      to="/user/workouts"
                      className="px-4 py-4 transition duration-150 ease-in hover:bg-slate-100 inline-block w-full"
                      onClick={() => setShowInfo(!showInfo)}
                    >
                      My workouts
                    </Link>
                    <Link
                      to="/user/personal-details"
                      className="px-4 py-4 transition duration-150 ease-in hover:bg-slate-100 inline-block w-full"
                      onClick={() => setShowInfo(!showInfo)}
                    >
                      Personal details
                    </Link>

                    <Link
                      to="/user/account-details"
                      className="px-4 py-4 transition duration-150 ease-in hover:bg-slate-100 w-full"
                      onClick={() => setShowInfo(!showInfo)}
                    >
                      Manage account
                    </Link>
                    <button
                      className="px-4 py-4 text-red-600 transition duration-150 ease-in hover:bg-slate-100 w-full text-left"
                      onClick={logout}
                    >
                      Sign Out
                    </button>
                  </ul>
                </div>
              )}
            </div>
          )}

          {!currentUser && (
            <div className="flex justify-center items-center gap-6">
              <Link
                to="/login"
                className="text-sm text-slate-800 transition duration-150 ease-in hover:underline font-bold"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="text-sm text-slate-800 transition duration-150 ease-in hover:underline font-bold"
              >
                REGISTER
              </Link>
            </div>
          )}

          {/* <div className="md:hidden hover:bg-slate-800 hover:text-white p-2 rounded cursor-pointer transition duration-150 ease-in ">
            <FaBars className="" />
          </div> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
