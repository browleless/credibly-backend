import { BaseRepo } from './BaseRepo';
import { Transaction, WhereOptions } from 'sequelize';
import { AwardeeGroup } from '../entities';
import { sequelize } from '../sequelize';

export class AwardeeGroupRepo extends BaseRepo<AwardeeGroup> {

  constructor() {
    super(sequelize, AwardeeGroup);
  }

  async findById(id: number): Promise<AwardeeGroup> {
    const where: WhereOptions = { id };
    return this.findOne({ where });
  }

  async findByIds(ids: number[]): Promise<AwardeeGroup[]> {
    const where: WhereOptions = { id: ids };
    return this.findAll({ where });
  }

  async findByOrganisationId(organisationId: number): Promise<AwardeeGroup[]> {
    const where: WhereOptions = { organisationId };
    return this.findAll({ where });
  }

  async bulkDestroyById(id: number, transaction: Transaction): Promise<number> {
    const where: WhereOptions = { id };
    return this.bulkDestroy(where, transaction);
  }

}
