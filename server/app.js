const express = require("express");
const app = express();

const errorMiddleware = require("./middeleware/errorMideleware.js");
const cors = require("cors");
const imageRoutes = require("./routes/createImg.js");

app.use(express.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", imageRoutes);

app.all("*", (req, res, next) => {
  const error = new Error(`URL ${req.url} not found`);
  error.status = 404;
  next(error);
});

app.use(errorMiddleware);

module.exports = app;
