const ProductCategory = require('../models/productCategory');
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body)
  return res.status(200).json({
    success: response ? true : false,
    createdCategory: response ? response : "Can't create new product-category."
  })
})

const getCategories = asyncHandler(async (req, res)=>{
    const response = await ProductCategory.find()
    return res.status(200).json({
        success: response ? true : false,
        prodCategories: response ? response : "Can't get product-categories."
    })
})

const updateCategory = asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const { brand } = req.body;
    const brands = brand.split(",")

    // Use $set to replace the existing brand array with the new one
    const response = await ProductCategory.findByIdAndUpdate(
        pcid,
        { $set: { brand: brands } }, // Replace the entire brand array
        { new: true } // Return the updated document
    );

    return res.status(200).json({
        success: response ? true : false,
        updatedCategory: response ? response : "Can't update product-category"
    });
});


const deleteCategory = asyncHandler(async (req, res)=>{
    const {pcid} = req.params
    const response = await ProductCategory.findByIdAndDelete(pcid)
    return res.status(200).json({
        success: response ? true : false,
        deletedCategory: response ? response : "Can't delete product-category"
    })
})

const uploadImageCategory = asyncHandler(async (req, res) => {
    const {pcid} = req.params
    if(!req.file) throw new Error("Missing input")
    const response = await ProductCategory.findByIdAndUpdate(pcid,{$set: {image: req.file.path}}, {new: true})
    console.log(req.file)
    return res.status(200).json({ 
        status: response ? true :false,
        updatedBlog: response ? response : "Can't upload image product-category.",
    })
})

module.exports = {createCategory, getCategories, updateCategory, deleteCategory, uploadImageCategory}