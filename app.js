const { blogRoute, userRoute } = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const loggerMiddleware = require("./middlewares/logger");
const error = require("./utils/error");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const { stream } = require("winston");

require("dotenv").config(); // Linux otomatik okur

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :body",
    {
      stream: fs.createWriteStream(path.join(__dirname, "access.log"), {
        flags: "a",
      }),
    }
  )
);

// log all requests to access.log
// app.use(morgan('common', {
//   stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a'})
// }))

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`);
    fs.appendFile(path.join(__dirname, 'access.log'), `response time: ${elapsed}ms \n`, (err) => {
      if (err) next(err);
    }
    )
  });

  next();
});

app.use(loggerMiddleware);

app.use("/user", userRoute);

app.use("/blog", blogRoute);

app.use((req, res, next) => {
  const newError = new error(404, "NotxFound!");
  next(newError);
});

app.use(errorHandler);

// Mongoose connection settings
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_URL)
  .then(() => {
    console.log("connected to mongodb successfully");
  })
  .catch((err) => {
    console.log(err);
    console.log("error occurred");
  });
// TODO : errorHandler middleware

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
