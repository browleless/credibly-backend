import { BaseRepo } from './BaseRepo';
import { WhereOptions } from 'sequelize';
import { Awardee } from '../entities';
import { sequelize } from '../sequelize';

export class AwardeeRepo extends BaseRepo<Awardee> {

  constructor() {
    super(sequelize, Awardee);
  }

  async findById(id: number): Promise<Awardee> {
    const where: WhereOptions = { id };
    return this.findOne({ where });
  }

  async findByEmail(email: string): Promise<Awardee> {
    const where: WhereOptions = { email };
    return this.findOne({ where });
  }

  async findByIds(ids: number[]): Promise<Awardee[]> {
    const where: WhereOptions = { id: ids };
    return this.findAll({ where });
  }

  async findByOrganisationId(organisationId: number): Promise<Awardee[]> {
    const where: WhereOptions = { organisationId };
    return this.findAll({ where });
  }

  async findByOrganisationIdAndEmail(organisationId: number, email: string): Promise<Awardee> {
    const where: WhereOptions = { organisationId, email };
    return this.findOne({ where });
  }

}
