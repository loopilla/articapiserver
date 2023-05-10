import { Test, TestingModule } from '@nestjs/testing';
import { ArticService } from '../artic.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('ArticService', () => {
  let articService: ArticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
      providers: [
        ArticService,
      ],
    }).compile();

    articService = module.get<ArticService>(ArticService);
  });

  it('should be defined', () => {
    expect(articService).toBeDefined();
  });
});
