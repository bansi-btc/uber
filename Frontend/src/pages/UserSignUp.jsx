import React, { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import UberLogo from "../Logo.png";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../context/userContext";
import axios from "axios";

const UserSignUp = () => {
  const { setUserData, settoken } = useContext(UserContext);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();

  const [signUpFormData, setsignUpFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setsignUpFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!signUpFormData.email && !signUpFormData.password) {
      toast.error("All fields are required", {
        className: "w-[90%] mx-auto my-4",
      });
    }

    const userData = {
      fullname: {
        firstname: signUpFormData.firstname,
        lastname: signUpFormData.lastname,
      },
      email: signUpFormData.email,
      password: signUpFormData.password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/signUp`,
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (!data.success) {
        toast.error(data.message, {
          className: "w-[90%] mx-auto my-4",
        });
        return;
      }

      setUserData(data.newUser);
      localStorage.setItem("token", data.token);
      settoken(data.token);
      setsignUpFormData({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      });
      toast.success(data.message, {
        className: "w-[90%] mx-auto my-4",
      });

      navigate("/login");
    } catch (err) {
      toast.error(err.response.data.message, {
        className: "w-[90%] mx-auto my-4",
      });
    }
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
                value={signUpFormData.firstname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Lastname"
                className="bg-[#eeeeee] px-4 py-2 rounded-md w-[48%]"
                id="lastname"
                name="lastname"
                value={signUpFormData.lastname}
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
              value={signUpFormData.email}
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
                value={signUpFormData.password}
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
              Create Account
            </button>

            <div className="flex flex-row items-center justify-center gap-1">
              <div>Already a user?</div>
              <Link to={"/login"} className="text-blue-600">
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

export default UserSignUp;
