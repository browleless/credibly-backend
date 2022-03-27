import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User, CertificateTemplate } from ".";

@Table
export class AwardeeGroup extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  override id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
  })
  organisationId!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  groupName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  groupDescription!: string;

  @ForeignKey(() => CertificateTemplate)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  certificateTemplateId!: number;

  @BelongsTo(() => CertificateTemplate)
  certificateTemplate!: CertificateTemplate;
}
