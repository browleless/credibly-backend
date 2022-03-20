import { BaseRepo } from './BaseRepo';
import { WhereOptions } from 'sequelize';
import { CertificateTemplate } from '../entities';
import { sequelize } from '../sequelize';

export class CertificateTemplateRepo extends BaseRepo<CertificateTemplate> {

  constructor() {
    super(sequelize, CertificateTemplate);
  }

  async findById(id: number): Promise<CertificateTemplate> {
    const where: WhereOptions = { id };
    return this.findOne({ where });
  }

  async findByIds(ids: number[]): Promise<CertificateTemplate[]> {
    const where: WhereOptions = { id: ids };
    return this.findAll({ where });
  }

  async findByOrganisationId(organisationId: number): Promise<CertificateTemplate[]> {
    const where: WhereOptions = { organisationId };
    return this.findAll({ where });
  }

  async findByOrganisationIdAndCertificateName(organisationId: number, certificateName: string): Promise<CertificateTemplate[]> {
    const where: WhereOptions = { organisationId, certificateName };
    return this.findAll({ where });
  }

}
