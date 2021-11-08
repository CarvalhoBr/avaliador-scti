import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

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
}