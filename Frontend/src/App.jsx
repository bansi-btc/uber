import React, { useContext } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router";
import UserLogin from "./pages/UserLogin";
import UserSignUp from "./pages/UserSignUp";
import CaptainLogin from "./pages/CaptainLogin";
import CaptainSignUp from "./pages/CaptainSignUp";

const App = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainSignUp />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </div>
  );
};

export default App;
