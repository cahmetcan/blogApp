// Handle controller logic for blog
//
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find();
    return blogs;
  } catch (error) {
    return error.message;
  }
};

const createBlog = async (mbody) => {
  const { title, body } = mbody;

  try {
    const blog = await Blog.create({
      title: title,
      body: body,
    });
    return blog;
  } catch (error) {
    throw error;
  }
};

const deleteBlog = async (body) => {
  const id = body._id;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return false;
    return blog;
  } catch (error) {
    return error.message;
  }
};

const updateBlog = async (mbody) => {
  const id = body._id;
  const { title, body } = mbody;
  try {
    const blog = await Blog.findByIdAndUpdate(id, {
      title: title,
      body: body,
    });
    if (!blog) return false;
    return blog;
  } catch (error) {
    return error.message;
  }
};

const getBlog = async () => {
  try {
    console.log("get blog");
    const blog = await Blog.find({}).populate("author");
    return blog;
  } catch (error) {
    return error.message;
  }
};

const publishBlogById = async (mbody) => {
  const id = mbody._id;
  const { title, body } = mbody;
  try {
    const blog = await Blog.findByIdAndUpdate(id, {
      state: "published",
    });
    return blog;
  } catch (error) {
    return false;
  }
};

const getUserBlog = async (id) => {
  try {
    console.log("get user blog", id);
    const blog = await Blog.find({ author: id })
    console.log(blog);
    return blog;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
  getBlog,
  publishBlogById,
  getUserBlog,
};
