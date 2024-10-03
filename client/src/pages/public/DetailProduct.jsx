import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProduct } from '../../redux/products/asyncActions'


function ProductDetail() {
  const { pid, title } = useParams();
  const { productDetail, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct(pid));

  },[])
 
  return (
    <div className='flex'>
      <h1>Product Detail for {title}</h1>
      <p>Product ID: {pid}</p>
      <p> {productDetail?.price} </p>
      <img src={productDetail?.images[0]} alt={productDetail?.title}/>
  </div>
  )
}

export default ProductDetail
