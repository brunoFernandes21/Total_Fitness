import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    //className="sticky top-0 z-30" -add this to make nav fixed
    <header className="sticky top-0 z-30 shadow-xl">
      <nav className="nav flex justify-between items-center m-auto py-3 px-10 md:px-20 lg:px-48 md:py-5 lg:py-6">
        <Link to={"/"}>
          <h1 className="font-bold text-xl md:text-2xl lg:text-4xl text-slate-100 transition duration-150 ease-in hover:text-slate-300">TotalFitness</h1>
        </Link>
        <div className="hidden md:flex md:justify-center md:items-center gap-6 ">
            <Link to="/login" className="font-bold text-xl text-slate-100 transition duration-150 ease-in hover:text-slate-300">Login</Link>
            <Link to="/register" className="font-bold text-xl text-slate-100 transition duration-150 ease-in hover:text-slate-300">Register</Link>
            {/* <Link to="/signout" className="font-bold text-xl text-slate-100 transition duration-150 ease-in hover:text-slate-300">Sign Out</Link> */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;