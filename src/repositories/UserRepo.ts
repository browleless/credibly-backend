import { BaseRepo, IncludeOptions, RepoOptions } from './BaseRepo';
import { Includeable, WhereOptions } from 'sequelize';
import { AwardeeGroup, User } from '../entities';
import { sequelize } from '../sequelize';
import { awardeeGroupRepo } from '.';

export type UserInclude = 'groups';

export interface UserRepoOptions extends RepoOptions<UserInclude> {
  groups?: IncludeOptions;
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

  override constructInclude(options?: UserRepoOptions) {
    const includes: Includeable[] = [];

    options?.includes?.forEach(include => {
      if (include === 'groups') {
        includes.push({
          ...options.groups,
          model: AwardeeGroup,
          include: awardeeGroupRepo.constructInclude(options.groups)
        });
      }
    });

    return includes;
  }

}
