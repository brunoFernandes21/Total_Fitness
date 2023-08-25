import React from "react";
import section1 from "../assets/images/workout-00.jpg";
import { Link } from "react-router-dom";
import section2 from "../assets/images//workout-01.jpg"
const LandingPage = () => {
  return (
    <main className="mt-0 md:mt-14 py-4 h-auto">
      <section className="flex flex-col md:justify-center md:items-center lg:mt-6 lg:flex lg:flex-row lg:justify-start lg:items-start">
        <div className="flex flex-col md:justify-center md:items-center lg:flex lg:justify-start lg:items-start lg:mt-16">
          <h1 className="text-3xl font-bold w-[28rem] md:w-[36rem] md:text-center md:text-6xl lg:text-left">
            Welcome to Total Fitness
          </h1>
          <div className="text-md mt-2 w-[26rem] md:w-[24rem] md:mt-6 md:text-center lg:text-left">
            <p>
            Workout till you feel that pain and soreness in muscles. This one is good pain. No pain, no gain.
            </p>
          </div>
            <button className=" bg-blue-600 text-white w-[27.8rem] md:w-[21.5rem] py-3.5 rounded mt-4 font-bold ">
              <Link to="/register">START FOR FREE</Link>
            </button>
        </div>
        <div className="mt-12 lg:mt-0">
          <img src={section1} alt="A rack full of dumbells" className="rounded-md shadow-md w-[27.8rem] md:w-[35rem] lg:w-full" />
        </div>
      </section>

      <hr className="my-10 md:mx-auto w-[27.8rem] md:w-[36rem] border-slate-200 lg:hidden text-2xl"/>

      <section className=" lg:mt-40 flex flex-col md:justify-center md:items-center lg:flex lg:flex-row lg:justify-start lg:items-start">
        <div className="flex flex-col md:justify-center md:items-center lg:flex lg:justify-start lg:items-start lg:mt-20">
          <h2 className="text-xl font-bold w-[28rem] md:w-[36rem] md:text-center md:text-4xl lg:text-left">
          The body achieves what the mind believes.
          </h2>
          <div className="text-md mt-2 w-[26rem] md:w-[24rem] md:mt-6 md:text-center lg:text-left">
            <p>
            If you want something you’ve never had, you must be willing to do something you’ve never done.
            </p>
          </div>

        </div>
        <div className="mt-12 lg:mt-0 lg:-order-1">
          <img src={section2} alt="A rack full of dumbells" className="rounded-md shadow-md w-[27.8rem] md:w-[36rem] lg:w-[85%] " />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
