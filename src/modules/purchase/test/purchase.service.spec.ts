import { Test, TestingModule } from '@nestjs/testing';
import { Model, ObjectionModule } from 'nestjs-objection/dist';
import { PurchaseService } from '../purchase.service';
import { PurchaseModel } from '../purchase.model';
import { ArticService } from '../../artic/artic.service';
import { HttpModule, HttpService } from '@nestjs/axios';

const mockPurcheses = [
  {
    id: '1',
    userId: '1',
    artworkId: '129884', // No need the encrypted pwd here
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  },
  {
    id: '2',
    userId: '1',
    artworkId: '129885', // No need the encrypted pwd here
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  },
  {
    id: '3',
    userId: '1',
    artworkId: '129886', // No need the encrypted pwd here
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: undefined,
  },
];

describe('PurchaseService', () => {
  let purchaseService: PurchaseService;
  let mockModel;

  let mockDb = {
    init(userId: string) {
      jest.spyOn(PurchaseModel, 'query').mockImplementation(() => {
        const purchase = mockPurcheses.filter(purchase => purchase.userId === userId);
        return purchase?.length ? Model.query().resolve(purchase) : undefined;      
      });
    },
    destroy() {
      jest.clearAllMocks();
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ObjectionModule.forFeature([PurchaseModel]),
        HttpModule,
      ],
      providers: [
        PurchaseService,
        ArticService,
        {
          provide: HttpService,
          useValue: new HttpService(),
        },
      ],
    }).compile();

    purchaseService = module.get<PurchaseService>(PurchaseService);
  });

  it('should be defined', () => {
    expect(purchaseService).toBeDefined();
  });

  describe('when user(1) retrieves the purchased artworks', () => {
    mockDb.init('1');

    afterEach(() => {
      mockDb.destroy();
    });

    it('should return the purchased entities', async () => {
      const purchases = await purchaseService.getOwnedArtworks('1');
      expect(purchases).toBeDefined();
    });

    it('should return artowrk ids owned', async () => {
      const ids = await purchaseService.getUserArtworkIds('1');
      expect(ids).toEqual(['129884', '129885', '129886']);
    });
  });

  describe('when user(2) retrieves the purchased', () => {
    mockDb.init('2');

    afterEach(() => {
      mockDb.destroy();
    });

      it('should not return any purchase', async () => {
      const purchases = await purchaseService.getOwnedArtworks('2');
      expect(purchases).not.toBeDefined();
    });


    it('should not return any artowrk ids', async () => {
      const ids = await purchaseService.getUserArtworkIds('2');
      expect(ids).not.toBeDefined();
    });
  });
});
