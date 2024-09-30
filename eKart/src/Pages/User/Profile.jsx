import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Sections/Navbar";
import { Helmet } from "react-helmet";

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <div className="flex-1 space-y-4 p-10">
        <h1 className="mb-5 text-2xl font-bold">Dashboard Overview</h1>
        <div className="rounded-lg bg-white p-5 shadow-lg">
          <p className="text-gray-700">
            Welcome to your dashboard!<b> </b>
          </p>
        </div>
        <div className="flex flex-col rounded-lg bg-white p-5 shadow-lg">
          Profile Name
        </div>
      </div>

      <Link
        to="/User/Dashboard"
        className="block px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
      >
        Dashboard
      </Link>
    </>
  );
};

export default Profile;
