import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import UberLogo from "../Logo.png";
import { Link } from "react-router";

const CaptainSignUp = () => {
  const [showPassword, setshowPassword] = useState(false);

  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setloginFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // if (!loginFormData.email && !loginFormData.password) {
    //   alert("All fields are required");
    // }

    // try {
    //   const response = await axios.post(
    //     "http://localhost:4000/api/user/login",
    //     JSON.stringify(loginFormData),
    //     {
    //       headers: {
    //         "Content-Type": "application/json", // Sending JSON data
    //       },
    //     }
    //   );

    // } catch (err) {
    // }
  };
  return (
    <div className="py-4 px-6 w-full h-screen">
      <img src={UberLogo} alt="" className="w-20" />
      <div className="h-[90%] w-full flex flex-col justify-between">
        <form
          onSubmit={handleLogin}
          className="w-full flex flex-col gap-8 pt-7"
        >
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-xl">What's your name?</label>

            <div className="flex justify-between w-full">
              <input
                required
                type="text"
                placeholder="Firstname"
                className="bg-[#eeeeee] px-4 py-2 rounded-md w-[48%]"
                id="firstname"
                name="firstname"
                value={loginFormData.firstname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Lastname"
                className="bg-[#eeeeee] px-4 py-2 rounded-md w-[48%]"
                id="lastname"
                name="lastname"
                value={loginFormData.lastname}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="email" className="text-xl">
              What's your email?
            </label>
            <input
              required
              type="email"
              placeholder="email@example.com"
              className="bg-[#eeeeee] px-4 py-2 rounded-md w-full"
              id="email"
              name="email"
              value={loginFormData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col items-start gap-1 ">
            <label htmlFor="password" className="text-xl">
              Enter password
            </label>

            <div className="relative w-full">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="password"
                className="bg-[#eeeeee] px-4 py-2 rounded-md w-full"
                name="password"
                value={loginFormData.password}
                onChange={handleInputChange}
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 translate-y-[-50%]"
                />
              ) : (
                <FaEye
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 translate-y-[-50%]"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col w-full items-center gap-3">
            <button
              type="submit"
              className="bg-black text-white w-full text-center py-4 px-8 rounded-lg"
            >
              SignUp
            </button>

            <div className="flex flex-row items-center justify-center gap-1">
              <div>Already a captain?</div>
              <Link to={"/captain-login"} className="text-blue-600">
                Login
              </Link>
            </div>
          </div>
        </form>
        <p className="text-sm tracking-wider leading-5">
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from Uber and its affiliates to the
          number provided
        </p>
      </div>
    </div>
  );
};

export default CaptainSignUp;
