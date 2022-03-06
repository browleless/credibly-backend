import { BaseRepo } from './BaseRepo';
import { WhereOptions } from 'sequelize';
import { CredentialTemplate } from '../entities';
import { sequelize } from '../sequelize';

export class CredentialTemplateRepo extends BaseRepo<CredentialTemplate> {

  constructor() {
    super(sequelize, CredentialTemplate);
  }

  async findById(id: number): Promise<CredentialTemplate> {
    const where: WhereOptions = { id };
    return this.findOne({ where });
  }

  async findByIds(ids: number[]): Promise<CredentialTemplate[]> {
    const where: WhereOptions = { id: ids };
    return this.findAll({ where });
  }

  async findByOrganisationId(organisationId: number): Promise<CredentialTemplate[]> {
    const where: WhereOptions = { organisationId };
    return this.findAll({ where });
  }

}
