import { Column, Relation, Table, columnTypes, relationTypes } from 'nestjs-objection/dist';
import { BaseModel } from '../base/base.model';
import { PurchaseModel } from '../purchase/purchase.model';
import { Artwork } from '../artic/artic.interfaces';

@Table({tableName: 'users'})
export class UserModel extends BaseModel {
  @Column({ type: columnTypes.uuid, notNullable: true })
  id!: string;

  @Column({ type: columnTypes.string, notNullable: true })
  email!: string;

  @Column({ type: columnTypes.string, notNullable: true })
  password!: string;

  @Column({ type: columnTypes.string, notNullable: true })
  salt!: string;

  @Relation({
    modelClass: PurchaseModel,
    relation: relationTypes.HasManyRelation,
    join: {
      from: 'users.id',
      to: 'purchase.user_id',
    },
  })
  purchases: [PurchaseModel];
}
