/** @format */
import jwt from 'jsonwebtoken';
// 颁布令牌
export const generateToken = function (uid: number, scope: number) {
  const secretKey = global.$config.security.secretKey;
  const expiresIn = global.$config.security.expiresIn;
  const token = jwt.sign(
    {
      uid,
      scope,
    },
    secretKey,
    {
      expiresIn: expiresIn,
    }
  );
  return token;
};
