import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

class AuthHelper {
  static generateToken(user) {
    return jwt.sign(
      user,
      process.env.SECRET_KEY,
      { expiresIn: '10d' }
    );
  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static compareHashedPasswords(unHashedPassword, hashedPassword) {
    return bcrypt.compareSync(unHashedPassword, hashedPassword);
  }
}

export default AuthHelper;
