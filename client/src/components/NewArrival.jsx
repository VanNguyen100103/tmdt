import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import { apiGetProducts } from '../apis'
import Product from './Product'


function NewArrival() {
    const [newArrivals, setNewArrivals] = useState([])
    const fetchProducts = async () => {
      const response = await apiGetProducts({sort: '-createdAt'})
      if (response.success) setNewArrivals(response.products)
    }
    useEffect(() => {
        fetchProducts()
    },[])
    console.log(newArrivals)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrow: true,
        centerMode: true, // Căn giữa sản phẩm chính
    
      };
    
  return (
    <div className='w-full justify-center mt-5'>
        <Slider {...settings}>
            {newArrivals?.map(p => <Product key={p._id} productData={p}/>)}
        </Slider>
    </div>
  )
}

export default NewArrival
