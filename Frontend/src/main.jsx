import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import UserContextProvider from "./context/userContext";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </UserContextProvider>
);
