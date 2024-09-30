import React, { useState } from "react";

const ImageDisplayGallery = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSee = (index) => {
    setCurrentIndex(index);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const currentImage = images[currentIndex].image;

  return (
    <>
      <div className="section mx-auto flex h-full w-full flex-col gap-5 md:w-[50%] md:flex-row-reverse md:px-0">
        <div className="main-image relative mx-auto my-3 h-[340px] w-[295px] overflow-hidden rounded-lg md:h-[490px] md:w-[420px]">
          <button
            className="absolute top-[50%] z-10 -translate-y-5"
            onClick={() => handlePrev()}
          >
            <img
              src="https://www.svgrepo.com/show/247754/left-arrow-back.svg"
              className="w-10 opacity-50 transition-all hover:scale-105 hover:opacity-100"
              alt="PreviousImage"
            />
          </button>
          <img
            src={currentImage}
            alt=""
            className="object-fit cursor-pointer rounded-lg transition-all hover:scale-110"
          />
          <button
            className="absolute right-0 top-[50%] z-10 -translate-y-5"
            onClick={() => handleNext()}
          >
            <img
              src="https://www.svgrepo.com/show/247779/right-arrow-next.svg"
              alt="NextImage"
              className="w-10 opacity-50 transition-all hover:scale-105 hover:opacity-100"
            />
          </button>
        </div>
        <div className="sub-images mx-auto my-2 flex w-[90%] flex-row gap-1 p-1 md:w-fit md:flex-col">
          {images.map((data, index) => (
            <div
              key={data.id}
              className="h-[60px] w-[50px] overflow-hidden rounded-md"
            >
              <img
                src={data.image}
                alt={data.product}
                className={`cursor-pointer rounded-lg object-cover opacity-50 transition-all hover:scale-110 hover:opacity-100 ${
                  index === currentIndex ? "opacity-100" : "opacity-100"
                }`}
                onClick={() => handleSee(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageDisplayGallery;
