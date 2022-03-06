import { BaseRepo } from './BaseRepo';
import { Transaction, WhereOptions } from 'sequelize';
import { AwardeeGroupAwardeeIds } from '../entities';
import { sequelize } from '../sequelize';

export class AwardeeGroupAwardeeIdsRepo extends BaseRepo<AwardeeGroupAwardeeIds> {

  constructor() {
    super(sequelize, AwardeeGroupAwardeeIds);
  }

  async findByAwardeeGroupIds(awardeeGroupIds: number[]): Promise<AwardeeGroupAwardeeIds[]> {
    const where: WhereOptions = { awardeeGroupId: awardeeGroupIds };
    return this.findAll({ where });
  }

  async findByAwardeeGroupIdAndAwardeeId(awardeeGroupId: number, awardeeIds: number[]): Promise<AwardeeGroupAwardeeIds[]> {
    const where: WhereOptions = { awardeeGroupId, awardeeId: awardeeIds };
    return this.findAll({ where });
  }

  async bulkDestroyByAwardeeId(awardeeId: number, transaction: Transaction): Promise<number> {
    const where: WhereOptions = { awardeeId };
    return this.bulkDestroy(where, transaction);
  }

  async bulkDestroyByAwardeeGroupId(awardeeGroupId: number, transaction: Transaction): Promise<number> {
    const where: WhereOptions = { awardeeGroupId };
    return this.bulkDestroy(where, transaction);
  }

}
