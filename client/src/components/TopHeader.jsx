import React,{memo} from 'react'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'
import path from '../utils/path'


function TopHeader() {
    const {FaFacebookSquare, FaGoogle ,BiLogoGmail} = icons
  return (
    <Link to={path.LOGIN} className='h-[20px] w-full bg-red-600 flex items-center justify-center p-4'>
      <div className="flex items-center space-x-[67rem] text-white ">
        <span className=''>Liên hệ: (+1800) 000 8080</span>
        <div className="header-right flex gap-3">
            <span className='flex gap-2 hover:cursor-pointer'>Đăng nhập<sub><BiLogoGmail color='white' size={20}/></sub></span>
            <sub className='border-r-2 border-l-2 border-white pl-3 pr-3 hover:cursor-pointer'><FaFacebookSquare color='white' size={20}/></sub>
            <sub className='hover:cursor-pointer'><FaGoogle color='white' size={20}/></sub>
        </div>
      </div>
    </Link>
  )
}

export default memo(TopHeader)
