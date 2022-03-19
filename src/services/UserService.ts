import { User } from "../entities";
import { AccountType, ApproveUserReq, UpdateUserReq } from "../models";
import { userRepo } from "../repositories";
import { sequelize } from "../sequelize";
import bcrypt from 'bcrypt';

export class UserService {

  async createAccounts(): Promise<void> {

    const transaction = await sequelize.getTransaction();

    try {

      const users: Partial<User>[] = [];

      users.push({
        name: 'Credibly Admin',
        email: 'admin@credibly.com',
        hashedPassword: await bcrypt.hash('password', 10),
        accountType: AccountType.ADMIN,
        approved: true
      })

      users.push({
        name: 'Organisation 1',
        email: 'organisation1@mail.com',
        hashedPassword: await bcrypt.hash('password', 10),
        accountType: AccountType.ORGANISATION,
        uen: 'Dummy UEN',
        walletAddress: 'Dummy Wallet Address 1',
        approved: true
      })

      users.push({
        name: 'User 1',
        email: 'user1@mail.com',
        hashedPassword: await bcrypt.hash('password', 10),
        accountType: AccountType.AWARDEE,
        walletAddress: 'Dummy Wallet Address 2',
        approved: true
      })

      await userRepo.bulkCreate(users, transaction);

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

      if (approver.accountType !== AccountType.ADMIN) {
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

  async getPendingApprovals(): Promise<User[]> {

    try {
      const pendingApprovals = await userRepo.findByApproved(false, { includes: ['documents'] });

      return pendingApprovals;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

}
