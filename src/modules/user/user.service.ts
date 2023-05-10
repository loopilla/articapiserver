import { Inject, Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { UserModel } from './user.model';
import { InjectModel } from 'nestjs-objection/dist';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userModel: ModelClass<UserModel>,
  ) {}

  async findOne(email: string): Promise<UserModel | undefined> {
    const user = this.userModel.query().findOne({
      email
    });
    return user;
  }
}
