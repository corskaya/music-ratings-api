const jwt = require("jsonwebtoken");
const User = require("../db/models/User");

const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error("Please login");
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).json({
      status: "Failed",
      message: e.message,
    });
  }
};

module.exports = authenticate;
