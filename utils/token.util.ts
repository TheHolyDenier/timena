import { User } from '.prisma/client';
import jsonwebtoken from 'jsonwebtoken';

export const createToken = (user: User) => {
  const token = jsonwebtoken.sign(
    { id: user.id, username: user.username },
    String(process.env.SECRET_KEY),
    {
      expiresIn: '120d'
    }
  );

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 120);

  return {
    token,
    expiresAt
  };
};

export const verifyToken = (user: User) => {
  const now = new Date();
  if (
    !user ||
    !user.accessToken ||
    !user.expiresAt ||
    user.expiresAt.getTime() < now.getTime()
  ) {
    return false;
  }

  return jsonwebtoken.verify(user.accessToken, String(process.env.SECRET_KEY));
};
