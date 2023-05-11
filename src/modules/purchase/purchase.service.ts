import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArticService } from '../artic/artic.service';
import { PurchaseModel } from './purchase.model';
import { ModelClass } from 'objection';
import { InjectModel } from 'nestjs-objection/dist';
import { Artwork } from '../artic/artic.interfaces';

@Injectable()
export class PurchaseService {
  constructor(
    private readonly articService: ArticService,
    @InjectModel(PurchaseModel) private readonly purchaseModel: ModelClass<PurchaseModel>,
  ) {}

  async purchaseItem(
    userId: string,
    artworkId: string,
  ): Promise<Artwork> {
    const artwork = await this.articService.findOne(artworkId);

    const isPurchased = await this.isArtworkAlreadyPurchased(artwork.id);
    if (isPurchased) {
      throw new HttpException('Artwork already purchased!', HttpStatus.FORBIDDEN);
    }

    try {
      await this.purchaseModel.query().insert({
        userId,
        artworkId,
      })
    } catch(error) {
      throw new HttpException(`Internal server error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return artwork;
  }

  async getUserArtworkIds(
    userId: string,
  ): Promise<string[]> {
    const purchases = await this.purchaseModel
      .query()
      .select('artworkId')
      .where({ userId });

    return purchases.map(purchase => purchase.artworkId);
  }

  async isArtworkAlreadyPurchased(artworkId: string): Promise<boolean> {
    const purchasedArtwork = await this.purchaseModel
      .query()
      .findOne({ artworkId });

    return !!purchasedArtwork;
  }

  async getOwnedArtworks(
    userId: string,
  ): Promise<Artwork[]> {
    const artworkIds = await this.getUserArtworkIds(userId);
    return this.articService.findByIds(artworkIds);
  }
}
