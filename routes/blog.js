// GET public & protected resources
const router = require("express").Router();

const userAuthenticate = require("../middlewares/userAuthenticate");

const {
  createBlog,
  getBlog,
  getBlogById,
  publishBlogById,
  deleteBlog,
  getUserBlog,
} = require("../controllers/blog")

router.route("/get").get(getBlog);
router.route("/user").get(userAuthenticate, getUserBlog);
router.route("/get/:id").get(getBlogById);
router.route("/publish").put(publishBlogById);
router.route("/delete").delete(userAuthenticate, deleteBlog);
router.route("/create").post(userAuthenticate, createBlog);

module.exports = router;
