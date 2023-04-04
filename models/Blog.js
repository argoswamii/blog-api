const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  comment: {
    //  type: String
    type: [String], // changed to an array of strings
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tags: [String],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
