import { Injectable } from '@nestjs/common';
import { ModelClass } from 'objection';
import { User } from './user.model';
import { InjectModel } from 'nestjs-objection/dist';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ModelClass<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = this.userModel.query().findOne({
      email
    });
    return user;
  }
}
