import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Awardee, AwardeeGroup } from '.';

@Table
export class AwardeeGroupAwardeeIds extends Model {

  @ForeignKey(() => AwardeeGroup)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  awardeeGroupId!: number;

  @ForeignKey(() => Awardee)
  @Column({
    type: DataType.INTEGER,
    primaryKey: true
  })
  awardeeId!: number;

}
