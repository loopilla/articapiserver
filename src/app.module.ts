import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ArticModule } from './modules/artic/artic.module';

@Module({
  imports: [UserModule, ArticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
