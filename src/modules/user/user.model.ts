import { Column, Table, columnTypes } from "nestjs-objection/dist";
import { BaseModel } from '../base/base.model';

@Table({tableName: 'users'})
export class User extends BaseModel {
  @Column({ type: columnTypes.uuid, notNullable: true })
  id: string;

  @Column({ type: columnTypes.string, notNullable: true })
  email: string;

  @Column({ type: columnTypes.string, notNullable: true })
  password: string;

  @Column({ type: columnTypes.string, notNullable: true })
  salt: string;
}
