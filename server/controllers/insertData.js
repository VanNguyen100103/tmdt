const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require("slugify");

const fn = async (product) => {
  await Product.create({
    title: product?.title,
  })
}


const insertProduct = asyncHandler(async (req, res) => {
  
}
)