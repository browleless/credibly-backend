import { User } from "../entities";
import { ApproveUserReq, UpdateUserReq } from "../models";
import { userRepo } from "../repositories";
import { sequelize } from "../sequelize";
import bcrypt from 'bcrypt';

export class UserService {

  async createAdmin(): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {

      const email = 'admin@credibly.com';
      const hashedPassword = await bcrypt.hash('password', 10);

      await userRepo.create({
        email,
        hashedPassword,
        accountType: 0,
        approved: true,
      }, transaction);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  async approveUsers(req: ApproveUserReq): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {
      const  { approverId, userIds } = req;

      const approver = await userRepo.findById(approverId);

      if (!approver) {
        throw new Error('Approver account does not exist!');
      }

      if (approver.accountType !== 0) {
        throw new Error('Only administrator can approve accounts!');
      }

      // TODO other constraint validations

      const users = await userRepo.findByIds(userIds, { updateLock: transaction });

      const promises: Promise<User>[] = [];
      users.forEach((user: User) => {
        user.approved = true;
        promises.push(userRepo.save(user, transaction));
      });

      await Promise.all(promises);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

  
  async updateUser(req: UpdateUserReq): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {
      const  { userId, email, password, walletAddress } = req;

      const user = await userRepo.findById(userId, { updateLock: transaction });

      if (!user) {
        throw new Error('User account does not exist!');
      }

      // TODO other constraint validations

      if (!!password) {
        const newHashedPassword = await bcrypt.hash(password, 10);
        user.hashedPassword = newHashedPassword;
      }

      if (!!email) {
        user.email = email;
      }

      if (!!walletAddress) {
        user.walletAddress = walletAddress;
      }

      await userRepo.save(user, transaction);

      await transaction.commit();

    } catch (err) {
      console.log(err.message);
      await transaction.rollback();
      throw err;
    }
  }

}
