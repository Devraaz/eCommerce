import React, { useState, useEffect, Suspense } from "react";
import Navbar from "../Sections/Navbar";
import BannerImg from "../Components/BannerImg";
import Footer from "../Sections/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";

import image1 from "../assets/images/img1.png";
import image2 from "../assets/images/img4.png";
import image3 from "../assets/images/img2.png";
import image4 from "../assets/images/img3.png";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";

const API_URL = import.meta.env.VITE_API_URL;

const ProductList = React.lazy(() => import("../Sections/ProductList"));
const ProductListScroll = React.lazy(
  () => import("../Sections/ProductListScroll"),
);

const HomePage = () => {
  const [data, setData] = useState([]);
  const [scrollData, setScrollData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const now = Date.now();
        // const cachedData = localStorage.getItem("productData");
        // const cachedTimeStamp = localStorage.getItem("dateTimeStamp");

        // if (cachedData && cachedTimeStamp) {
        //   const dataAge = now - parseInt(cachedTimeStamp, 10);
        //   if (dataAge < 86400000) {
        //     setData(JSON.parse(cachedData));
        //     return;
        //   }
        // }

        // const res = await axios.get();
        const res = await axios.get(`${API_URL}/api/products/all/`);

        const newData = res.data.slice(-4);
        const scrollData = res.data.slice(-10);
        setData(newData);
        setScrollData(scrollData);
        // localStorage.setItem("productData", JSON.stringify(newData));
        // localStorage.setItem("dateTimeStamp", now.toString());
      } catch (error) {
        console.log(error);
      }
    };
    console.time("operationTime");
    fetchData();
    console.timeEnd("operationTime");
  }, []);

  // Stimulating as we are fetching from backend

  return (
    <>
      <Helmet>
        <title>ShopKart | India's Smartest Shopping Point</title>
      </Helmet>
      <Navbar />
      <BannerImg />
      <Suspense
        fallback={
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={300} height={450} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={300} />
            <Skeleton animation={false} width={300} />
          </Stack>
        }
      >
        <ProductList title="Latest Items" deals={data} />
      </Suspense>
      {/* {deal.map((data) =>(
          <Card2 key={data.id} products={data} url='/Men'/>
      ))} */}
      <section className="h-auto w-[99.9%] bg-gradient-to-r from-[#06060C] to-[#131429]">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="w-[100%] md:w-[50%]">
            <h1 className="after:content[] relative from-red-600 to-purple-700 p-5 text-2xl font-bold text-white after:absolute after:-bottom-3 after:left-5 after:h-1 after:w-20 after:bg-gradient-to-tr md:text-3xl">
              The Trend is Here !
            </h1>
            <p className="text-md w-full p-10 text-center text-white">
              <p className="text-2xl font-extralight">PREMIUM QUALITY </p>
              <br />
              <p className="font-cursive text-5xl opacity-80 md:text-7xl">
                Oversized Shirts
              </p>
              <br />
              <p className="animate-pulse text-xl opacity-20 md:text-xl">
                Limited Deal!
              </p>
            </p>
          </div>
          <div className="image mx-auto w-[90%] md:w-[50%]">
            <img src={image1} alt="" className="w-[80%] pt-10 md:w-[60%]" />
          </div>
        </div>
      </section>
      <Suspense
        fallback={
          <Stack spacing={1}>
            <Skeleton variant="rectangular" width={300} height={450} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={300} />
            <Skeleton animation={false} width={300} />
          </Stack>
        }
      >
        <ProductListScroll title="Our Latest Collection" deals={scrollData} />
      </Suspense>
      <section className="h-auto w-[99.9%] gap-20 bg-slate-200 pb-10">
        <h1 className="after:content[] relative from-red-600 to-purple-700 p-5 text-2xl font-bold text-slate-950 after:absolute after:-bottom-3 after:left-5 after:h-1 after:w-20 after:bg-gradient-to-tr md:text-3xl">
          Category
        </h1>
        <div className="mx-auto mt-16 flex w-[90%] flex-col md:flex-row md:justify-center">
          <div className="mx-auto mb-4 flex w-64 cursor-pointer flex-col gap-5 rounded-md border bg-white p-2 text-center">
            <p className="text-xl font-semibold">Formals</p>
            <img
              src={image2}
              alt=""
              className="transition-all hover:scale-95"
            />
          </div>
          <div className="mx-auto mb-4 flex w-64 cursor-pointer flex-col gap-5 rounded-md border bg-white p-2 text-center">
            <p className="text-xl font-semibold">T-Shirts </p>
            <img
              src={image3}
              alt=""
              className="transition-all hover:scale-95"
            />
          </div>
          <div className="mx-auto mb-4 flex w-64 cursor-pointer flex-col gap-5 rounded-md border bg-white p-2 text-center">
            <p className="text-xl font-semibold">Trowsers</p>
            <img
              src={image4}
              alt=""
              className="transition-all hover:scale-95"
            />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
