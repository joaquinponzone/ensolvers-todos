import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Todo extends Model<Todo> {
  @Column({ unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column
  text: string;

  @Column({ defaultValue: false })
  done: boolean;
}
