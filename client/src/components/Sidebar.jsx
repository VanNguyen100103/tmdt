import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/asyncActions';
import { NavLink } from 'react-router-dom'
import { createSlug } from '../utils/helpers'
import icons from '../utils/icons';


function Sidebar() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    const { categories} = useSelector(state => state.app);
    const {MdOutlineSmartphone, FaTabletAlt, FaLaptop, IoCameraOutline, TiPrinter, CiSpeaker, CiHeadphones, PiTelevision} = icons
     // Hàm để chọn icon dựa trên tiêu đề danh mục
     const getIcon = (title) => {
      switch (title) {
          case 'Smartphone':
              return <MdOutlineSmartphone />;
          case 'Tablet':
              return <FaTabletAlt />;
          case 'Laptop':
              return <FaLaptop />;
          case 'Camera':
              return <IoCameraOutline />;
          case 'Printer':
              return <TiPrinter />;
          case "Speaker":
              return <CiSpeaker/>
          case "Headphone":
                return <CiHeadphones/>
          case "Television":
              return <PiTelevision/>
          default:
              return null; // Hoặc icon mặc định
      }
  };

    return (
        <div className='flex flex-col gap-5 w-[16rem] mt-5'>
            {categories?.map(c => (
                <NavLink className={({isActive})=> isActive ? " hover:bg-red-600 hover:text-white rounded-full p-3" : 'hover:bg-red-600 hover:text-white rounded-full text-center p-3'} key={createSlug(c.title)} to={createSlug(c.title)}>
                    <div className="absolute mt-1 ml-16 icons">{getIcon(c.title)}</div> {/* Hiển thị icon tương ứng */}
                    <span className='ml-9'>{c.title}</span> {/* Khoảng cách giữa icon và tiêu đề */}
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;
