import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '.';

@Table
export class CredentialTemplate extends Model {

  @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
  })
  override id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true
  })
  organisationId!: number;

  @Column({
    type: DataType.BLOB('long'),
    allowNull: false,
  })
  image!: Buffer;

}