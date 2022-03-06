import { env } from "../env";
import { LoginReq, LoginRes, RegisterReq } from "../models";
import { userRepo } from "../repositories";
import { sequelize } from "../sequelize";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class AuthService {

  async register(req: RegisterReq): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {
      const  { email, password, uen, walletAddress, accountType } = req;

      // TODO check for constraint violations etc.

      const hashedPassword = await bcrypt.hash(password, 10);
      
      await userRepo.create({
        email,
        hashedPassword,
        uen,
        walletAddress,
        accountType,
        approved: accountType !== 1 ? true : false
      }, transaction);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async login(req: LoginReq): Promise<LoginRes> {    
    try {
      const  { email, password } = req;

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

      const token = jwt.sign(
        { user_id: email },
        env.jwt.secret,
        { expiresIn: "2h" }
      );

      return { 
        email: user.email, 
        walletAddress: user.walletAddress, 
        accountType: user.accountType, 
        approved: user.approved, 
        token 
      };

    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
}
