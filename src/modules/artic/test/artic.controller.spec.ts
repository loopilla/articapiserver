import { Test, TestingModule } from '@nestjs/testing';
import { ArticController } from '../artic.controller';
import { ArticService } from '../artic.service';

describe('ArticController', () => {
  let controller: ArticController;
  let articService: ArticService;

  let mockArticService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ArticService,
          useValue: mockArticService,
        }],
      controllers: [ArticController],
    }).compile();

    articService = module.get<ArticService>(ArticService);
    controller = module.get<ArticController>(ArticController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', ()  => {
    // it('should return an artwork from artic API', () => {});
    it('should return an artwork from artic API', () => {

    });
  });
});
