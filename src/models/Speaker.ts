import { AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Workshop } from "./Workshop";

@Table({
  tableName: "speakers"
})
export default class Speaker extends Model<Speaker> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  public name: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  public email: string;

  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "created_at"
  })
  public createdAt: Date;
 
  @Column({
    allowNull: false,
    type: DataType.DATE,
    field: "updated_at"
  })
  public updatedAt: Date;

  @HasMany(() => Workshop)
  public workshops: Workshop[];

}