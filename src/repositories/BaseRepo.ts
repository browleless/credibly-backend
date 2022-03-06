import { BindOrReplacements, FindAttributeOptions, FindOptions as SequelizeFindOptions, Includeable, Model, ModelStatic, Order, QueryTypes, Transaction, WhereOptions } from 'sequelize';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { Sequelize } from '../sequelize';

export type IncludeOptions<I extends string | undefined = undefined, R extends RepoOptions<I> = RepoOptions<I>> =
  Omit<R, 'transaction' | 'lock'> & {
    where?: WhereOptions;
    required?: boolean;
  };

export interface RepoOptions<I extends string | undefined = undefined> {
  includes?: I[];
  transaction?: Transaction;
  updateLock?: Transaction;
  shareLock?: Transaction;
}

export interface FindOptions<R> {
  where?: WhereOptions;
  order?: Order | string[][];
  attributes?: FindAttributeOptions
  options?: Exclude<R, 'where'>;
  subQuery?: boolean;
}

export abstract class BaseRepo<M extends Model, I extends string | undefined = undefined, R extends RepoOptions<I> = RepoOptions<I>> {

  private readonly sequelize: Sequelize;
  private readonly model: ModelStatic<M>;

  protected constructor(sequelize: Sequelize, model: ModelStatic<M>) {
    this.sequelize = sequelize;
    this.model = model;
  }

  protected async findOne(options?: FindOptions<R>) {
    return this.model.findOne(this.constructFindOptions(options));
  }

  protected async findAll(options?: FindOptions<R>) {
    return this.model.findAll(this.constructFindOptions(options));
  }

  protected async select(sql: string, replacements?: BindOrReplacements, transaction?: Transaction): Promise<any[]> {
    return this.sequelize.instance.query(sql, { type: QueryTypes.SELECT, replacements, transaction });
  }

  protected async selectCount(sql: string, replacements?: BindOrReplacements, transaction?: Transaction): Promise<number> {
    const result = await this.select(sql, replacements, transaction);
    return result[0][Object.keys(result[0])[0]];
  }

  async save(entity: M, transaction?: Transaction) {
    return entity.save({ transaction });
  }

  async create(entity: MakeNullishOptional<M>, transaction?: Transaction) {
    return this.model.create(entity, { transaction });
  }

  async upsert(entity: MakeNullishOptional<M>, transaction?: Transaction) {
    return this.model.upsert(entity, { transaction });
  }

  async bulkCreate(entities: MakeNullishOptional<M>[], transaction?: Transaction) {
    return this.model.bulkCreate(entities, { transaction });
  }

  async destroy(entity: M, transaction?: Transaction) {
    return entity.destroy({ transaction });
  }

  protected async bulkDestroy(where: WhereOptions, transaction?: Transaction) {
    return this.model.destroy({ where, transaction });
  }

  protected async update(values: MakeNullishOptional<M>, where: WhereOptions, transaction?: Transaction) {
    const [rows] = await this.model.update(values, { where, transaction });
    return rows;
  }

  private constructFindOptions(options?: FindOptions<R>): SequelizeFindOptions {
    return {
      where: options?.where,
      order: options?.order as Order,
      attributes: options?.attributes,
      include: this.constructInclude(options?.options),
      subQuery: options?.subQuery,
      transaction: options?.options?.transaction || options?.options?.updateLock || options?.options?.shareLock,
      lock: options?.options?.updateLock ? Transaction.LOCK.UPDATE : options?.options?.shareLock ? Transaction.LOCK.SHARE : undefined
    };
  }

  constructInclude(_?: R): Includeable[] {
    return [];
  }

}
