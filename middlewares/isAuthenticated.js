const jwt = require("jsonwebtoken");

/* jwt token verify */
const authenticationVerifier = (req, res, next) => {
  const authHeader = req.cookies.authToken;

  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      console.log("ERROR:", err);
      if (err) res.status(401).json("Invalid token");
      console.log("USER DECODED", user);
      console.log(req.user);
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

/* DO NOT USE */
const accessLevelVerifier = (req, res, next) => {
  authenticationVerifier(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to perform this task");
    }
  });
};

/* access_level_verifier('admin') */
const isAdminVerifier = (req, res, next) => {
  authenticationVerifier(req, res, () => {
    console.log("user: ", req.user);
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to perform this task");
    }
  });
};

module.exports = { authenticationVerifier, accessLevelVerifier, isAdminVerifier };
