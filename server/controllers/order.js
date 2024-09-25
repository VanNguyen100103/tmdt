const Order = require('../models/order');
const User = require('../models/user');
const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

const createOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupon } = req.body;
    
    const userCart = await User.findById(_id)
        .select("cart")
        .populate('cart.product', "title price");
    
    const products = userCart?.cart?.map(el => ({
        product: el.product._id,
        count: el.quantity,
        color: el.color,
    }));
 
    // Tính tổng giá trị đơn hàng
    let total = userCart?.cart?.reduce((sum, el) => {
        return sum + el.quantity * el.product.price; // Sử dụng price từ product
    }, 0) || 0; // Nếu không có giá trị thì mặc định là 0
    const createData = await Order.create({ products, total, orderBy: _id });
    // Áp dụng coupon nếu có;
    if (coupon) {
        const selectedCoupon = await Coupon.findById(coupon)
        total = (total * (1 - +selectedCoupon.discount / 100) / 1000).toFixed(1) * 1000 ;
        createData.coupon = coupon;
        createData.total = total;
    }
    
    // Tạo đơn hàng
    const response = await Order.create(createData);
    
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : "Something went wrong.",
        userCart
    });
});

const updateStatus = asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;

    if (!status) throw new Error("Missing input.");
    
    try {
        const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
        return res.status(200).json({
            success: response ? true : false,
            response: response ? response : "Something went wrong.",
        });
    } catch (error) {
        console.error('Error updating status:', error);
        return res.status(500).json({ success: false, response: "Internal server error." });
    }
});

const getUserOrder = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const response = await Order.find({orderBy: _id});
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong.",
    });  
});

const getOrders = asyncHandler(async (req, res) => {

    const response = await Order.find();
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong.",
    });  
});


module.exports = { createOrder, updateStatus, getUserOrder, getOrders };


