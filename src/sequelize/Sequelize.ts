import { Transaction } from 'sequelize';
import { Sequelize as SequelizeTs, SequelizeOptions } from 'sequelize-typescript';

export interface InitSequelizeOptions {
  host: string;
  readReplicaHosts?: string[];
  port: number;
  username: string;
  password: string;
  name: string;
  models: any;
}

export class Sequelize {

  private readonly sequelizeTsType: typeof SequelizeTs;
  private sequelize!: SequelizeTs;

  constructor(sequelizeTsType: typeof SequelizeTs) {
    this.sequelizeTsType = sequelizeTsType;
  }

  async init(options: InitSequelizeOptions) {
    console.log('Initializing Sequelize...');

    const { name, username, password, host, readReplicaHosts, port, models } = options;

    const sequelizeOptions: SequelizeOptions = {
      dialect: 'mysql',
      logging: false,
      port,
      define: {
        freezeTableName: true,
        createdAt: false,
        updatedAt: false
      },
      pool: {
        max: 400,
        min: 0,
        acquire: 20000,
        idle: 10000,
        evict: 1000
      },
      timezone: '+08:00'
    };

    if (readReplicaHosts?.length) {
      sequelizeOptions.replication = {
        read: readReplicaHosts.map(host => ({ host })),
        write: { host }
      };
    } else {
      sequelizeOptions.host = host;
    }

    this.sequelize = new this.sequelizeTsType(name, username, password, sequelizeOptions);

    this.sequelize.addModels(models);

    await this.sequelize.authenticate();

    console.log('Sequelize initialization complete.');
  }

  get instance() {
    if (!this.sequelize) {
      throw new Error('Sequelize is not initialized.');
    }
    return this.sequelize;
  }

  getTransaction(): Promise<Transaction> {
    return this.instance.transaction();
  }

}
