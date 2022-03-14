import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from '.';

@Table
export class TransferRequest extends Model {

  @Column({
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
  })
  override id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  organisationId!: number;
  
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  newEmail!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  approved!: boolean;

}
