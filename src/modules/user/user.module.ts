import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ObjectionModule } from 'nestjs-objection/dist';
import { UserModel } from './user.model';

@Module({
  imports: [
    ObjectionModule.forFeature([UserModel])
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
