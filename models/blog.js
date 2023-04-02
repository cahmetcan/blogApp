const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Users',
    default: null,
  },
  state: {
    type: String,
    default: "draft",
    enum: ["draft", "published"],
  },
  body: {
    type: String,
    required: true,
  },
});
const blog = mongoose.model("blog", blogSchema);

module.exports = blog;
