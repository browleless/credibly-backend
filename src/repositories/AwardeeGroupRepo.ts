import { BaseRepo, IncludeOptions, RepoOptions } from './BaseRepo';
import { Includeable, Transaction, WhereOptions } from 'sequelize';
import { AwardeeGroup, CertificateTemplate } from '../entities';
import { sequelize } from '../sequelize';
import { certificateTemplateRepo } from '.';

export type AwardeeGroupInclude = 'certificateTemplate';

export interface AwardeeGroupRepoOptions extends RepoOptions<AwardeeGroupInclude> {
  certificateTemplate?: IncludeOptions;
}

export class AwardeeGroupRepo extends BaseRepo<AwardeeGroup, AwardeeGroupInclude, AwardeeGroupRepoOptions> {

  constructor() {
    super(sequelize, AwardeeGroup);
  }

  async findById(id: number, options?: AwardeeGroupRepoOptions): Promise<AwardeeGroup> {
    const where: WhereOptions = { id };
    return this.findOne({ where, options });
  }

  async findByIds(ids: number[], options?: AwardeeGroupRepoOptions): Promise<AwardeeGroup[]> {
    const where: WhereOptions = { id: ids };
    return this.findAll({ where, options });
  }

  async findByOrganisationId(organisationId: number, options?: AwardeeGroupRepoOptions): Promise<AwardeeGroup[]> {
    const where: WhereOptions = { organisationId };
    return this.findAll({ where, options });
  }

  async bulkDestroyById(id: number, transaction: Transaction): Promise<number> {
    const where: WhereOptions = { id };
    return this.bulkDestroy(where, transaction);
  }

  override constructInclude(options?: AwardeeGroupRepoOptions) {
    const includes: Includeable[] = [];

    options?.includes?.forEach(include => {
      if (include === 'certificateTemplate') {
        includes.push({
          ...options.certificateTemplate,
          model: CertificateTemplate,
          include: certificateTemplateRepo.constructInclude(options.certificateTemplate)
        });
      }
    });

    return includes;
  }

}
