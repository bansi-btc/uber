import React from "react";
import { FaArrowRight } from "react-icons/fa";
import homeImage from "../home.avif";
import UberLogo from "../Logo.png";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="h-screen w-full">
      <div className="h-[80%] w-full relative">
        <img
          src={UberLogo}
          alt=""
          className="absolute z-10 w-20 left-20 top-5"
        />
        <img src={homeImage} alt="" className="h-full  w-full object-cover" />
      </div>
      <div className="flex flex-col py-5 px-6 gap-5">
        <h2 className="text-3xl font-semibold">Get Started with Uber</h2>
        <Link
          className="bg-black text-white w-full text-center py-4 px-8 rounded-lg flex flex-row justify-between
         items-center"
          to={"/login"}
        >
          <div>Continue</div>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default Home;
