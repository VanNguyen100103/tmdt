import React from "react";
import { formatMoney, renderStarFromNumber } from '../utils/helpers';
import { Link } from "react-router-dom";
import path from '../utils/path'

function ProductCard({ productData }) {

  return (
    <Link to={`${path.DETAIL_PRODUCT.replace(':id', productData._id)}`}
      className="w-1/4 flex flex-auto pl-[4.2rem] space-x-[5rem] cursor-pointer border"
    >

      <img className="w-[90px] border object-contain"
        src={
          productData.images[0] ||
          "https://www.mon-site-bug.fr/uploads/products/default-product.png"
        }
        alt={productData.title}
      />
        <div className="flex flex-col mt-2 justify-start">
            <span className='flex mt-1'>{renderStarFromNumber(Math.round(productData?.totalRatings / productData?.ratings.length))}</span>
            <span className='text-ellipsis whitespace-nowrap overflow-hidden max-w-[10rem]'>{productData?.title}</span>
            <span>{formatMoney(productData?.price)}<sup>đ</sup></span>
      </div>
    </Link>
  );
}

export default ProductCard;
