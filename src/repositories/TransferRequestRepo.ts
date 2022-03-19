import { BaseRepo, IncludeOptions, RepoOptions } from './BaseRepo';
import { Includeable, WhereOptions } from 'sequelize';
import { Document, TransferRequest, User } from '../entities';
import { sequelize } from '../sequelize';
import { documentRepo, userRepo } from '.';

export type TransferRequestInclude = 'documents' | 'user';

export interface TransferRequestRepoOptions extends RepoOptions<TransferRequestInclude> {
  user?: IncludeOptions;
  documents?: IncludeOptions;
}

export class TransferRequestRepo extends BaseRepo<TransferRequest, TransferRequestInclude, TransferRequestRepoOptions> {

  constructor() {
    super(sequelize, TransferRequest);
  }

  async findByIds(ids: number[], options?: TransferRequestRepoOptions): Promise<TransferRequest[]> {
    const where: WhereOptions = { id: ids };
    return this.findAll({ where, options });
  }

  async findByOrganisationIdAndApproved(organisationId: number, approved: boolean, options?: TransferRequestRepoOptions): Promise<TransferRequest[]> {
    const where: WhereOptions = { organisationId, approved };
    return this.findAll({ where, options });
  }

  override constructInclude(options?: TransferRequestRepoOptions) {
    const includes: Includeable[] = [];

    options?.includes?.forEach(include => {
      if (include === 'user') {
        includes.push({
          ...options.user,
          model: User,
          include: userRepo.constructInclude(options.user)
        });
      } else if (include === 'documents') {
        includes.push({
          ...options.documents,
          model: Document,
          include: documentRepo.constructInclude(options.documents)
        });
      }
    });

    return includes;
  }

}
