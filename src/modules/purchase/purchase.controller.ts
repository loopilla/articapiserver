import { Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Artwork } from '../artic/artic.interfaces';

@Controller('purchase')
export class PurchaseController {
  constructor(
    private readonly purchaseService: PurchaseService,
  ) {}

  /**
   * This enpoint purchase an item by its id, if it is not purchased already
   * @param id 
   * @param request 
   * @returns The purchased artwork if it was success
   */
  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async purchaseArtwork(
    @Param('id') id: string,
    @Request() request,
  ) {
    return this.purchaseService.purchaseItem(request.user.userId, id);
  }

  /**
   * This enpoint retrieves the list of the purchased items by the actual user
   * @param request (auto)
   * @returns Array of Artworks
   */
  @UseGuards(JwtAuthGuard)
  @Get('artworks')
  async getOwnedArtworks(
    @Request() request,
  ): Promise<Artwork[]> {
    return this.purchaseService.getOwnedArtworks(request.user.userId);
  }
}
