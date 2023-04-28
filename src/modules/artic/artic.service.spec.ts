import { Test, TestingModule } from '@nestjs/testing';
import { ArticService } from './artic.service';

describe('ArticService', () => {
  let service: ArticService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticService],
    }).compile();

    service = module.get<ArticService>(ArticService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
