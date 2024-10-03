import React, { memo } from "react";
import icons from "../utils/icons";



function Footer() {
    const { BiLogoGmail, MdPlace, RiVisaFill, FaCcMastercard, FaCcStripe, FaCcDiscover, FaCcPaypal, BsFillTelephoneFill } = icons
  return (
    <div className="w-full">
      <div className="h-[103px] bg-red-600 flex items-center justify-center">
            <div className="w-[80rem] flex items-center justify-between">
                <div className="flex flex-col ">
                    <span className="text-[20px] text-gray-100">LOGIN TO NEWSLETTER</span>
                    <small className="text-[13px] text-gray-300">Subcribe now and receive weekly newsletter</small>
                </div>
                <div className="flex space-x-10 ">
                    <input className="outline-none text-gray-100 p-3 w-[40rem] rounded-l-full rounded-r-full bg-[#F04646]" type="text" placeholder="Email address"/>
                    <span className="mt-2 text-gray-100"><BiLogoGmail size={35}/></span>
                </div>
            </div>
      </div>
      <div className="h-[280px] bg-gray-800 flex justify-center text-white text-[13px]">
        <div className="flex-2 ml-[10rem] mt-[1.5rem] space-y-4">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-4 border-red-600 pl-2">ABOUT US</h3>
            <span className="flex gap-2">
                <sub><MdPlace size={17}/></sub>
                <span>Địa chỉ: 35/21 Đường D5, Phường 25, Quận Bình Thạnh, TP.HCM</span>
            </span>
            <span className="flex gap-2">
                <sub><BsFillTelephoneFill size={17}/></sub>
                <span>Telehone: (+1800) 000 8080</span>
            </span>
        </div>
        <div className="flex-1 mt-[1.5rem]">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-4 border-red-600 pl-2">CHÍNH SÁCH</h3>
            <div className="flex flex-col space-y-4">
                <span>Chính sách đổi trả 60 ngày</span>
                <span>Chính sách khuyến mãi</span>
                <span>Chính sách bảo mật</span>
                <span>Chính sách giao hàng</span>
            </div>
        </div>
        <div className="flex-1 mt-[1.5rem]">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-4 border-red-600 pl-2">CHĂM SÓC KHÁCH HÀNG</h3>
            <div className="flex flex-col space-y-4">
                <span>Trải nghiệm mua sắm 100% hài lòng</span>
                <span>Hỏi đáp - FAQ</span>
            </div>
            <h3 className="mt-8 text-[15px] font-medium border-l-4 border-red-600 pl-2">HƯỚNG DẪN</h3>
            <div className="flex flex-col space-y-4 mt-4">
                <span>Trải nghiệm mua sắm 100% hài lòng</span>
                <span>Chính sách khuyến mãi</span>
            </div>
        </div>
        <div className="flex-1 mt-[1.5rem]">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-4 border-red-600 pl-2">TÀI LIỆU - TUYỂN DỤNG</h3>
            <div className="flex flex-col space-y-4">
                <span>Tuyển dụng</span>
                <span>Đăng ký bản quyền</span>
            </div>
        </div>
      </div>
      <div className="flex h-[5rem] justify-between items-center bg-[#000]">
        <div className="text-white text-[12px] flex flex-col ml-[6rem]">
            <span>@ CÔNG TY TNHH FASTECH ASIA</span>
            <span>Mã số doanh nghiệp: 0108617038. Giấy chứng nhận đăng ký doanh nghiệp do Sở Kế hoạch và Đầu tư TP Hồ Chí Minh cấp lần đầu ngày 20/02/2019.</span>
        </div>
        <div className="flex space-x-10 mr-[10rem]">
            <RiVisaFill color="white" size={32}/>
            <FaCcMastercard color="white" size={32}/>
            <FaCcStripe color="white" size={32}/>
            <FaCcPaypal color="white" size={32}/>
            <FaCcDiscover color="white" size={32}/>
        </div>
      </div>
    </div>
  );
}

export default memo(Footer);
