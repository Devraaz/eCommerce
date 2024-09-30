import react, { useContext, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet,
  Navigate,
} from "react-router-dom";

import axios from "../../config-axios"; // Import your configured Axios instance
import { useNavigate } from "react-router-dom"; // Ensure correct import
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";
import { Helmet } from "react-helmet";
import logo from "../../assets/images/logo.png";
import { BsArrowLeft, BsPersonFillCheck, BsPower } from "react-icons/bs";
import { BiLogoProductHunt, BiSolidDashboard } from "react-icons/bi";
import SideBar from "./SideBar";
import Analytics from "./Analytics";
import AddProduct from "./AddProduct";
import NotFound from "../../Components/NotFound";

const AdDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  console.log(user);
  // Check if the user is authenticated and has is_staff set to true
  if (!user || !user.is_admin) {
    // Redirect to the "Forbidden" or home page if the user is not an admin
    toast.error("Your don't have permission to access");
    navigate("/User/Dashboard");
  }
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | India's Smartest Shopping Point</title>
      </Helmet>

      <div className="fixed flex h-screen w-full flex-row overflow-auto bg-slate-900">
        <SideBar />
        <div className="absolute left-[1%] my-20 w-[98%] rounded-md sm:left-72 sm:w-fit">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdDashboard;
