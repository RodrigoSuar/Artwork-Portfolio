const jwt = require("jsonwebtoken");
const config = require("./config");


const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    const decoded = jwt.verify(token, config.SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "token invalid" });
  }
};

module.exports = authMiddleware;