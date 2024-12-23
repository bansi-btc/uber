import React, { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import UberLogo from "../Logo.png";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../context/userContext";

const UserLogin = () => {
  const [showPassword, setshowPassword] = useState(false);
  const { setUserData, settoken } = useContext(UserContext);
  const navigate = useNavigate();

  const [loginFormData, setloginFormData] = useState({
    email: "",
    password: "",
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
    if (!loginFormData.email && !loginFormData.password) {
      alert("All fields are required");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        JSON.stringify(loginFormData),
        {
          headers: {
            "Content-Type": "application/json", // Sending JSON data
          },
        }
      );

      const data = response.data;

      console.log(data);

      if (!data.success) {
        toast.error(data.message, {
          className: "w-[90%] mx-auto my-4",
        });
        return;
      }
      setUserData(data.existingUser);
      localStorage.setItem("token", data.token);
      settoken(data.token);
      setloginFormData({
        email: "",
        password: "",
      });
      toast.success(data.message, {
        className: "w-[90%] mx-auto my-4",
      });
      navigate("/dashboard");
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
              Login
            </button>

            <div className="flex flex-row items-center justify-center gap-1">
              <div>New here? </div>
              <Link to={"/signup"} className="text-blue-600">
                Create new account
              </Link>
            </div>
          </div>
        </form>
        <Link
          to={"/captain-login"}
          className="bg-[#10b461] text-white text-center py-4 px-8 rounded-lg"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
