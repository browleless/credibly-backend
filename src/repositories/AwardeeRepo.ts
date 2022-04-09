import { BaseRepo } from './BaseRepo';
import { WhereOptions } from 'sequelize';
import { Awardee, User } from '../entities';
import { sequelize } from '../sequelize';
import { AccountType, SearchAwardeeRes } from '../models';

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
    SELECT email, name FROM ${Awardee.tableName} awardee
    WHERE LOWER(awardee.name) LIKE :query OR LOWER(awardee.email) LIKE :query
    UNION
    SELECT email, name FROM ${User.tableName} user
    WHERE user.accountType IN (:accountTypes) AND (LOWER(user.name) LIKE :query OR LOWER(user.email) LIKE :query)
  `;

    return this.select(sql, { query: `%${query}%`, accountTypes: [AccountType.AWARDEE] });
  }

}
