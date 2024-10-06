import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LittleCard from "../../Components/LittleCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

const Analytics = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [cancelledOrder, setCancelledOrder] = useState(0);
  const [todaysOrder, setTodaysOrder] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [todaysNewUser, setTodaysNewUser] = useState(0);
  const [ordersPerDay, setOrdersPerDay] = useState([]);
  const [userPerDay, setUserPerDay] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get(`${API_URL}/api/orders/orders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const orders = res.data;
        console.log(orders);
        // Group orders by date
        const groupedOrders = orders.reduce((acc, order) => {
          const orderDate = order.order_date.split("T")[0]; // Extract date part 'YYYY-MM-DD'
          acc[orderDate] = (acc[orderDate] || 0) + 1; // Count orders per day
          return acc;
        }, {});

        // Transform grouped orders into an array of objects for Recharts
        const ordersArray = Object.keys(groupedOrders).map((date) => ({
          date,
          count: groupedOrders[date],
        }));

        setOrdersPerDay(ordersArray);

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
        setCancelledOrder(cancelledOrders);

        // Select all order who ordered today
        const today = new Date().toISOString().split("T")[0];
        const todaysOrder = reversedOrders.filter(
          (order) =>
            order.order_date && order.order_date.split("T")[0] == today,
        );
        setTodaysOrder(todaysOrder.length); // Store or use today's orders
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const resUsr = await axios.get(`${API_URL}/api/users/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const users = resUsr.data;
        // Group users by date
        const groupedUsers = users.reduce((acc, user) => {
          const userDate = user.created_at.split("T")[0]; // Extract date part 'YYYY-MM-DD'
          acc[userDate] = (acc[userDate] || 0) + 1; // Count orders per day
          return acc;
        }, {});

        // Transform grouped orders into an array of objects for Recharts
        const userArray = Object.keys(groupedUsers).map((date) => ({
          date,
          count: groupedUsers[date],
        }));

        setUserPerDay(userArray);

        const ourUsers = resUsr.data;
        console.log(ourUsers.length);

        // Setting up total User as
        setTotalUsers(ourUsers.length);
        const today = new Date().toISOString().split("T")[0];
        const totalUsers = ourUsers.filter(
          (user) => user.created_at && user.created_at.split("T")[0] == today,
        );
        setTodaysNewUser(totalUsers.length); // Store or use today's User
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
    fetchUsers();
  }, []);

  return (
    <>
      <div className="grid grid-flow-row gap-3 md:grid-cols-6">
        <div className="col-span-6 grid grid-flow-row grid-cols-2 gap-5 md:col-span-4 md:grid-cols-3 lg:grid-cols-4">
          <LittleCard
            url="/Admin/vieworders"
            title="Total Orders"
            value={totalOrders}
          />
          <LittleCard
            url="/Admin/vieworders"
            title="Delivered Orders"
            value={deliveredOrders}
          />
          <LittleCard
            url="/Admin/vieworders"
            title="Cancelled Orders"
            value={cancelledOrder}
          />
          <LittleCard
            url="/Admin/vieworders"
            title="Todays Orders"
            value={todaysOrder}
          />
          <LittleCard
            url="/Admin/userdata/"
            title="Total User"
            value={totalUsers}
          />
          <LittleCard
            url="/Admin/userdata/"
            title="New Users"
            value={todaysNewUser}
          />
        </div>
        <div className="col-span-6 grid rounded-md bg-slate-800 md:col-span-2">
          <div></div>
        </div>
      </div>
      <br />
      <div className="grid h-10 grid-flow-row grid-cols-1 gap-3 md:grid-cols-4">
        <div className="col-span-1 m-1 rounded-md bg-slate-800 p-5 md:col-span-2">
          <h2 className="text-lg font-semibold text-slate-200">
            Orders Placed Per Day
          </h2>
          <br />
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ordersPerDay}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="col-span-1 m-1 rounded-md bg-slate-800 p-5 md:col-span-2">
          <h2 className="text-lg font-semibold text-slate-200">
            User Registered per Day
          </h2>
          <br />
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userPerDay}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="m-1 rounded-md bg-slate-800">Hii</div>
      </div>
    </>
  );
};

export default Analytics;
