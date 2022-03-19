import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { User, Document } from '.';

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
  certificateUuid!: string;
  
  @Column({
    type: DataType.STRING(255),
    allowNull: false
  })
  transferTo!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  approved!: boolean;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  user!: User;

  @HasMany(() => Document)
  documents?: Document[];

}
