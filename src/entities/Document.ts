import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "./User";
import { TransferRequest } from "./TransferRequest";

@Table
export class Document extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  organisationId?: number;

  @ForeignKey(() => TransferRequest)
  @Column({
    type: DataType.INTEGER,
  })
  transferRequestId?: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.BLOB("long"),
    allowNull: false,
  })
  data!: Buffer;
}
