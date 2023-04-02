const yup = require("yup");

const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Content is required"),
});

module.exports = { blogSchema };
