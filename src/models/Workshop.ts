import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Rating from "./Rating";
import Speaker from "./Speaker";

@Table({
  tableName: "workshops",
})
export class Workshop extends Model<Workshop> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id: number;

  @Column(DataType.STRING)
  public title: string;

  @Column(DataType.STRING)
  public description: string;

  @Column(DataType.DATE)
  public date: Date;

  @ForeignKey(() => Speaker)
  @Column({
    type: DataType.INTEGER,
    field: "speaker_id"
  })
  public speakerId: number;

  @Column({
    type: DataType.DATE,
    field: "created_at"
  })
  public createdAt: Date;

  @Column({
    type: DataType.DATE,
    field: "updated_at"
  })
  public updatedAt: Date;

  @BelongsTo(() => Speaker)
  public speaker: Speaker;

  @HasMany(() => Rating)
  public ratings: Rating[];
}