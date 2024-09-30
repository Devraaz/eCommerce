import React from "react";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Card from "../Components/Card";

const ProductListScroll = (props) => {
  let deal = [];

  if (props.deals) {
    deal = props.deals;
  }
  return (
    <div>
      <section className="mx-auto my-3 w-[98vw] rounded-lg bg-white p-4">
        <h1 className="after:content[] relative from-red-600 to-purple-700 text-3xl font-bold after:absolute after:-bottom-3 after:left-0 after:h-1 after:w-20 after:bg-gradient-to-tr">
          {props.title}
        </h1>
        <br />
        <div className="">
          <Swiper
            spaceBetween={30}
            centeredSlides={false}
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
                slidesPerView: 3, // 4 slides per view for large screens
                spaceBetween: 20, // Space between slides on large screens
              },
              988: {
                slidesPerView: 4, // 4 slides per view for large screens
                spaceBetween: 20, // Space between slides on large screens
              },
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {deal.map((data) => (
              <SwiperSlide key={data.id}>
                <Card key={data.id} products={data} url="/Men" />
              </SwiperSlide>
            ))}
            ;
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default ProductListScroll;
