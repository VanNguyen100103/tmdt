
const Product = require('../models/product');
const asyncHandler = require("express-async-handler");
const slugify = require('slugify');


const createProduct = asyncHandler(async (req, res) => {
    if(Object.keys(req.body).length === 0) throw new Error("Missing inputs");
    if(req.body || req.body.title) req.body.slug = slugify(req.body.title);
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : "Can't create new product.",
    })
})
const getProduct = asyncHandler(async (req,res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : "Can't get product.",
    })
})

const getProducts = asyncHandler(async (req, res) => {
    const queries = { ...req.query };
    const excludeFields = ["limit", "sort", "page", "fields"];
    excludeFields.forEach(el => delete queries[el]);
    
    let queryString = JSON.stringify(queries);
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`);
    const formatedQueries = JSON.parse(queryString);
    
    if (queries?.title) formatedQueries.title = { $regex: queries.title, $options: 'i' };
    let queryCommand = Product.find(formatedQueries);
    if(req.query.sort){
        const sortBy = req.query.sort.split(",").join(" ");
        queryCommand = queryCommand.sort(sortBy);
    }
    if(req.query.fields){
        const fields = req.query.fields.split(",").join(" ");
        queryCommand = queryCommand.select(fields);
    }
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page-1)*limit
    queryCommand.skip(skip).limit(limit)
    queryCommand.exec(async (err, response) => {
      if (err) throw new Error(err.message);
      const counts = await Product.find(formatedQueries).countDocuments()
      return res.status(200).json({
        success: response ? true : false,
        products: response ? response : "Can't get products.",
        counts
        });
    });

});


const updateProduct = asyncHandler(async (req,res)=>{
    const { pid } = req.params
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, {new: true})
    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct: updateProduct ? updateProduct : "Can't update product.",
    })
})

const deleteProduct = asyncHandler(async (req,res)=>{
    const { pid } = req.params
    const deleteProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deleteProduct ? true : false,
        deleteProduct: deleteProduct ? deleteProduct : "Can't update product.",
    })
})

const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user;  // Lấy _id của người dùng từ req.user
    const { star, comment, pid } = req.body;

    if (!star || !pid) throw new Error("Missing inputs");

    const product = await Product.findById(pid);
    if (!product) throw new Error("Product not found");

    // Kiểm tra nếu người dùng đã đánh giá
    const alreadyRatingIndex = product.ratings.findIndex(
        (rating) => rating.postedBy.toString() === _id.toString()
    );

    if (alreadyRatingIndex !== -1) {
        // Đã tồn tại đánh giá, tiến hành cập nhật
        product.ratings[alreadyRatingIndex].star = star;
        product.ratings[alreadyRatingIndex].comment = comment;
    } else {
        // Chưa có đánh giá, tiến hành thêm mới
        product.ratings.push({ star, comment, postedBy: _id });
    }
    const ratingCount = product.ratings.length;
    const sumRatings = product.ratings.reduce((sum,el)  => sum + el.star,0)
    product.totalRatings = Math.round(sumRatings * 10 / ratingCount ) / 10
    // Lưu sản phẩm đã cập nhật
    await product.save();

    return res.status(200).json({ status: true, updateProduct: product});
});

const uploadImagesProduct = asyncHandler(async (req, res) => {
    const {pid} = req.params
    if(!req.files) throw new Error("Missing inputs")
    const response = await Product.findByIdAndUpdate(pid, {$push: {images: {$each: req.files.map(el=>el.path)}}}, {new: true})
    console.log(req.files)
    return res.status(200).json({ 
        status: response ? true :false,
        updatedProduct: response ? response : "Can't upload images products.",
    })
})

module.exports = {createProduct, getProduct, getProducts, updateProduct, deleteProduct, ratings, uploadImagesProduct}