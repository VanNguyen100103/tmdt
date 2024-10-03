import React, { useEffect, useState } from 'react'
import icons from '../utils/icons'
import { apiGetProducts } from '../apis/product'
import { renderStarFromNumber, formatMoney } from '../utils/helpers'
import Countdown from './Countdown'


function DealDaily() {
    const {AiFillStar, IoMenu} = icons
    const [dealDaily, setDealDaily] = useState(null)
    const fetchProducts = async () => {
      const response = await apiGetProducts({limit: 1, page: 2})
      if(response.success) setDealDaily(response.products[0])
   }
    const [expireTime, setExpireTime] = useState(false)
    const [hour, setHour] = useState(0)
    const [minute, setMinute] = useState(0)
    const [second, setSecond] = useState(0)
   useEffect(() => {
    fetchProducts()
   },[])
   useEffect(()=>{
      if(expireTime) {
        fetchProducts()
        setHour(24-new Date().getHours())
        setMinute(60-new Date().getMinutes())
        setSecond(60 - new Date().getSeconds())

      }
   },[expireTime])
   useEffect(() => {
    let idInterval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1);
      } else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(59); // Set to 59 instead of 60
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59); // Set to 59 instead of 60
            setSecond(59);
          } else {
            setExpireTime(true);
          }
        }
      }
    }, 1000);
    
    // Cleanup function to clear the interval
    return () => clearInterval(idInterval);
  }, [second, minute, hour]);
  
  return (
    <div className='w-full border-t-2 flex-auto mt-5'>
      <div className="flex items-center">
        <span className='flex-2 pl-4 justify-center'><AiFillStar color='gold' size={20}/></span>
        <span className='flex-5 ml-3 font-bold text-[20px] text-center'>DEAL DAILY</span>
        <span className='flex-2'></span>
      </div>
      <div className="w-full flex flex-col items-center ">
        <img className='w-full object-contain mt-3' src={dealDaily?.images[0]} alt={dealDaily?.title} />
        <span className='flex mt-3'>{renderStarFromNumber(Math.round(dealDaily?.totalRatings / dealDaily?.ratings.length))}</span>
        <span className='text-ellipsis whitespace-nowrap overflow-hidden max-w-[10rem]'>{dealDaily?.title}</span>
        <span >{formatMoney(dealDaily?.price)}<sup>đ</sup></span>
      </div>
      <div className='px-4 mt-4  rounded-full'>
        <div className="mt-4 flex justify-center gap-10">
          <Countdown unit={'Giờ'} number={hour}/>
          <Countdown unit={'Phút'} number={minute}/>
          <Countdown unit={'Giây'} number={second}/>
        </div>
        <button className='mt-3 mb-3 p-3 flex gap-4 items-center w-full justify-center text-white bg-red-600'  type='button'>
          <IoMenu/>
          <span className='font-bold'>Options</span>
        </button>
      </div>
    </div>
  )
}

export default DealDaily
