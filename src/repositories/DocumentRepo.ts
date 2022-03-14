import { BaseRepo } from './BaseRepo';
import { WhereOptions } from 'sequelize';
import { Document } from '../entities';
import { sequelize } from '../sequelize';

export class DocumentRepo extends BaseRepo<Document> {

  constructor() {
    super(sequelize, Document);
  }

  async findById(id: number): Promise<Document> {
    const where: WhereOptions = { id };
    return this.findOne({ where });
  }

  async findByOrganisationId(organisationId: number): Promise<Document[]> {
    const where: WhereOptions = { organisationId };
    return this.findAll({ where });
  }

  async findByTransferRequestId(transferRequestId: number): Promise<Document[]> {
    const where: WhereOptions = { transferRequestId };
    return this.findAll({ where });
  }

}
