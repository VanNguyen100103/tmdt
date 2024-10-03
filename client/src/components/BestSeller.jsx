import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Product from "./Product";
import laptop from '../assets/laptop-banner.png';
import phone from '../assets/phone-banner.png';
import { useDispatch, useSelector } from "react-redux";
import { getNewProducts, getBestSellers } from "../redux/products/asyncActions";

const tabs = ["best seller", "new arrivals"];

function BestSeller() {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux
  const { bestSellers, newProducts, isLoading } = useSelector((state) => state.products);

  // Fetch sản phẩm bán chạy và sản phẩm mới từ Redux khi component được render
  useEffect(() => {
    dispatch(getBestSellers());
    dispatch(getNewProducts());
  }, [dispatch]);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true, // Infinite only if more than 4 products
    speed: 500,
    slidesToShow: 4, // Show up to 4 products
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: true,
  };

  return (
    <div>
      {/* Tabs to switch between Best Sellers and New Arrivals */}
      <div className="flex pb-4 border-b-4 border-red-600">
        {tabs.map((t, index) => (
          <span
            onClick={() => setActiveTab(index)}
            key={index}
            className={`cursor-pointer capitalize mr-2 ${activeTab === index ? "font-bold" : ""}`}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Product slider */}
      <div className="w-full mt-3">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Slider {...settings}>
            {activeTab === 0
              ? bestSellers.map((p, index) => (
                  <Product key={p._id} productData={p} isNew={false} />
                ))
              : newProducts.map((p, index) => (
                  <Product key={p._id} productData={p} isNew={true} />
                ))}
          </Slider>
        )}
      </div>

      {/* Banner dưới */}
      <div className="w-full flex gap-4 mt-[7rem]">
        <img className="w-[30rem] object-contain" src={laptop} alt="laptop-banner" />
        <img className="w-[30rem] object-contain" src={phone} alt="phone-banner" />
      </div>
    </div>
  );
}

export default BestSeller;
