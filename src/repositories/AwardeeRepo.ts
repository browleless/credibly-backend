import { BaseRepo } from './BaseRepo';
import { WhereOptions } from 'sequelize';
import { Awardee, User } from '../entities';
import { sequelize } from '../sequelize';
import { SearchAwardeeRes } from '../models';

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

  async findByNameLikeOrEmailLike(query: string): Promise<SearchAwardeeRes[]> {
    const sql = `
      SELECT awardee.id awardeeId, user.name organisationName, awardee.name awardeeName, awardee.email awardeeEmail 
      FROM ${Awardee.tableName} awardee
      LEFT JOIN ${User.tableName} user ON awardee.organisationId = user.id
      WHERE LOWER(awardee.name) LIKE :query OR LOWER(awardee.email) LIKE :query
    `;

    return this.select(sql, { query: `%${query}%` });
  }

}
