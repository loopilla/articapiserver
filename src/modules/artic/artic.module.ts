import { Module } from '@nestjs/common';
import { ArticController } from './artic.controller';
import { ArticService } from './artic.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get<string>('ARTIC_BASE_URL'),
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: configService.get('HTTP_MAX_REDIRECTS'),
      })
    }),
  ],
  controllers: [ArticController],
  providers: [ArticService],
  exports: [ArticService],
})
export class ArticModule {}
