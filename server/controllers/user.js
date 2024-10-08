const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const {generateAccessToken, generateRefreshToken} = require("../middlewares/jwt.js")
const jwt = require('jsonwebtoken');
const sendMail = require("../utils/sendMail.js");
const crypto = require('crypto');
const product = require('../models/product.js');
const makeToken = require('uniquid');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname, mobile } = req.body;

    // Kiểm tra các input bắt buộc
    if (!email || !password || !firstname || !lastname || !mobile) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        });
    }

    // Kiểm tra xem user đã tồn tại chưa
    const user = await User.findOne({ email });
    if (user) throw new Error("User already exists!");

    // Lưu thông tin avatar nếu có file được tải lên
    let avatar;
    if (req.file) {
        console.log(req.file); // Log the file data for debugging
        avatar = {
            public_id: req.file.filename, // ID từ Cloudinary
            url: req.file.path // URL từ Cloudinary
        };
    }

    // Tạo token ngẫu nhiên để gửi qua email
    const token = makeToken();

    // Lưu toàn bộ thông tin đăng ký vào cookie, bao gồm cả avatar
   // Lưu toàn bộ thông tin đăng ký vào cookie, bao gồm cả avatar và token
    res.cookie("dataRegister", { ...req.body, avatar, token }, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // Cookie tồn tại trong 15 phút
    });


 

    // Gửi email xác thực
    const html = `Xin vui lòng click vào link dưới đây để hoàn tất đăng ký.<br/>Mã sẽ hết hạn sau 15 phút.<br/><a href="${process.env.URL_SERVER}/api/user/finalregister/${token}">Click here</a>`;
    await sendMail({ email, html, subject: "Hoàn tất đăng ký." });

    return res.status(200).json({
        success: true,
        mes: "Please check your email to active account."
    });
});


const finalRegister = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    const { token } = req.params;

    // Kiểm tra cookie và token
    if (!cookie || cookie?.dataRegister?.token !== token) throw new Error("Register failed");

    // Lấy thông tin avatar từ cookie
    const { email, password, firstname, lastname, mobile, avatar } = cookie.dataRegister;

    // Tạo user mới
    const user = await User.create({
        email,
        password,
        firstname,
        lastname,
        mobile,
        avatar // Lưu thông tin avatar
    });

    return res.status(200).json({
        success: user ? true : false,
        mes: user ? "Register successfully" : "Register failed"
    });
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }
    const response = await User.findOne({email})
    if(response && await response.comparePassword(password)){
        const {password, role, refreshToken,...userData} = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const newRefreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, {refreshToken: newRefreshToken}, {new: true})
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000,
          });
         return res.status(200).json({
            success: true,
            userData,
            accessToken
         })
    }else{
        throw new Error("Invalid credentials!")
    }
});

const getCurrent = asyncHandler(async (req, res) => {
    const {_id} = req.user;
    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: user ?true:false,
        result: user ? user : 'User not found!'
    })
});

const refreshAccessToken = asyncHandler(async (req, res)=> {
    const cookie = req.cookies
     console.log(cookie); // Kiểm tra xem refresh token có trong cookie không
    if(!cookie && !cookie.refreshToken) throw new Error("No refresh token in cookies!")
    jwt.verify(cookie.refreshToken, process.env.JWT_SECRET, async (err, decode) => {
      const response = await User.findOne({_id: decode._id, refreshToken: cookie.refreshToken})
      return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : "Refresh token not matched!"
      })
    }
    )
})

const logout = asyncHandler(async (req, res)=>{
    const cookie = req.cookies
    if(!cookie && !cookie.refreshToken) throw new Error("No refresh token in cookies!")
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ""}, {new: true})
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({success: true, mes: 'Logout is done'})
})

const forgotPassword = asyncHandler(async (req, res)=>{
    const {email} = req.query
    if(!email) throw new Error("Missing email")
    const user = await User.findOne({email})
    if(!user) throw new Error("User not found")
    const resetToken = user.createPasswordChangedToken()
    await user.save()
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.<br/><a href="${process.env.URL_SERVER}/api/user/reset-password/${resetToken}">Click here</a>`;
    const data = {
        email,
        html,
        subject: "Forgot Password"
    }
    const result = await sendMail(data); // Pass email and html separately.

  
    return res.status(200).json({success: true, res: result})
})

const resetToken = asyncHandler(async (req,res)=>{
    const {password, token} = req.body
    if(!password || !token) throw new Error("Missing inputs.")
    const passwordResetToken = crypto.createHash('sha256').update(token).digest("hex")
    const user = await User.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}})
    if(!user) throw new Error("Invalid reset token!")
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangedAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? "Update password." : "Something went wrong!"
    })
})

const getUsers = asyncHandler(async (req,res)=>{
    const response = await User.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async (req,res)=>{
    const {_id} = req.query
    if(!_id) throw new Error("Missing input")
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? `User with email ${response.email} deleted` : "No user delete"
    })
})

const updateUser = asyncHandler(async (req,res)=>{
    const {_id} = req.user
    if(!_id || Object.keys(req.body).length ===0) throw new Error("Missing inputs")
    const response = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : "Something went wrong."
    })
})

const updateUserByAdmin = asyncHandler(async (req,res)=>{
    const {uid} = req.params
    if(Object.keys(req.body).length ===0) throw new Error("Missing inputs")
    const response = await User.findByIdAndUpdate(uid, req.body, {new: true}).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : "Something went wrong."
    })
})

const updateUserAddress = asyncHandler(async (req,res)=>{
    const {_id} = req.user
    if(!req.body.address) throw new Error("Missing input")
    const response = await User.findByIdAndUpdate(_id, {$push: {address: req.body.address}}, {new: true}).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : "Something went wrong."
    })
})

const updateCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, quantity, color } = req.body;

    // Kiểm tra các input cần thiết
    if (!pid || !quantity || !color) throw new Error("Missing inputs");

    const user = await User.findById(_id).select("cart");
    const alreadyProduct = user?.cart?.find(el => el.product.toString() === pid);

    // Nếu sản phẩm đã tồn tại trong giỏ hàng
    if (alreadyProduct) {
        if (alreadyProduct.color === color) {
            // Cập nhật số lượng nếu màu sắc giống nhau
            const response = await User.updateOne(
                { cart: { $elemMatch: alreadyProduct } },
                { $set: { "cart.$.quantity": quantity } },
                { new: true }
            );
            return res.status(200).json({
                success: response ? true : false,
                updateUser: response ? response : "Something went wrong."
            });
        } else {
            // Nếu màu sắc khác, thêm sản phẩm mới vào giỏ hàng
            const response = await User.findByIdAndUpdate(
                _id,
                { $push: { cart: { product: pid, quantity, color } } },
                { new: true }
            );
            return res.status(200).json({
                success: response ? true : false,
                 updateUser: response ? response : "Something went wrong."
            });
        }
    } else {
        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào giỏ
        const response = await User.findByIdAndUpdate(
            _id,
            { $push: { cart: { product: pid, quantity, color } } },
            { new: true }
        );
        return res.status(200).json({
            success: response ? true : false,
            updateUser: response ? response : "Something went wrong."
        });
    }
});



module.exports = {register, finalRegister,login, getCurrent, refreshAccessToken, logout, forgotPassword, resetToken, getUsers, deleteUser, updateUser, updateUserByAdmin, updateUserAddress, updateCart}