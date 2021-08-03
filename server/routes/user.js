import express from 'express';

import user from '../middleware/validate';
import UserController from '../controllers/user';
import authentication from '../middleware/authenticate';

const router = express.Router();

router.post(
  '/auth/signup',
  user.validateRegistration,
  UserController.registerUser
);

router.post('/auth/login', user.validateLogin, UserController.loginUser);

router.get('/users', authentication.verifyAdmin, UserController.retrieveUsers);

router.get(
  '/users/:id',
  authentication.verifyAdmin,
  user.validateUserId,
  UserController.retrieveUser
);

router.delete(
  '/users/:id',
  authentication.verifyAdmin,
  user.validateUserId,
  UserController.deleteUser
);

router.post(
  '/auth/reset',
  user.validateEmailAddr,
  UserController.resetPassword
);

router.get(
  '/auth/reset',
  authentication.verifyAdmin,
  UserController.retrievePassResetUsers
);

export default router;
