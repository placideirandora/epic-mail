import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined' || !bearerHeader) {
    res.status(403).json({ status: 403, error: 'unauthorized access. login or register' });
  } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(400).json({ status: 400, error: `${error.message}` });
      } else if (decoded.response.isadmin === true) {
        req.userEmail = decoded.response.email;
        next();
      } else if (decoded.response.isadmin === false) {
        res.status(403).json({
          status: 403,
          error: 'not admin. access denied',
        });
      } else {
        res.status(403).json({
          status: 403,
          error: 'access denied',
        });
      }
    });
  }
};

const verifyUser = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader === 'undefined' || !bearerHeader) {
    res.status(403).json({ status: 403, error: 'unauthorized access. login or register' });
  } else {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    jwt.verify(req.token, process.env.SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(403).json({ status: 403, error: `${error.message}` });
      } else if (decoded.response.isadmin === false) {
        req.userEmail = decoded.response.email;
        next();
      } else if (decoded.response.isadmin === true) {
        req.userEmail = decoded.response.email;
        next();
      } else {
        res.status(403).json({
          status: 403,
          error: 'access denied',
        });
      }
    });
  }
};

export default {
  verifyAdmin,
  verifyUser,
};
