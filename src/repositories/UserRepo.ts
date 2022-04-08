import { BaseRepo, IncludeOptions, RepoOptions } from './BaseRepo';
import { Includeable, WhereOptions } from 'sequelize';
import { Document, User } from '../entities';
import { sequelize } from '../sequelize';
import { documentRepo } from '.';

export type UserInclude = 'documents';

export interface UserRepoOptions extends RepoOptions<UserInclude> {
  documents?: IncludeOptions;
}

export class UserRepo extends BaseRepo<User, UserInclude, UserRepoOptions> {

  constructor() {
    super(sequelize, User);
  }

  async findById(id: number, options?: UserRepoOptions): Promise<User> {
    const where: WhereOptions = { id };
    return this.findOne({ where, options });
  }

  async findByIds(ids: number[], options?: UserRepoOptions): Promise<User[]> {
    const where: WhereOptions = { id: ids };
    return this.findAll({ where, options });
  }

  async findByEmail(email: string, options?: UserRepoOptions): Promise<User> {
    const where: WhereOptions = { email };
    return this.findOne({ where, options });
  }

  async findByUen(uen: string, options?: UserRepoOptions): Promise<User> {
    const where: WhereOptions = { uen };
    return this.findOne({ where, options });
  }

  async findByApproved(approved: boolean, options?: UserRepoOptions): Promise<User[]> {
    const where: WhereOptions = { approved };
    return this.findAll({ where, options });
  }

  override constructInclude(options?: UserRepoOptions) {
    const includes: Includeable[] = [];

    options?.includes?.forEach(include => {
      if (include === 'documents') {
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
