import { Test, TestingModule } from '@nestjs/testing';
import { ArticController } from './artic.controller';

describe('ArticController', () => {
  let controller: ArticController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticController],
    }).compile();

    controller = module.get<ArticController>(ArticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
