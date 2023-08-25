
const Footer = () => {
    const getYear = () => {
      return new Date().getFullYear();
  }
    return (
      <footer className="text-sm md:text-lg w-full py-5 flex justify-center items-center text-slate-800 bg-slate-300 font-black fixed bottom-0">
          <p >Bruno Fernandes &copy; {getYear()} All Rights Reserved</p>
      </footer>
    )
  }
  
  export default Footer