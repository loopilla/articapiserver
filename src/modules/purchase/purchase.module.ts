import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { ArticModule } from '../artic/artic.module';
import { PurchaseController } from './purchase.controller';
import { ObjectionModule } from 'nestjs-objection/dist';
import { PurchaseModel } from './purchase.model';

@Module({
  imports: [
    ArticModule,
    ObjectionModule.forFeature([PurchaseModel])
  ],
  providers: [PurchaseService],
  controllers: [PurchaseController],
  exports: [PurchaseService],
})
export class PurchaseModule {}
