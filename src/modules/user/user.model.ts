import { Column, SoftDeleteModel, Table, columnTypes } from "nestjs-objection/dist";
import { BaseModel } from "../base/base.model";

@Table({tableName: 'users'})
export class User extends BaseModel {
  @Column({ type: columnTypes.uuid })
  id: string;
  
  @Column({ type: columnTypes.string })
  email: string;

  @Column({ type: columnTypes.string })
  password: string;
}
