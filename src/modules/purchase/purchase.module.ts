import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ArticModule } from '../artic/artic.module';
import { PurchaseController } from './purchase.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { Purchase } from './purchase.model';

@Module({
  imports: [
    ArticModule,
    ObjectionModule.forFeature([Purchase])
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
  exports: [PurchaseService],
})
export class PurchaseModule {}
