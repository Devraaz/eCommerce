import React, { useState } from "react";
import Button3 from "../../Components/Button3";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/Cart/CartSlice";

const API_URL = import.meta.env.VITE_API_URL;

const Payment = () => {
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Calculate totals
  let totalAmount = 0;
  let totalDiscount = 0;
  let shippingCharge = 30; // Static value, adjust as needed
  let netAmount = 0;
  let itemTotal = 0;

  cartItems.forEach((item) => {
    const { product, selectedQuantity } = item;
    const price = Number(product.price);
    const discount = Number(product.discount);
    itemTotal = price * selectedQuantity;

    totalAmount += itemTotal;

    const itemDiscount = discount > 0 ? (price * discount) / 100 : discount;
    totalDiscount += itemDiscount * selectedQuantity;

    netAmount += itemTotal - itemDiscount + shippingCharge;
  });
  console.log(cartItems);

  const orderData = {
    order_no: `ORD${Date.now()}`, // Unique order number
    total_amount: totalAmount.toFixed(2),
    discount: totalDiscount.toFixed(2),
    tax: 10, // Assuming a static tax value
    gross_amount: (totalAmount - totalDiscount + shippingCharge).toFixed(2),
    shipping_charge: shippingCharge,
    net_amount: netAmount.toFixed(2),
    delivery_status: "Placed",
    payment_status: "Not Paid",
    payment_options: "COD", // Change as needed
    items: cartItems.map((item) => ({
      name: item.product.product_name,
      product_id: item.product.id,
      quantity: item.selectedQuantity,
      product_price: item.product.net_price,
      size: item.selectedSize, // Adjust according to your item structure
    })),
  };
  console.log(itemTotal);
  console.log(orderData);
  const handleConfirmOrder = async () => {
    setLoading(true); // Start loading
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${API_URL}/api/orders/orders/`, // Adjust to your API endpoint
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      toast.success("Order Confirmed Successfully!");

      // Dispatch clearCart to empty the cart
      dispatch(clearCart());

      console.log(response.data);
      navigate("/User/Dashboard");
    } catch (error) {
      // Check if the error response exists and has data
      if (error.response && error.response.data) {
        const backendErrorMessage =
          error.response.data.detail ||
          error.response.data.message ||
          "Something went wrong!";
        console.error("Backend error:", backendErrorMessage);
        toast.error(`Error: ${backendErrorMessage}`);
      } else {
        console.error("Error confirming order:", error);
        toast.error("Failed to confirm order. Please try again.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <>
      <div className="mx-auto flex h-fit w-full max-w-[600px] flex-col gap-10 border py-5 md:mx-0">
        <div className="text-center text-lg font-bold text-primary">
          Payment
        </div>
        <div className="animate-pulse text-center align-middle text-xl">
          ( For now we are offering <b>COD</b> only! )
        </div>
        <button
          className="text-md mx-auto rounded-md bg-blue-400 px-3 py-2 font-semibold text-white hover:bg-blue-600"
          onClick={handleConfirmOrder}
          disabled={loading}
        >
          {loading ? (
            <span className="loader">Placing your Order...</span> // Replace with your loader
          ) : (
            "Confirm your Order"
          )}
        </button>
      </div>
    </>
  );
};

export default Payment;
