import React, { useState } from "react";
import Navbar from "../Sections/Navbar";
import Footer from "../Sections/Footer";
import Breadcrumb from "../Components/Breadcrumb";
import ItemList from "../Components/ItemList";
import { addToCart, removeFromCart } from "../redux/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import Stepper from "../Components/Stepper";
import ProductPricing from "../Components/ProductPricing";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import ButtonArrowProcess from "../Components/ButtonArrowProcess";
import { Helmet } from "react-helmet";

const steps = ["Cart", "Address", "Payment"];
const Cart = () => {
  const navigate = useNavigate();

  const clist = useSelector((state) => state.cart);

  let total_amount = 0;
  let totalDiscount = 0;
  let gross_amount = 0;
  let tax = 0;
  let shipping_charge = 30;
  let net_amount = 0;

  for (let i = 0; i < clist.length; i++) {
    const item = clist[i].product;

    const quantity = clist[i].selectedQuantity;
    const price = Number(item.price);
    const discount = Number(item.discount);

    let itemDiscount;
    // Calculating Total Price
    let itemTotal = price * quantity;
    total_amount += itemTotal;

    // Calculating Discount
    if (discount > 0 && discount < 100) {
      itemDiscount = (price * discount) / 100;
    } else {
      itemDiscount = discount;
    }
    const totalItemDiscount = itemDiscount * quantity;
    totalDiscount += totalItemDiscount;

    // Calculating Net Price
    let net_total = Number(item.net_price) * quantity;
    net_amount += net_total;
  }
  const isDisabled = true;
  let path = useLocation();
  let currentPath = path.pathname;

  const handleNextContent = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (currentPath === "/BuyProcess/itemList") {
      navigate("/BuyProcess/address");
    } else if (currentPath === "/BuyProcess/address") {
      navigate("/BuyProcess/payment");
    }
  };
  const handlePreviousContent = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (currentPath === "/BuyProcess/payment") {
      navigate("/BuyProcess/address");
    } else if (currentPath === "/BuyProcess/address") {
      navigate("/BuyProcess/itemList");
    }
  };
  return (
    <>
      <Helmet>
        <title>Cart | Fashion Nana | Koraput Smartest Shopping Point</title>
      </Helmet>
      <Navbar />

      <Stepper path={currentPath} />
      {clist && clist.length > 0 ? (
        <>
          <div className="flex flex-col justify-center md:flex-row">
            <Outlet />
            <div className="mx-auto flex flex-col md:mx-0">
              <ProductPricing
                total_amount={total_amount}
                net_amount={net_amount}
                total_discount={totalDiscount}
                shipping_charge={shipping_charge}
              />
              <div className="button flex flex-row gap-5">
                <button
                  className={`mx-5 my-2 w-full rounded-md px-4 py-2 font-medium text-white transition-all md:float-right ${
                    currentPath == "/BuyProcess/itemList"
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  onClick={handlePreviousContent}
                >
                  Previous
                </button>
                <button
                  className={`mx-5 my-2 w-full rounded-md px-4 py-2 font-medium text-white transition-all md:float-right ${
                    currentPath == "/BuyProcess/payment"
                      ? "cursor-not-allowed bg-gray-400"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                  onClick={handleNextContent}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1 className="text-center text-lg font-medium text-primary">
          Cart is Empty
        </h1>
      )}
      <Footer />
    </>
  );
};

export default Cart;
