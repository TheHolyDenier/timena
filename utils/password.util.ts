import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (text: string) => {
  return bcrypt.hash(text, saltRounds);
};

export const comparePassword = async (text: string, hash: string) => {
  return bcrypt.compare(text, hash);
};
