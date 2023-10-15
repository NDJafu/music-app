const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const headers = req.headers["authorization"];

  if (!headers) return res.sendStatus(401);

  const token = headers.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.user = decoded;
    next();
  });
};

module.exports = authenticateUser;
