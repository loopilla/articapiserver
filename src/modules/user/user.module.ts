import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ObjectionModule } from 'nestjs-objection/dist';
import { User } from './user.model';
// import { PurchaseModule } from '../purchase/purchase.module';
// import { ArticModule } from '../artic/artic.module';

@Module({
  imports: [
    // PurchaseModule,
    // ArticModule,
    ObjectionModule.forFeature([User])
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
