import { Column, Relation, Table, columnTypes, relationTypes } from 'nestjs-objection/dist';
import { BaseModel } from '../base/base.model';
import { UserModel } from '../user/user.model';

@Table({tableName: 'purchase'})
export class PurchaseModel extends BaseModel {
  @Column({ type: columnTypes.uuid, notNullable: true })
  id: string;

  @Column({ type: columnTypes.uuid, notNullable: true })
  userId: string;

  @Column({ type: columnTypes.uuid, notNullable: true })
  artworkId: string;

  @Relation({
    modelClass: UserModel,
    relation: relationTypes.HasOneRelation,
    join: {
      from: 'user.id',
      to: 'purchase.user_id',
    },
  })
  owner: UserModel;
}
