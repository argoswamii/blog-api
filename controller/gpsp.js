const Post = require("../models/Blog.js");

//get post
exports.getPosts = async (req, res) => {
  try {
    const postblog = await Post.find();

    res.status(200).json(postblog);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/// creat a post
exports.createPost = async (req, res) => {
  const { title, content, createdAt, author, tags } = req.body;

  const newPost = new Post({
    title,
    content,
    createdAt,
    author,
    tags,
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//get post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const postblog = await Post.findById(id);

    if (!postblog) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(postblog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a post

// exports.updatePost = async (req, res) => {
//   const { id } = req.params;
//   const { comment } = req.body;

//   try {
//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { comment },
//       { new: true }
//     );
//     if (!updatedPost) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     res.status(200).json(updatedPost);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

////push comment
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    post.comment.push(comment); // add the new comment to the comments array

    const updatedPost = await post.save(); // save the updated post to the database

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
