import React, { useState } from 'react';
import { formatMoney, renderStarFromNumber } from '../utils/helpers';
import hottag from '../assets/hot-item_352279-547.jpg'
import newtag from '../assets/new-vector-shopping-tag-red-star-label-online-shop-icon-320743630.png'
import SelectOption from './SelectOption';
import icons from '../utils/icons';
import path from '../utils/path';
import { Link } from 'react-router-dom';


function Product({ productData, isNew }) {
  const { AiFillEye, IoMenu, FaHeart } = icons;
  const [isShowOption, setIsShowOption] = useState(false);


  const options = [
    { id: 'heart', icon: <FaHeart /> },
    { id: 'menu', icon:<IoMenu />  },
    { id: 'eye', icon: <AiFillEye /> },
  ];
  return (
    <Link to={path.DETAIL_PRODUCT__PID__TITLE.replace(':pid', productData._id).replace(':title', productData.title)}
      className="w-[12.5rem] h-[18.75rem] flex flex-col justify-center items-center border relative"
      onMouseEnter={(e) => { setIsShowOption(true); e.stopPropagation(); }}
      onMouseLeave={(e) => { setIsShowOption(false); e.stopPropagation(); }}
    >
      {/* Thêm lớp animate cho SelectOption */}
      <div className={`absolute flex gap-5 transition-all duration-300 ease-in-out transform ${isShowOption ? 'top-[10.65rem] opacity-100' : 'top-0 opacity-0'}`}>
        {options.map(option => (
          <SelectOption key={option.id} icon={option.icon} />
        ))}
      </div>
      
      <img
        className="border w-[12rem] h-[12rem] object-contain"
        src={productData.images[0] || "https://www.mon-site-bug.fr/uploads/products/default-product.png"}
        alt={productData.title || "Product"}
      />
      {isNew ? (
        <img className='absolute object-contain ml-[142px] top-8 w-[2.5rem] h-[2.5rem]' src={newtag} alt='newtag' />
      ) : (
        <img className='absolute object-contain ml-[142px] top-8 w-[2.5rem] h-[2.5rem]' src={hottag} alt='hottag' />
      )}
      <div className="flex flex-col mt-2 justify-center items-center text-center">
        <span className='flex mt-1'>{renderStarFromNumber(Math.round(productData?.totalRatings / productData?.ratings.length))}</span>
        <span className='text-ellipsis whitespace-nowrap overflow-hidden max-w-[10rem]'>{productData?.title}</span>
        <span>{formatMoney(productData?.price)}<sup>đ</sup></span>
      </div>
    </Link>
  );
}

export default Product;
