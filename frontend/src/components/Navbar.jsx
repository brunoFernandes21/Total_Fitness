import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
const Navbar = () => {
  return (
    //className="sticky top-0 z-30" -add this to make nav fixed
    <header className="sticky top-0 z-30 bg-white">
      <nav className="nav flex justify-between items-center m-auto py-3 px-10 md:px-20 lg:px-48 md:py-5 lg:py-6 ">
        <Link to={"/"}>
          <h1 className="text-xl md:text-2xl lg:text-3xl text-blue-700 transition duration-150 ease-in hover:text-blue-500 font-black">
            TotalFitness
          </h1>
        </Link>
        <div className=" flex justify-center items-center gap-6 ">
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
          {/* <Link to="/signout" className="font-bold text-xl text-slate-100 transition duration-150 ease-in hover:text-slate-300">Sign Out</Link> */}
          <div className="md:hidden hover:bg-slate-800 hover:text-white p-2 rounded cursor-pointer transition duration-150 ease-in ">
            <FaBars className="" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
