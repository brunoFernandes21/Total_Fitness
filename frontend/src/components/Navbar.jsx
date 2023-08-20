import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
  };
  return (
    //className="sticky top-0 z-30" -add this to make nav fixed
    <header className="sticky top-0 z-30 bg-white">
      <nav className="nav max-w-[1200px] flex justify-between items-center m-auto py-3 px-10 md:py-5">
        <Link to={"/"}>
          <h1 className="text-xl md:text-2xl text-blue-700 transition duration-150 ease-in hover:text-blue-500 font-black">
            TotalFitness
          </h1>
        </Link>

        <div className=" flex justify-center items-center gap-6 ">
          {user && (
            <div className="flex justify-center items-center gap-6">
              <p>Hello {user}</p>
              <Link
                to="/landing-page"
                className="text-sm text-slate-800 transition duration-150 ease-in hover:underline font-bold"
                onClick={logout}
              >
                LOG OUT
              </Link>
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

          <div className="md:hidden hover:bg-slate-800 hover:text-white p-2 rounded cursor-pointer transition duration-150 ease-in ">
            <FaBars className="" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
