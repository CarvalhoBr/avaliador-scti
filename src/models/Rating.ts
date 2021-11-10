import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Workshop } from "./Workshop";

@Table({
  tableName: "ratings"
})
export default class Rating extends Model<Rating>{
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @ForeignKey(() => Workshop)
  @Column({
    type: DataType.INTEGER,
    field: "workshop_id"
  })
  public workshopId: number;

  @Column(DataType.INTEGER)
  public rating: number;

  @BelongsTo(() => Workshop)
  public workshop: Workshop;

}