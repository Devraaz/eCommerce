import React from "react";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import frame2 from "../assets/images/frame2.png";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Card from "../Components/Card";

const BannerImg = (props) => {
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
            src={frame2}
            className="z-0 w-auto object-cover sm:p-2 md:h-auto md:w-screen"
            alt="BannerImg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={frame2}
            className="z-0 w-auto object-cover sm:p-2 md:h-auto md:w-screen"
            alt="BannerImg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={frame2}
            className="z-0 w-auto object-cover sm:p-2 md:h-auto md:w-screen"
            alt="BannerImg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default BannerImg;
