import { SoftDeleteModel } from 'nestjs-objection/dist';
import { Model, snakeCaseMappers } from 'objection';

export class BaseModel extends Model {
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt!: Date;

  /**
   * Tells knex which case we use
   *
   * @readonly
   * @static
   * @memberof BaseModel
   */
  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  /**
   * Model path
   *
   * @readonly
   * @static
   * @memberof BaseModel
   */
  static get modelPaths() {
    return [__dirname];
  }

  /*
   ** Column helpers
   */

  get isDeleted() {
    return Boolean(this.deletedAt);
  }

  /*
   ** Hooks
   */

  $beforeInsert() {
    this.createdAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}
