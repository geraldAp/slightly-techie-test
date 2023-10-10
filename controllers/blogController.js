const express = require("express");
const { v4: uuidv4 } = require("uuid");

const blogsDb = {
  blogs: require("../model/blogs.json"),
  upDateBlogs: function (data) {
    this.blogs = data;
  },
};

// Function to save the blogs data to the JSON file

// get all posts
const getAllBlogs = (req, res) => {
  return res.status(201).json(blogsDb.blogs);
};
// get a single post
const getBlog = (req, res) => {
  const id = req.params.id; // Convert to string
  const blog = blogsDb.blogs.find((blog) => blog.id === id);
  if (!blog) {
    res.status(404).json({ message: "Sorry, no blog like this exists" });
    return;
  }
  res.json(blog);
};
// create a blog
const createBlog = async (req, res) => {
  const { title, author, body } = req.body;

  if (!title || !author || !body) {
    res.status(400).json({ message: "All fields are required" });
  }
  //   the v4 generates random ids
  const newBlog = {
    id: uuidv4(),
    title,
    author,
    body,
  };
  blogsDb.upDateBlogs([...blogsDb.blogs, newBlog]);
  return res.status(201).json(newBlog);
};
// update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, author, body } = req.body;
  const blog = blogsDb.blogs.find((blog) => blog.id === id);

  if (title) {
    blog.title = title;
  }
  if (author) {
    blog.author = author;
  }
  if (body) {
    blog.body = body;
  }
  return res.status(200).json(blog);
};
// delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "please provide the id" });
  }
  const blog = blogsDb.blogs.find((blog) => blog.id === id);
  if (!blog) {
    res.status(400).json({ message: "blog with" + id + "not found" });
    return;
  }
  const filteredBlogs = blogsDb.blogs.filter((blog) => blog.id !== id);
  blogsDb.upDateBlogs([...filteredBlogs]);

  res.json(blog);
};

module.exports = { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog };
