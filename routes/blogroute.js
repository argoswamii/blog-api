const express = require("express");
const router = new express.Router();
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
} = require("../controller/gpsp");

router.get("/posts", getPosts);
router.post("/posts", createPost);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", updatePost);
router.post("/posts/:id", updatePost);

module.exports = router;
