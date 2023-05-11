import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseController } from '../purchase.controller';
import { PurchaseService } from '../purchase.service';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { HttpModule, HttpService } from '@nestjs/axios';

describe('PurchaseController', () => {
  let purchaseController: PurchaseController;
  // let purchaseService: PurchaseService;

  const purchasesData =       [
    {
      id: '1',
      userId: '1',
      artworkId: '129884',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    },
    {
      id: '2',
      userId: '1',
      artworkId: '129885',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: undefined,
    },
  ];


  const mockPurchaseService = jest.fn().mockImplementation(() => ({
    getUserArtworkIds: (userId: string) => {
      return purchasesData;
    },
    isArtworkAlreadyPurchased: (artworkId: string) => {
      return purchasesData[0];
    }
  }));

  const mockRequest = {
    headers: {
      authorization: ''
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseController],
      imports: [
        HttpModule,
      ],
      providers: [
        {
          provide: PurchaseService,
          useValue: mockPurchaseService,
        },
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: HttpService,
          useValue: new HttpService(),
        },
      ],
    }).compile();

    purchaseController = module.get<PurchaseController>(PurchaseController);
  });

  it('should be defined', () => {
    expect(purchaseController).toBeDefined();
  });

  describe('should return the user\'s artworks', () => {
    expect(purchaseController.getOwnedArtworks(mockRequest)).toEqual(purchasesData);
  });
});
