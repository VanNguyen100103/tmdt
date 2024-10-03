import React, { useState, useCallback } from "react";
import { Button, InputField } from "../../components";
import { apiRegister, apiLogin } from "../../apis/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { reg } from "../../redux/users/userSlice";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isRegister, setIsRegister] = useState(false);  // Toggle between login and register
  const [loading, setLoading] = useState(false);

  // Handle form submission for both login and registration
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      
      if (isRegister) {
        // Registration: Use FormData for file upload
        const formData = new FormData();
        formData.append("email", payload.email);
        formData.append("password", payload.password);
        formData.append("firstname", payload.firstname);
        formData.append("lastname", payload.lastname);
        formData.append("mobile", payload.mobile);
        if (payload.avatar) {
          formData.append("avatar", payload.avatar);  // Append avatar if uploaded
        }
        
        response = await apiRegister(formData);  // Call registration API
      } else {
        // Login: Use URLSearchParams for login data
        const formData = new URLSearchParams();
        formData.append("email", payload.email);
        formData.append("password", payload.password);

        response = await apiLogin(formData);  // Call login API
      }

      console.log("Login/Register response:", response);  // Log response for debugging

      if (response?.success) {
        toast.success(isRegister ? "Registration successful!" : "Login successful!");
        dispatch(reg({ isLoggedIn: true, token: response.accessToken, userData: response.userData }));
        navigate("/");  // Navigate to home
      } else {
        throw new Error(response?.message || "Unexpected error occurred.");
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  }, [payload, isRegister, navigate, dispatch]);

  // Handle file upload for avatar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPayload({ ...payload, avatar: file });

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);  // Set avatar preview
  };

  return (
    <div className="h-screen w-screen relative overflow-y-hidden">
      <img
        className="object-cover w-full h-full"
        src="https://cdn.pixabay.com/photo/2016/09/26/14/15/background-1696064_640.jpg"
        alt=""
      />
      <div className="absolute top-0 bottom-0 left-1/3 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col rounded-md min-w-[31.25rem]">
          <h1 className="text-[28px] text-center font-semibold text-red-600 mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>

          {/* Email Input */}
          <InputField
            value={payload.email}
            type="email"
            setValue={(val) => setPayload({ ...payload, email: val })}
            nameKey="email"
          />

          {/* Password Input */}
          <InputField
            value={payload.password}
            type="password"
            setValue={(val) => setPayload({ ...payload, password: val })}
            nameKey="password"
          />

          {/* Registration-specific fields */}
          {isRegister && (
            <>
              <InputField
                value={payload.firstname}
                type="text"
                setValue={(val) => setPayload({ ...payload, firstname: val })}
                nameKey="firstname"
              />
              <InputField
                value={payload.lastname}
                type="text"
                setValue={(val) => setPayload({ ...payload, lastname: val })}
                nameKey="lastname"
              />
              <InputField
                value={payload.mobile}
                type="text"
                setValue={(val) => setPayload({ ...payload, mobile: val })}
                nameKey="mobile"
              />
              
              {/* Avatar Upload */}
              <div className="bg-gray-300 h-[5rem] flex items-center justify-center rounded-full px-3">
                <div className="flex h-[3rem] w-full justify-between items-center border rounded-[24px] bg-white px-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border-r-2 border-black pr-4"
                  />
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="ml-8 object-cover rounded-full w-[36px] h-[36px] border-l-2 "
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <Button
            name={loading ? "Processing..." : isRegister ? "Đăng ký" : "Đăng nhập"}
            handleOnClick={handleSubmit}
            fw
            disabled={loading}
          />

          {/* Toggle between Login and Register */}
          <div className="flex items-center justify-between my-2 w-full">
            {!isRegister ? (
              <>
                <span className="text-blue-500 hover:underline cursor-pointer">
                  Bạn đã quên mật khẩu?
                </span>
                <span
                  className="text-blue-500 hover:underline cursor-pointer"
                  onClick={() => setIsRegister(true)}
                >
                  Tạo tài khoản mới
                </span>
              </>
            ) : (
              <span
                className="text-blue-500 hover:underline cursor-pointer ml-[11.6rem] mt-2"
                onClick={() => setIsRegister(false)}
              >
                Đăng nhập
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
