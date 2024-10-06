import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import HomePage from "./Pages/HomePage.jsx";
import About from "./Pages/About.jsx";
import Men from "./Pages/Men.jsx";
import Women from "./Pages/Women.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import Signup from "./Pages/Signup.jsx";
import Login from "./Pages/Login.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";
import Dashboard from "./Pages/User/Dashboard.jsx";
import AdDashboard from "./Pages/Admin/AdDashboard.jsx";
import Profile from "./Pages/User/Profile.jsx";
import Terms from "./Pages/Terms.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import PrivateRoute from "./Components/PrivateRoute.jsx";
import AuthProvider from "./AuthProvider.jsx";
import ChangePassword from "./Pages/User/ChangePassword.jsx";
import ResetPassword from "./Pages/User/ResetPassword.jsx";
import ResetMail from "./Pages/User/ResetMail.jsx";
import MyOrders from "./Pages/User/MyOrders.jsx";
import Address from "./Pages/User/Address.jsx";
import Payment from "./Pages/User/Payment.jsx";

import store from "./redux/store.js";
import { Provider } from "react-redux";
import ProductPage from "./Pages/ProductPage.jsx";
import Cart from "./Pages/Cart.jsx";
import NotFound from "./Components/NotFound.jsx";
import Analytics from "./Pages/Admin/Analytics.jsx";
import AddProduct from "./Pages/Admin/AddProduct.jsx";
import ManageProducts from "./Pages/Admin/ManageProducts.jsx";
import ViewOrders from "./Pages/Admin/ViewOrders.jsx";
import UserData from "./Pages/Admin/UserData.jsx";
import ItemList from "./Components/ItemList.jsx";
import Filters from "./Pages/Filters.jsx";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/About", element: <About /> },
  { path: "/Men", element: <Men /> },
  { path: "/Women", element: <Women /> },
  { path: "/ProductPage/:pid", element: <ProductPage /> },
  { path: "/Signup", element: <Signup /> },
  { path: "/Login", element: <Login /> },
  { path: "/AdminLogin", element: <AdminLogin /> },
  { path: "/Wishlist", element: <Wishlist /> },
  { path: "/filter", element: <Filters /> },
  { path: "/Terms", element: <Terms /> },

  { path: "/User/ResetPassword/:uid/:token", element: <ResetPassword /> },
  { path: "/User/ResetMail", element: <ResetMail /> },
  {
    path: "/User/Dashboard",
    element: <PrivateRoute element={<Dashboard />} />,
  },
  { path: "/User/Profile", element: <PrivateRoute element={<Profile />} /> },
  {
    path: "/User/ChangePassword",
    element: <PrivateRoute element={<ChangePassword />} />,
  },

  {
    path: "/User/MyOrders",
    element: <PrivateRoute element={<MyOrders />} />,
  },
  {
    path: "/Admin",
    element: <PrivateRoute element={<AdDashboard />} />, // Use PrivateRoute to secure AdDashboard
    children: [
      { index: true, element: <Navigate to="analytics" /> },
      { path: "analytics", element: <Analytics /> },
      { path: "addproducts", element: <AddProduct /> },
      { path: "manageproducts", element: <ManageProducts /> },
      { path: "vieworders", element: <ViewOrders /> },
      { path: "userdata", element: <UserData /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/BuyProcess",
    element: <PrivateRoute element={<Cart />} />,
    children: [
      { index: true, element: <Navigate to="itemList" /> },
      { path: "itemList", element: <ItemList /> },
      { path: "address", element: <Address /> },
      { path: "payment", element: <Payment /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
);
