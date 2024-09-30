import React, { useState, useEffect, useContext } from "react";
import {
  BsBellFill,
  BsPersonCircle,
  BsHeart,
  BsList,
  BsX,
  BsPerson,
  BsBagCheck,
  BsPower,
  BsSearch,
  BsFillCaretDownFill,
  BsBagHeartFill,
} from "react-icons/bs";
import Button3 from "../Components/Button3";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useNavigate } from "react-router-dom"; // Ensure correct import
import { toast } from "react-toastify";
import { AiOutlineShoppingCart } from "react-icons/ai";
import logo from "../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { selectedCartCount } from "../redux/Cart/CartSlice";
import { selectedWishListCount } from "../redux/Wishlist/WishlistSlice";

import { useForm } from "react-hook-form";

const links = [
  { text: "Shirts" },
  { text: "Casual" },
  { text: "Oversized Shirts" },
  { text: "Hoodies" },
  { text: "Lowers" },
  { text: "Discount" },
  { text: "Jeans" },
];

const profile_link = [
  { id: 1, href: "/User/Dashboard", text: "My Account", icon: <BsPerson /> },
  { id: 2, href: "/User/MyOrders", text: "My Orders", icon: <BsBagCheck /> },
  { id: 3, href: "/Wishlist", text: "My Wishlist", icon: <BsHeart /> },
];

const Navbar = () => {
  const [data, setData] = useState([]);
  const cartCount = useSelector(selectedCartCount);
  const wishlistCount = useSelector(selectedWishListCount);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const { logout, isAuthenticated, user } = useContext(AuthContext);

  const openMenu = () => {
    setMenu(!menu);
  };
  const handleLogout = () => {
    logout();
    toast.success("Logout Successful");
    navigate("/Login");
  };

  return (
    <>
      <nav className="flex h-16 w-[99%] items-center justify-between p-1 px-8">
        <div className="logo">
          <Link to="/">
            <img className="w-24 rounded-full sm:w-32" src={logo} alt="logo" />
          </Link>
        </div>

        <div className="search relative hidden h-10 w-[500px] overflow-hidden rounded-md border sm:block">
          <SearchBar />
        </div>

        <div className="flex-end flex items-center">
          <Popover>
            <PopoverButton className="greetings flex h-11 w-fit items-center gap-3 p-1 sm:w-[170px]">
              <BsPersonCircle className="text-3xl text-primary" />

              <div className="text">
                {isAuthenticated ? (
                  <>
                    <BsFillCaretDownFill className="sm:hidden" />
                    <div className="hidden text-sm font-medium text-secondary sm:block">
                      Hello {user ? user.name : "Loading..."}
                    </div>
                  </>
                ) : (
                  <>
                    <BsFillCaretDownFill className="sm:hidden" />
                    <div className="hidden text-left text-sm font-medium text-secondary sm:block">
                      Hello there
                    </div>
                    <div className="hidden text-sm font-medium text-secondary sm:block">
                      Click here to login
                    </div>
                  </>
                )}
              </div>
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="z-50 flex w-fit flex-col space-y-2 rounded-md border p-1"
            >
              {isAuthenticated ? (
                <div className="h-fit w-60 space-y-2 rounded-lg bg-white p-2">
                  <h2 className="text-base font-medium">
                    Welcome {user ? user.name : "loading..."}
                  </h2>
                  <hr />

                  <ul>
                    {profile_link.map((link, index) => (
                      <li key={link.id}>
                        <Link
                          to={link.href}
                          className="flex flex-row items-center gap-2"
                        >
                          {link.icon} <h5>{link.text}</h5>
                        </Link>{" "}
                      </li>
                    ))}

                    <li>
                      <Link
                        to="/"
                        className="flex flex-row items-center gap-2"
                        onClick={handleLogout}
                      >
                        <BsPower /> <h5> Logout</h5>
                      </Link>{" "}
                    </li>
                  </ul>
                </div>
              ) : (
                <div className="h-44 w-60 space-y-2 rounded-lg bg-white p-2">
                  <h2 className="text-base font-medium">Welcome Nana</h2>
                  <hr />
                  <div className="flex justify-between">
                    <Link to="/Login">
                      <Button3 text="Login" />
                    </Link>
                    <Link to="/Signup">
                      <Button3 text="Sign Up" />
                    </Link>
                  </div>
                  <ul>
                    {profile_link.map((link, index) => (
                      <li key={link.id}>
                        <Link
                          to={link.href}
                          className="flex flex-row items-center gap-2"
                        >
                          {link.icon} <h5>{link.text}</h5>
                        </Link>{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </PopoverPanel>
          </Popover>

          <div className="bag mx-4 flex gap-2">
            <Link to="/Wishlist" className="hidden md:flex">
              <BsHeart className="w-5 text-xl" />{" "}
              <div className="">
                <sup className="rounded-lg bg-red-500 px-1 text-white">
                  {wishlistCount}
                </sup>{" "}
              </div>
            </Link>
            <Link to="/BuyProcess/itemList" className="flex">
              <AiOutlineShoppingCart className="w-5 text-xl" />{" "}
              <div className="">
                <sup className="rounded-lg bg-red-500 px-1 text-white">
                  {cartCount}
                </sup>{" "}
              </div>
            </Link>
          </div>

          <button className="block md:hidden">
            <BsList className="text-slate-800" onClick={openMenu} />
          </button>
        </div>
      </nav>

      <nav className="hidden h-12 flex-row items-center gap-5 space-x-5 bg-primary md:flex md:justify-center">
        {links.map((link, index) => (
          <Link
            key={index}
            to={`/filter?search=${encodeURIComponent(link.text)}`}
            className="text-md hover:text-slate=200 font-light text-white"
          >
            {link.text}
          </Link>
        ))}
      </nav>

      <nav className="flex h-16 w-[99%] items-center justify-between p-1 px-8 sm:hidden">
        <div className="relative h-10 w-[500px] overflow-hidden rounded-md border md:block">
          <SearchBar />
        </div>
      </nav>

      <div
        className="fixed right-0 z-20 h-screen w-[100%] space-y-8 bg-slate-300 p-5 pt-14 transition-all duration-1000 sm:w-96 md:hidden"
        style={{ top: menu ? "0px" : "-1000px" }}
      >
        <BsX
          className="absolute right-8 top-6 cursor-pointer text-slate-800"
          onClick={openMenu}
        />
        <div className="flex flex-col gap-5">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-md w-fit font-medium text-slate-600 hover:text-slate-950"
            >
              {link.text}
            </Link>
          ))}
        </div>

        <div className="hover: absolute bottom-2 text-center text-slate-600">
          <Link to="/">Terms & Condition</Link>&nbsp;|&nbsp;
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </>
  );
  t;
};

export default Navbar;

const SearchBar = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log("Search Query:", data.searchQuery);
    // Handle the search logic here
    navigate(`/filter?search=${data.searchQuery}`);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="search-bar">
        <input
          type="text"
          placeholder="Search In Store..."
          {...register("searchQuery", { required: true })}
          className="search-input h-full w-full p-2 text-base font-medium text-secondary hover:ring-secondary focus:outline-none"
        />
        <button
          type="submit"
          className="search-button absolute right-0 mx-auto h-10 w-16 bg-[#D9D9D9] text-2xl text-white"
        >
          <BsSearch className="mx-auto text-center text-secondary" />
        </button>
      </form>
    </>
  );
};
