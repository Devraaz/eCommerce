import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { MdLocationOn, MdCurrencyRupee } from "react-icons/md";
const Stepper = ({ path }) => {
  return (
    <>
      <ol class="relative m-1 mx-auto my-5 flex w-3/5 items-center p-2 align-middle">
        <li
          class={`mx-auto flex w-full items-center text-blue-600 after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-blue-100 after:content-[''] dark:text-blue-500 ${path === "/BuyProcess/address" || path === "/BuyProcess/payment" ? "dark:after:border-blue-600" : "dark:after:border-gray-700"} `}
        >
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-800">
            <FaCartShopping className="text-xl text-white" />
          </span>
        </li>
        <li
          class={`flex w-full items-center after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:content-[''] ${path === "/BuyProcess/payment" ? "dark:after:border-blue-600" : "dark:after:border-gray-700"}`}
        >
          <span
            class={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 lg:h-12 lg:w-12 ${path === "/BuyProcess/address" || path === "/BuyProcess/payment" ? "dark:bg-blue-800" : "dark:bg-gray-700"} `}
          >
            <MdLocationOn className="text-xl text-white" />
          </span>
        </li>
        <li class="flex w-fit items-center">
          <span
            class={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 lg:h-12 lg:w-12 ${path === "/BuyProcess/payment" ? "dark:bg-blue-800" : "dark:bg-gray-700"} `}
          >
            <MdCurrencyRupee className="text-xl text-white" />
          </span>
        </li>
      </ol>
    </>
  );
};

export default Stepper;
