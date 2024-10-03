import React, { useEffect, useState } from "react";
import {
  Slider,
  Sidebar,
  DealDaily,
  BestSeller,
  FeaturedProducts,
  NewArrival,
} from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../redux/asyncActions";
import { apiGetCategories } from "../../apis";

function Home() {
  const [categories, setCategories] = useState([]);
  const fetchProducts = async () => {
    const response = await apiGetCategories();
    if (response.success) setCategories(response.prodCategories);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(categories);
  return (
    <>
      <div className="ml-28 w-[80rem] flex">
        <div className="flex flex-col gap-5 w-[20%] border flex-auto">
          <Sidebar />
          <DealDaily />
        </div>
        <div className="flex flex-col gap-5 w-[80%] border pl-5 flex-auto">
          <Slider />
          <BestSeller />
        </div>
      </div>
      <div className="ml-28 w-[80rem] flex">
        <FeaturedProducts />
      </div>
      <div className="ml-28 w-[80rem] ">
        <h3 className="w-full text-[20px] font-semibold py-[15px] border-b-4 border-red-600 uppercase">
          hàng mới đến
        </h3>
        <NewArrival />
      </div>
      <div className="ml-28 w-[80rem] ">
        <h3 className="w-full text-[20px] font-semibold py-[15px] border-b-4 border-red-600 uppercase">
          bộ sưu tập ưa chuộng
        </h3>
        <div className="flex flex-wrap gap-4 ">
          {categories.map((c) => {
         
            return (
              <div
                key={c._id}
                className="w-[26rem]  flex border justify-center gap-12 p-2"
              >
                <div className="border  flex-col items-center">
                  <img
                    className="w-[10rem] h-[12rem] object-contain"
                    src={c?.image}
                    alt={c.title}
                  />
                </div>
                <div className="flex-col flex space-y-3">
                  {c.brand?.map((cb, index) => (
                    <span className="text-gray-500" key={index}>
                      &gt; {cb}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="ml-28 w-[80rem]">
        <h3 className="w-full text-[20px] font-semibold py-[15px] border-b-4 border-red-600 uppercase">
          blog posts
        </h3>
      </div>
      <div className="w-full h-[500px]"></div>
    </>
  );
}

export default Home;
