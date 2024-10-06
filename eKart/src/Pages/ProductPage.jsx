import React, { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Navbar from "../Sections/Navbar";
import Breadcrumb from "../Components/Breadcrumb";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";
import Button from "../Components/Button";
import Button2 from "../Components/Button2";
import ButtonRound from "../Components/ButtonRound";

import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/Cart/CartSlice";
import {
  addToWishList,
  removeFromWishList,
} from "../redux/Wishlist/WishlistSlice";

const ImageDisplayGallery = React.lazy(
  () => import("../Components/ImageDisplayGallery"),
);

const API_URL = import.meta.env.VITE_API_URL;
const ProductPage = () => {
  const [data, setData] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  let { pid } = useParams();
  pid = Number(pid);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const isInCart =
    Array.isArray(cart) &&
    cart.some(
      (item) =>
        item.product.id === Number(pid) && item.selectedSize === selectedSize,
    );

  const isInWishlist =
    Array.isArray(wishlist) && wishlist.some((item) => item.id === Number(pid));

  let sizes = [];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const storedData = localStorage.getItem("productData");
        // if (storedData) {
        //   const d = JSON.parse(storedData);
        //   const res = d.find((item) => item.id === pid);

        //   setData(res);
        // }
        const res = await axios.get(`${API_URL}/api/products/all/${pid}/`);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pid]);
  const content = `${data.product_description}`;

  const handleCart = () => {
    if (!selectedSize) {
      toast.warn("Please select a proper size before adding to the Cart! ");
      return;
    }
    if (data.stock === 0) {
      toast.error("Selected item is Out of Stock ");
      return;
    }

    if (isInCart) {
      dispatch(removeFromCart(pid));
    } else {
      const cartItem = { product: data, selectedQuantity, selectedSize };
      dispatch(addToCart(cartItem));
    }
  };
  const handleWishList = () => {
    if (isInWishlist) {
      dispatch(removeFromWishList(pid));
    } else {
      dispatch(addToWishList(data));
    }
  };
  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };
  const handleQuantityClick = (e) => {
    setSelectedQuantity(e.target.value);
  };
  return (
    <>
      <Helmet>
        <title> Product Page | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <Breadcrumb category="Shirts" item="Denim Men Shirt" />

      <div className="mx-auto mt-3 flex w-[96%] flex-col justify-between gap-5 pt-10 md:flex-row">
        <Suspense
          fallback={
            <Box sx={{ width: 300, height: 450 }}>
              <Skeleton width={300} height={400} />
            </Box>
          }
        >
          {data.images && data.images.length > 0 && (
            <ImageDisplayGallery images={data.images} />
          )}
        </Suspense>

        <div className="description mx-auto w-[96%] p-2">
          <div className="mb-5 text-2xl font-medium">
            {data.product_name} | Fashion Nana
          </div>

          <hr className="my-2 w-4/5 border border-primary" />
          <div className="relative">
            <div
              className={` ${isExpanded ? "h-full" : "h-40"} w-[95%] overflow-hidden p-2 text-base font-thin transition-all`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-secondary hover:text-primary"
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          </div>
          {/* <div className="desc">{data.product_description}</div> */}
          <hr className="my-2 w-4/5 border border-primary" />

          <div className="flex flex-col items-center gap-5 sm:items-start">
            <div className="flex flex-row items-end justify-center gap-5 sm:mx-1 sm:flex-row sm:items-baseline">
              <div className="rounded-sm bg-[#64D62E] px-2 text-base font-bold text-white">
                {parseInt(data.discount, 10)}% off
              </div>
              <b className="hover:mouse-cursor font-sans text-xl sm:text-3xl">
                ₹{data.net_price}
              </b>
              <i className="text-sm text-tertiary sm:text-base">
                <strike>₹{data.price}</strike>
              </i>
            </div>
            <p
              className={`text-md mx-auto text-center font-medium sm:mx-1 ${
                data.stock === 1
                  ? "text-red-500"
                  : data.stock === 0
                    ? "text-red-600"
                    : "text-[#677079]"
              }`}
            >
              {data.stock === 0
                ? "Out of Stock"
                : data.stock === 1
                  ? "Only 1 stock left"
                  : "Only a few items left"}
            </p>
            <Stack spacing={1} className="mx-auto sm:mx-1">
              <Rating
                name="half-rating"
                defaultValue={4.2}
                precision={0.2}
                readOnly
              />
            </Stack>

            <div className="text-md mx-auto text-center font-medium text-[#677079] sm:mx-1">
              Size:{" "}
              {data.variant
                ? data.variant.map((item) => (
                    <button
                      key={item.id}
                      className={`mx-2 h-8 w-8 rounded-full border p-1 transition-all ${
                        item.size === selectedSize
                          ? "bg-primary text-slate-200" // Selected state styles
                          : "hover:bg-primary hover:text-slate-200" // Hover styles
                      }`}
                      onClick={() => handleSizeClick(item.size)}
                    >
                      {item.size}
                    </button>
                  ))
                : ""}
            </div>
            <div className="text-md mx-auto text-center font-medium text-[#677079] sm:mx-1">
              Quantity:
              <select
                id="size-select"
                value={selectedQuantity}
                onChange={handleQuantityClick}
                className="h-8 w-16 rounded border p-1"
              >
                <option value="1">1</option>
              </select>
            </div>

            <div className="buttons flex flex-row justify-center gap-2 sm:mx-1 sm:flex-row sm:gap-2">
              <Button
                text={isInCart ? "Remove from Cart" : "Add To Cart"}
                // text="Add to Cart"
                onClick={handleCart}
              />
              {/* <Button2 text="Buy Now" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
