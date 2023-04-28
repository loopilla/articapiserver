import { Module } from '@nestjs/common';
import { ArticController } from './artic.controller';
import { ArticService } from './artic.service';

@Module({
  controllers: [ArticController],
  providers: [ArticService]
})
export class ArticModule {}
