const BlogCategory = require('../models/blogCategory');
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const response = await BlogCategory.create(req.body)
  return res.status(200).json({
    success: response ? true : false,
    createdCategory: response ? response : "Can't create new blog-category."
  })
})

const getCategories = asyncHandler(async (req, res)=>{
    const response = await BlogCategory.find().select("title _id")
    return res.status(200).json({
        success: response ? true : false,
        blogCategories: response ? response : "Can't get blog-categories."
    })
})

const updateCategory = asyncHandler(async (req, res)=>{
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {new : true})
    return res.status(200).json({
        success: response ? true : false,
        updatedCategory: response ? response : "Can't update blog-category"
    })
})

const deleteCategory = asyncHandler(async (req, res)=>{
    const {bcid} = req.params
    const response = await BlogCategory.findByIdAndDelete(bcid)
    return res.status(200).json({
        success: response ? true : false,
        deletedCategory: response ? response : "Can't delete blog-category"
    })
})


module.exports = {createCategory, getCategories, updateCategory, deleteCategory}