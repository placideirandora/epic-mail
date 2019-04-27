import jwt from 'jsonwebtoken';

/**
 * verify if the user trying to access the specified endpoint is admin
 * and grant them access by passing the request to the next endpoint
 * or denies it if they are not
 * @param {object} req
 * @param {object} res
 * @param {request} next
 */
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

/**
 * verify it the user trying to access the endpoint is registered
 * and grant them access by passing the request to the next endpoint
 * or denies it if they are not
 * @param {object} req
 * @param {object} res
 * @param {request} next
 */
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
