import { env } from "../env";
import { AccountType, LoginReq, LoginRes, RegisterReq } from "../models";
import { userRepo } from "../repositories";
import { sequelize } from "../sequelize";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService {

  async register(req: RegisterReq): Promise<number> {

    const transaction = await sequelize.getTransaction();

    try {
      const { name, email, password, uen, walletAddress, accountType } = req;

      // TODO check for constraint violations etc.

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await userRepo.create({
        name,
        email,
        hashedPassword,
        uen,
        walletAddress,
        accountType,
        approved: accountType !== AccountType.ORGANISATION ? true : false
      }, transaction);

      await transaction.commit();

      return newUser.id;

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async login(req: LoginReq): Promise<LoginRes> {
    try {
      const { email, password, walletAddress } = req;

      const user = await userRepo.findByEmail(email);

      if (!user) {
        throw new Error('No account associated with provided email!');
      }

      if (!user.approved) {
        throw new Error('Account is not approved yet!');
      }

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

      if (!passwordMatch) {
        throw new Error('Invalid password for account!');
      }

      if (!!user.walletAddress && user.walletAddress !== walletAddress) {
        throw new Error('Please use the correct MetaMask wallet address to access this account!');
      }

      const token = jwt.sign(
        { user_id: email },
        env.jwt.secret,
        { expiresIn: "24h" }
      );

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        walletAddress: user.walletAddress,
        accountType: user.accountType,
        approved: user.approved,
        uen: user.uen,
        token
      };

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
}
