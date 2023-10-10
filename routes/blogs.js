const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// instead of creating different http meth we could do this and chain the different http methods
// get and post have the same endpoint
router.route("/").get(getAllBlogs).post(createBlog);
// view one, delete one , update one all have the same end point
router.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog);

module.exports = router;
