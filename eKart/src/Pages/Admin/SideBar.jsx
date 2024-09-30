import react, { useContext, useState } from "react";
import Navbar from "../../Sections/Navbar";
import Footer from "../../Sections/Footer";
import axios from "../../config-axios"; // Import your configured Axios instance
import { Link, useNavigate } from "react-router-dom"; // Ensure correct import
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";
import logo from "../../assets/images/logo.png";
import { BsArrowLeft, BsPersonFillCheck, BsPower } from "react-icons/bs";
import { BiLogoProductHunt, BiSolidDashboard } from "react-icons/bi";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const [isSalesDropdownOpen, setIsSalesDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    toast.success("Logout Successful");
    navigate("/AdminLogin");
  };
  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-controls="default-sidebar"
        type="button"
        className="fixed z-20 ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="h-6 w-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed left-0 top-0 z-40 h-screen w-64 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidenav"
      >
        <div className="h-full overflow-y-auto border-r border-gray-200 bg-white px-3 py-5 dark:border-gray-700 dark:bg-gray-800">
          <Link to="/">
            <img
              className="mx-auto w-24 rounded-md sm:w-32"
              src={logo}
              alt="logo"
            />
          </Link>
          <button
            className="absolute right-7 top-4 rounded-md p-2 text-lg text-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <BsArrowLeft />
          </button>
          <div className="mt-5 w-full px-5 text-center text-lg font-bold text-white">
            {user ? `Hello ${user.name}` : ""}
          </div>
          <ul className="mt-10 space-y-2">
            <li>
              <Link
                to="/Admin/analytics"
                className="group flex items-center gap-5 rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="flex items-start gap-5">
                  <BiSolidDashboard className="text-xl text-gray-400" />{" "}
                  Dashboard
                </span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="group flex w-full items-center justify-between gap-5 rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-pages"
                onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
              >
                <span className="flex items-start gap-5">
                  <BiLogoProductHunt className="text-xl text-gray-400" />{" "}
                  <h6>Products</h6>
                </span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-pages"
                className={`space-y-2 py-2 ${
                  isPagesDropdownOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to="/Admin/addproducts"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Add Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Admin/manageproducts"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Products
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="group flex w-full items-center justify-between rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-sales"
                onClick={() => setIsSalesDropdownOpen(!isSalesDropdownOpen)}
              >
                <span className="flex items-start gap-5">
                  <BiSolidDashboard className="text-xl text-gray-400" /> Sales
                </span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-sales"
                className={`space-y-2 py-2 ${
                  isSalesDropdownOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to="/Admin/vieworders"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Manage Orders
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-auth"
                onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6 flex-shrink-0 text-gray-400 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-3 flex-1 whitespace-nowrap text-left">
                  Manage Users
                </span>
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <ul
                id="dropdown-auth"
                className={`space-y-2 py-2 ${
                  isAuthDropdownOpen ? "block" : "hidden"
                }`}
              >
                <li>
                  <Link
                    to="/Admin/userdata/"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Customers
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="group flex w-full items-center rounded-lg p-2 pl-11 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Admin User
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 z-20 hidden w-full justify-center space-x-4 border-r border-gray-200 bg-white p-4 lg:flex dark:border-gray-700 dark:bg-gray-800">
          <button
            onClick={handleLogout}
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Settings"
          >
            <BsPower />
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Language"
          >
            <BsPersonFillCheck />
          </button>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
