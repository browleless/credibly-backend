import { Sequelize } from './Sequelize';
import { Sequelize as SequelizeTs } from 'sequelize-typescript';

export * from './Sequelize';

export const sequelize = new Sequelize(SequelizeTs);
