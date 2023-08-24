import React from "react";
import section1 from "../assets/images/landing-page-01.webp";
import section2 from "../assets/images/landing-page-section-2.webp";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main className="mt-0 md:mt-14 py-4 px-6">
      <section className="md:flex md:flex-col md:justify-center md:items-center lg:mt-6 lg:flex lg:flex-row lg:justify-start lg:items-start">
        <div className=" md:flex md:flex-col md:justify-center md:items-center lg:flex lg:justify-start lg:items-start">
          <h1 className="text-3xl font-bold w-[22rem] md:w-[32rem] md:text-center md:text-6xl lg:text-left">
            Good health starts with what you eat.
          </h1>
          <div className=" text-md mt-2 w-[20rem] md:w-[24rem] md:mt-6">
            <p>
              Want to eat more mindfully? Track meals, learn about your habits,
              and reach your goals with MyFitnessPal.
            </p>
          </div>
            <button className=" bg-blue-600 text-white w-[24.8rem] md:w-[21.5rem] py-3.5 rounded mt-4 font-bold ">
              <Link to="/register">START FOR FREE</Link>
            </button>
        </div>
        <div className="mt-12 lg:mt-0">
          <img src={section1} alt="A bowl of cereal" />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-black">Log from over 14 million foods.</h2>
        <p className="mt-1">
          See a breakdown of calories and nutrients, compare serving sizes, and
          discover how the food you eat supports your goals.
        </p>
        <div>
          <img src={section2} alt="A bowl of cereal" />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
