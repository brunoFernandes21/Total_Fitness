import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BiSolidUserCircle } from "react-icons/bi"
import { useState } from "react";

const Navbar = ({ user, logout, showInfo, setShowInfo }) => {
  
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
          {user && (
            <div className="flex justify-center items-center gap-4">
              <button className="text-lg text-slate-800 transition duration-150 ease-in font-bold bg-blue-700 w-10 h-10 rounded-full overflow-hidden flex justify-center items-center" onClick={() => setShowInfo(!showInfo)}>
                <BiSolidUserCircle className="w-10 h-10 text-white"/>
              </button>

           { showInfo &&  <div className="bg-white rounded-md absolute top-[60px] right-3 shadow-md " >
                <ul className="grid grid-cols justify-start items-start text-lg divide-y">
                  <p className="px-4 py-2 ">{user.displayName}</p>
                  <Link to="/profile" className="px-4 py-2 transition duration-150 ease-in hover:bg-slate-100 w-full">Profile Info</Link>
                  <button
                    className="px-4 py-2 text-slate-800 transition duration-150 ease-in hover:bg-slate-100 w-full text-left"
                    onClick={logout}
                  >
                    Sign Out
                  </button>
                </ul>
              </div>}
            </div>
          )}

          {!user && (
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
