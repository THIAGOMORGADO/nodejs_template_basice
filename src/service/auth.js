/**
 * Obs para criptografar sem erro siga com esta na lina 8
 */

import bcrypt  from 'bcryptjs';

export const createPasswordHash = async (password) => bcrypt.hash(password, 8);

export const checkPassword = (user, password) => bcrypt.compare(password, user.password);

console.log(checkPassword)