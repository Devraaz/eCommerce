import React, { useState } from "react";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { fadeIn } from "../variants";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { BsHeartFill } from "react-icons/bs";
import {
  addToWishList,
  removeFromWishList,
} from "../redux/Wishlist/WishlistSlice";

import { useDispatch, useSelector } from "react-redux";

const Card = (props) => {
  const [animate, setAnimate] = useState(false);
  const imageUrl = props.products.images[0]
    ? props.products.images[0].image
    : "https://www.svgrepo.com/show/140043/shirt.svg";

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist);
  const isInWishlist =
    Array.isArray(wishlist) &&
    wishlist.some((item) => item.id === props.products.id);

  const handleWishList = () => {
    if (isInWishlist) {
      dispatch(removeFromWishList(props.products.id));
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600); // Animation duration should match Tailwind's animation duration
    } else {
      dispatch(addToWishList(props.products));
    }
  };

  const sizes = props.products.variant;

  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card z-10 mx-auto flex h-[318px] w-[164px] flex-col items-center justify-between rounded-lg border border-slate-300 p-1 hover:shadow-lg sm:h-[440px] sm:w-[250px]"
        >
          <div className="relative h-[188px] w-[150px] overflow-hidden rounded-lg border sm:h-[292px] sm:w-[233px]">
            <img
              className="h-[188px] w-[150px] rounded-lg object-cover transition-all hover:scale-110 sm:h-[292px] sm:w-[233px]"
              src={imageUrl}
              alt="Product Image"
            />
            <button
              onClick={handleWishList}
              className={` ${animate ? "animate-pulse" : ""} `}
            >
              {isInWishlist ? (
                <BsHeartFill className="absolute right-0 top-0 z-10 h-9 w-9 p-1 text-red-600 opacity-95" />
              ) : (
                <BsHeartFill className="absolute right-0 top-0 z-10 h-9 w-9 p-1 text-slate-600 opacity-40" />
              )}
            </button>
          </div>

          <Link
            className="w-full space-y-1 p-2"
            to={`/ProductPage/${props.products.id}`}
          >
            <p className="truncate text-center text-sm font-medium text-secondary sm:text-lg">
              <Link to={`/ProductPage/${props.products.id}`}>
                {props.products.product_name}
              </Link>
            </p>

            <div className="flex flex-col items-center justify-between sm:flex-row sm:items-baseline">
              <b className="text-md hover:mouse-cursor sm:text-xl">
                ₹{props.products.net_price}
              </b>
              <i className="sm:text-md text-sm text-tertiary">
                <strike>₹{props.products.price}</strike>
              </i>
              <div className="rounded-sm bg-pred px-2 text-sm font-bold text-white">
                {parseInt(props.products.discount, 10)}% off
              </div>
            </div>

            <Stack spacing={1} className="mx-auto">
              <Rating
                name="half-rating"
                defaultValue={4.2}
                precision={0.5}
                readOnly
              />
            </Stack>
            <p
              className={`text-md mx-auto text-center font-medium sm:mx-1 ${
                props.products.stock === 1
                  ? "text-red-500"
                  : props.products.stock === 0
                    ? "text-red-600"
                    : "text-[#677079]"
              }`}
            >
              {props.products.stock === 0 ? "Out of Stock" : ""}
            </p>

            <div className="text-md text-center font-medium text-[#677079]">
              Size:{" "}
              {sizes
                ? sizes.map((item) => <span key={item.id}>{item.size} </span>)
                : " "}
            </div>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default Card;
