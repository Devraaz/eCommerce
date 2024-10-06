import React from "react";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import frame2 from "../assets/images/frame2.png";

import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import banner4 from "../assets/images/banner4.png";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Card from "../Components/Card";

const BannerImg = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        breakpoints={{
          // Define breakpoints for responsiveness
          320: {
            slidesPerView: 1, // 1 slide per view for small screens
          },
          768: {
            slidesPerView: 1, // 4 slides per view for large screens
            spaceBetween: 20, // Space between slides on large screens
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={banner1}
            className="z-0 w-auto object-cover sm:p-2 md:h-auto md:w-screen"
            alt="BannerImg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={banner2}
            className="z-0 w-auto object-cover sm:p-2 md:h-auto md:w-screen"
            alt="BannerImg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={banner3}
            className="z-0 w-auto object-cover sm:p-2 md:h-auto md:w-screen"
            alt="BannerImg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={banner4}
            className="z-0 w-auto object-cover sm:p-2 md:h-auto md:w-screen"
            alt="BannerImg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default BannerImg;
