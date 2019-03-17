import jwt from "jsonwebtoken";

const verifyAdmin = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === "undefined" || !bearerHeader) {
    res.status(403).json({ status: 403, error: "unauthorized access. login or register" });
  } else {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(400).json({ status: 400, error: "failed to decode the token or it has expired" });
      } else if (decoded.response.isadmin === true) {
        req.userId = decoded.response.id;
        next();
      } else if (decoded.response.isadmin === false) {
        res.status(403).json({
          status: 403,
          error: "not admin. access denied",
        });
      } else {
        res.status(403).json({
          status: 403,
          error: "access denied",
        });
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === "undefined" || !bearerHeader) {
    res.status(403).json({ status: 403, error: "unauthorized access. login or register" });
  } else {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(403).json({ status: 403, error: "failed to decode the token or it has expired" });
      } else if (decoded.response.isadmin === false) {
        req.userId = decoded.response.id;
        next();
      } else if (decoded.response.isadmin === true) {
        req.userId = decoded.response.id;
        next();
      } else {
        res.status(403).json({
          status: 403,
          error: "access denied",
        });
      }
    });
  }
};

export default {
  verifyAdmin,
  verifyUser,
};
