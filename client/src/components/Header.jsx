import React from "react";
import { NavLink } from "react-router-dom";
import icons from "../utils/icons";
import logo from "../assets/logo-cellphones.jpg";
import path from "../utils/path";


function Header() {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
  return (
    <div className="border w-full flex justify-between items-center h-[110px] py[35px]">
     <NavLink className='ml-[4rem]' to={path.HOME}> <img className="w-[10rem] object-contain border-r-emerald-200" src={logo} alt="logo" /></NavLink>
      <div className="flex text-[13]px">
        <div className="flex flex-col items-center px-8 border-r">
          <span className="flex gap-4 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-8 border-r">
          <span className="flex gap-4 items-center">
            <MdEmail color="red" />
            <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6 border-r">
          <BsHandbagFill color="red" />
          <span>0 item(s)</span>
        </div>
        <div className="flex items-center justify-center gap-2 px-6">
          <FaUserCircle size={24}/>
        </div>
      </div>
    </div>
  );
}

export default Header;
