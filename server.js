// to allow usage of vars from .env
require("dotenv").config();
// importing express
const express = require("express");
// the blog route
const blogs = require("./routes/blogs");

const app = express();

// middleware
app.use(express.json()); // to be able to access json data

// accessing and using the routers
app.use("/api/blogs", blogs);

// incase of a bad route all for all req types
app.all("*", (req, res) => {
  res.status(404);
  // if the req accepts json response
  if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    // if not sent a text
    res.type("txt").send("404 not found");
  }
});
// the first condition is for the hosting platform that will be used
const PORT = process.env.PORT || 3500;
// listening to requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
