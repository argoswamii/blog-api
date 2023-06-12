const User = require("../models/Usermodel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "WOLF";

exports.singup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    res.send({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).send({ message: "User Not Found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password Not Match" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.send({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).send({ message: "No token provided" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Invalid token" });
      }

      req.userId = decoded.userId; // Add the user ID to the request object
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
};
