import * as crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();

export interface SaltAndHash {
  salt: string,
  password: string,
}

export class AuthUtils {
  private static generateSalt(
    saltRounds: number,
  ): string {
    return crypto.randomBytes(saltRounds).toString('hex');
  }

  private static generatePwdHash(
    password: string,
    salt: string,
  ): string {
    return crypto.createHash('sha256')
      .update(password)
      .update(crypto.createHash('sha256')
      .update(salt, 'hex').digest('hex'))
      .digest('hex');
  }

  public static getSaltAndHash(
    password: string
  ): SaltAndHash {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = AuthUtils.generateSalt(saltRounds);

    const hash = AuthUtils.generatePwdHash(
      password,
      salt,
    );
    return {
      salt,
      password: hash
    }
  }

  public static verifyHash(
    storedHash: string,
    storedSalt: string,
    passwordToCheck: string,
  ): boolean {
    const hash = AuthUtils.generatePwdHash(
      passwordToCheck,
      storedSalt,
    );

    return storedHash === hash;
  }
}
