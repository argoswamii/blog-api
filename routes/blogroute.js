const express = require("express");
const router = new express.Router();
const {
  getPosts,
  createPost,
  getPostById,
  updatePost,
} = require("../controller/gpsp");

const { singup, login, protectRoute } = require("../controller/userauth");

router.get("/posts", getPosts);
router.post("/posts", protectRoute, createPost);
router.get("/posts/:id", getPostById);
router.put("/posts/:id", protectRoute, updatePost);
router.post("/posts/:id", protectRoute, updatePost);

//Auth

router.post("/singup", singup);
router.post("/login", login);

module.exports = router;
