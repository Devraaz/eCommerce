import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <>
      <aside className="relative top-0 h-screen w-52 bg-gray-800">
        <div className="flex h-16 items-center justify-center bg-gray-900 text-white">
          ShopKart
        </div>
        <nav className="mt-10">
          <Link
            to="/User/Dashboard"
            className="block px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Dashboard
          </Link>
          <Link
            to="/User/ManageProducts"
            className="block px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Products
          </Link>
          <Link
            to="/User/Profile"
            className="block px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Users
          </Link>
          <Link
            to="#"
            className="block px-4 py-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Settings
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidenav;
