// blog controller logic for blog
//
const services = require("../services/blog");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// create blog
const createBlog = async (req, res) => {
  const blog = await services.createBlog(req.body);
  if (blog.errors) {
    return res
      .status(400)
      .send({ message: "Blog can NOT created", error: blog.errors });
  }
  if (blog) {
    return res.status(200).send({ message: "Blog created", blog });
  }
};

// get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await services.getAllBlogs();
    res.status(200).send({ message: "All blogs", blogs });
  } catch (error) {
    res.status(400).send({ message: "Error", error });
  }
};

// get blog
const getBlog = async (req, res) => {
  try {
    const blog = await services.getBlog(req.body);
    res.status(200).send({ message: "Blog", blog });
  } catch (error) {
    res.status(400).send({ message: "Error", error });
  }
};

// update blog
const updateBlog = async (req, res) => {
  const blog = await services.updateBlog(req.body);
  if (blog.errors) {
    return res
      .status(400)
      .send({ message: "Blog can NOT updated", error: blog.errors });
  }
  if (blog) {
    return res.status(200).send({ message: "Blog updated", blog });
  }
};

// delete blog
const deleteBlog = async (req, res) => {
  const blog = await services.deleteBlog(req.body);
  if (blog.errors) {
    return res
      .status(400)
      .send({ message: "Blog can NOT deleted", error: blog.errors });
  }
  if (blog) {
    return res.status(200).send({ message: "Blog deleted", blog });
  }
};

// publish blog
const publishBlogById = async (req, res) => {
  const blog = await services.publishBlogById(req.body);
  if (!blog) {
    return res.status(400).send({ message: "Blog can NOT published" });
  }
  if (blog) {
    return res.status(200).send({ message: "Blog published!", blog });
  }
};

// get blog by id
const getBlogById = async (req, res) => {};

// get user blog
const getUserBlog = async (req, res) => {
  const { id } = req.user;
  const data = await services.getUserBlog(id);

  if (!data) {
    return res.status(400).send({ message: "Can not get users blogs! " });
  }
  if (data) {
    return res.status(200).send({ message: "All blogs of Users: ", data });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
  publishBlogById,
  getBlogById,
  getUserBlog,
};
