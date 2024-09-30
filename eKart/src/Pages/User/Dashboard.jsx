import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../Sections/Navbar";
import { Link } from "react-router-dom";
import axios from "../../config-axios"; // Import your configured Axios instance
import { useNavigate } from "react-router-dom"; // Ensure correct import
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider";
import { Helmet } from "react-helmet";
import Sidenav from "../../Components/Sidenav";
import Content from "../../Components/Content";
import Footer from "../../Sections/Footer";
import indianBoy from "../../assets/images/boy-indian-kid.svg";

const API_URL = import.meta.env.VITE_API_URL;
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { IsAuthenticated } = useContext(AuthContext);
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [cancelledOrders, setCancelledOrders] = useState(0);

  let firstName;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(
          `${API_URL}/api/orders/orders/user_orders/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        // Reverse the order of the fetched data
        const reversedOrders = res.data.reverse();
        // Total orders count
        setTotalOrders(reversedOrders.length);

        // Count delivered orders
        const deliveredCount = reversedOrders.filter(
          (order) => order.delivery_status === "Delivered",
        ).length;
        setDeliveredOrders(deliveredCount);

        // Count candelled orders
        const cancelledOrders = reversedOrders.filter(
          (order) => order.delivery_status === "Cancelled",
        ).length;
        setCancelledOrders(cancelledOrders);

        setOrder(reversedOrders);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          navigate("/Login");
          toast.error("You need to be logged in to access this page.");
          return;
        }

        const res = await axios.get("profile/");

        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("Fetching Failed");
      }
    };

    fetchItems();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    logout();
    toast.success("Logout Successful");
    navigate("/Login");
  };
  return (
    <>
      <Helmet>
        <title>Dashboard | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <section className="flex w-[99.9%] flex-col items-center justify-center bg-slate-200 p-10">
        <div className="w-[98%] rounded-md bg-slate-50 p-5 shadow-lg md:w-[80%]">
          <div className="text-center text-lg font-bold text-primary">
            PROFILE
          </div>
          <div className="flex flex-col gap-5 p-5 md:flex-row">
            <div className="element1 mx-auto mt-10 w-[90%] gap-3 space-y-5 rounded-md border py-5 md:mt-0 md:py-0">
              <img
                src={indianBoy}
                alt=""
                className="left-[20%] mx-auto w-40 md:w-60"
              />
              <p className="text-center text-xl font-medium">
                Welcome {data.name ? data.name.split(" ")[0] : "Guest"} Nana!{" "}
              </p>
              <p className="text-center text-sm">(Happy Shopping)</p>
            </div>
            <div className="element2 borde mx-auto w-[90%] rounded-md border p-1">
              <p className="heading text-md p-3 font-medium">
                Name:{" "}
                <p className="text-md mx-auto font-light text-slate-600">
                  {" "}
                  {data.name}{" "}
                  <Link
                    className="rounded-md border p-1 text-sm"
                    to="/User/ChangePassword"
                  >
                    Change Password
                  </Link>
                </p>
              </p>
              <p className="heading text-md p-3 font-medium">
                Email:
                <p className="text-md mx-auto font-light text-slate-600">
                  {data.email}
                </p>
              </p>
              <div className="grid grid-flow-row grid-cols-2 gap-5">
                <Link
                  to="/User/MyOrders"
                  className="items group relative h-20 rounded-md border transition-all duration-300 hover:bg-gray-100"
                >
                  <p className="text-md mx-auto transform p-5 font-light text-slate-600 transition-all duration-300 group-hover:translate-y-8">
                    Total Orders
                  </p>
                  <p className="absolute right-4 top-3 transform font-cursive text-6xl text-slate-300 transition-all duration-300 group-hover:-translate-y-2">
                    {totalOrders}
                  </p>
                </Link>
                <Link
                  to="/User/MyOrders"
                  className="items group relative h-20 rounded-md border transition-all duration-300 hover:bg-gray-100"
                >
                  <p className="text-md mx-auto transform p-5 font-light text-slate-600 transition-all duration-300 group-hover:translate-y-8">
                    Delivered Orders
                  </p>
                  <p className="absolute right-4 top-3 transform font-cursive text-6xl text-slate-300 transition-all duration-300 group-hover:-translate-y-2">
                    {deliveredOrders}
                  </p>
                </Link>
                <Link
                  to="/User/MyOrders"
                  className="items group relative h-20 rounded-md border transition-all duration-300 hover:bg-gray-100"
                >
                  <p className="text-md mx-auto transform p-5 font-light text-slate-600 transition-all duration-300 group-hover:translate-y-8">
                    Cancelled Orders
                  </p>
                  <p className="absolute right-4 top-3 transform font-cursive text-6xl text-slate-300 transition-all duration-300 group-hover:-translate-y-2">
                    {cancelledOrders}
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Dashboard;
