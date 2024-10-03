import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { apiGetProducts } from "../apis";
import banner1 from '../assets/pasted image 0.png'
import banner2 from '../assets/banner-left.png'
import banner3 from '../assets/unnamed.jpg'
import banner4 from '../assets/Note9_CRM_2tr5_KV_600x840_FA.jpg'

function FeaturedProducts() {
   
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await apiGetProducts({limit: 12});
    if (response.success) setProducts(response.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log(products);
  return (
    <div className="w-full " >
      <h3 className="text-[20px] font-semibold py-[15px] border-b-4 border-red-600 uppercase">
        featured products
      </h3>
      <div className="flex flex-wrap gap-4 border mt-4">
          {products?.map((p) => (
            <ProductCard key={p._id} productData={p} />
          ))}
      </div>
      <div className="flex gap-5">
        <img className="object-contain flex-col flex-4 w-[15rem] mt-5 scale-y-[1.1]" src={banner1} alt="" /> 
        <div className="flex-col flex-2 mt-4 w-[15rem]">
            <img className="" src={banner2} alt="" />
            <img className="mt-6 ml-1" src={banner3} alt="" />
        </div>
        <img className="object-contain flex-col flex-3 w-[15rem] mt-3 scale-y-[1.4]" src={banner4} alt="" />
      </div>
    </div>
  );
}

export default FeaturedProducts;
