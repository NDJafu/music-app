const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) return res.status(401).json("Unauthorized");

  const token = headers.split(" ")[1];

  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) return res.status(403).json("Forbidden");
    req.user = decoded;
    next();
  });
};

module.exports = authenticateUser;
