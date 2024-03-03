import * as bcrypt from 'bcryptjs';
import { PASSWORD_HASH_SALT } from '../constants';

export const hashPassword = (password: string): string =>
  bcrypt.hashSync(password, PASSWORD_HASH_SALT);

export const comparePassword = (
  password: string,
  hashedPassword: string,
): boolean => bcrypt.compareSync(password, hashedPassword);
