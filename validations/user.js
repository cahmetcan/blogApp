const yup = require("yup");

const signUpSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().email("Enter a proper email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a proper email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

module.exports = { signUpSchema, loginSchema };