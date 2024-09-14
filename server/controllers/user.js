const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const {generateAccessToken, generateRefreshToken} = require("../middlewares/jwt.js")
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    if(!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }
    const user = await User.findOne({email})
    if(user) throw new Error("User existed!")
    else{
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: true,
            mes: newUser ? 'Register is successfully. Please go to login!' : 'Something went wrong!'
        })
    }
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
        const {password, role, ...userData} = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const refreshToken = generateRefreshToken(response._id)
        await User.findByIdAndUpdate(response._id, {refreshToken}, {new: true})
        res.cookie("refreshToken", refreshToken, {
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
        success: true,
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
    await User.findByIdAndUpdate({refreshToken: cookie.refreshToken}, {refreshToken: ""}, {new: true})
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: true
    })
})

module.exports = {register, login, getCurrent, refreshAccessToken}