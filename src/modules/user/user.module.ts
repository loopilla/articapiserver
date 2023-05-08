import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ObjectionModule } from 'nestjs-objection/dist';
import { User } from './user.model';

@Module({
  imports: [
    ObjectionModule.forFeature([User])
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
