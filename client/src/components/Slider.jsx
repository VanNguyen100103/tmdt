import React from "react";
import Slider from "react-slick";

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: true,
  };

  return (
    <div className="relative w-full"> {/* Ensure relative positioning on the container */}
      <Slider {...settings}>
        <div>
          <img
            className="w-full h-72 object-contain"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-ip16-19-09.jpg"
            alt="Silder 1"
          />
        </div>
        <div>
          <img
            className="w-full h-72 object-contain"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dang-ky-nt-s24fe-home-20-9.png"
            alt="Slider 2"
          />
        </div>
        <div>
          <img
            className="w-full h-72 object-contain"
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thu-cu-banner-390-home.jpg"
            alt="Slider 3"
          />
        </div>
      </Slider>
    </div>
  );
}

export default Banner;
