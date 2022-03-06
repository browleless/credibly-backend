import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { AwardeeGroup } from '.';

@Table
export class User extends Model {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  override id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false
  })
  hashedPassword!: string;

  @Column({
    type: DataType.STRING(10),
    unique: true
  })
  uen?: string;

  @Column({
    type: DataType.STRING(42),
    unique: true
  })
  walletAddress?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  accountType!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  approved!: boolean;

  @HasMany(() => AwardeeGroup)
  groups?: AwardeeGroup[];
  
}
