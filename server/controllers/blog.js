const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const createNewBlog = asyncHandler(async (req, res)=> {
    const {title, description, category} = req.body;
    if(!title || !description || !category) throw new Error("Missing inputs.");
    const response = await Blog.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : "Can't create new blog"
    })
});

const updateBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error("Missing inputs.")
    const response = await Blog.findByIdAndUpdate(bid, req.body, {new: true})
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : "Can't update blog."
    })
})

const getBlogs = asyncHandler(async (req, res)=>{
    const response = await Blog.find()
    return res.status(200).json({
        success: response ? true : false,
        blogs: response ? response : "Can't get blogs."
    })
})

const likeBlog = asyncHandler(async (req, res) => {
    // Ensure _id is extracted correctly
    let _id = req.user._id || req.user; // In case req.user is an object with _id property
    if (typeof _id !== 'string') _id = _id.toString(); // Convert _id to string if it's not

    // Ensure _id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            success: false,
            mes: "Invalid user ID"
        });
    }

    const { bid } = req.params;
    if (!bid) throw new Error("Missing inputs");

    const blog = await Blog.findById(bid);
    if (!blog) throw new Error("Blog not found");

    console.log("User ID:", _id); // Debugging
    console.log("Blog:", blog); // Debugging

    const alreadyDisliked = blog.dislikes.some(el => el.toString() === _id);
    const alreadyLiked = blog.likes.some(el => el.toString() === _id);

    let response;

    if (alreadyDisliked) {
        // If the user already disliked the post, remove the dislike and add a like
        response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { dislikes: _id }, $addToSet: { likes: mongoose.Types.ObjectId(_id) } }, // Ensure _id is ObjectId
            { new: true }
        );
    } else if (alreadyLiked) {
        // If the user already liked the post, remove the like (toggle off)
        response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { likes: _id } }, // Remove the like
            { new: true }
        );
    } else {
        // If the user neither liked nor disliked, add a like
        response = await Blog.findByIdAndUpdate(
            bid,
            { $addToSet: { likes: mongoose.Types.ObjectId(_id) } }, // Ensure _id is ObjectId
            { new: true }
        );
    }

    return res.status(200).json({
        success: response ? true : false,
        result: response
    });
});

const dislikeBlog = asyncHandler(async (req, res) => {
    // Ensure _id is extracted correctly
    let _id = req.user._id || req.user; // In case req.user is an object with _id property
    if (typeof _id !== 'string') _id = _id.toString(); // Convert _id to string if it's not

    // Ensure _id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({
            success: false,
            mes: "Invalid user ID"
        });
    }

    const { bid } = req.params;
    if (!bid) throw new Error("Missing inputs");

    const blog = await Blog.findById(bid);
    if (!blog) throw new Error("Blog not found");

    console.log("User ID:", _id); // Debugging
    console.log("Blog:", blog); // Debugging

    const alreadyDisliked = blog.dislikes.some(el => el.toString() === _id);
    const alreadyLiked = blog.likes.some(el => el.toString() === _id);

    let response;

    if (alreadyLiked) {
        // If the user already liked the post, remove the like and add a dislike
        response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { likes: _id }, $addToSet: { dislikes: mongoose.Types.ObjectId(_id) } }, // Ensure _id is ObjectId
            { new: true }
        );
    } else if (alreadyDisliked) {
        // If the user already disliked the post, remove the dislike (toggle off)
        response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { dislikes: _id } }, // Remove the dislike
            { new: true }
        );
    } else {
        // If the user neither liked nor disliked, add a dislike
        response = await Blog.findByIdAndUpdate(
            bid,
            { $addToSet: { dislikes: mongoose.Types.ObjectId(_id) } }, // Ensure _id is ObjectId
            { new: true }
        );
    }

    return res.status(200).json({
        success: response ? true : false,
        result: response
    });
});


const getBlog = asyncHandler(async (req, res) => {
  const {bid} = req.params
  const blog = await Blog.findByIdAndUpdate(bid, {$inc:{numberViews: 1}}, {new: true}).populate('likes', "firstname lastname").populate('dislikes', "firstname lastname");
  return res.status(200).json({
    success: blog ? true : false,
    result: blog 
  })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params
    const blog = await Blog.findByIdAndDelete(bid)
    return res.status(200).json({
      success: blog ? true : false,
      result: blog || "Something went wrong."
    })
})

const uploadImageBlog = asyncHandler(async (req, res) => {
    const {bid} = req.params
    if(!req.file) throw new Error("Missing input")
    const response = await Blog.findByIdAndUpdate(bid,{image: req.file.path}, {new: true})
    console.log(req.file)
    return res.status(200).json({ 
        status: response ? true :false,
        updatedBlog: response ? response : "Can't upload image blog.",
    })
})


module.exports = {createNewBlog, updateBlog, getBlogs, likeBlog, dislikeBlog, getBlog, deleteBlog, uploadImageBlog}