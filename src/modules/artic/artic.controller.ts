import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticService } from './artic.service';
import { Artwork } from './artic.interfaces';

@Controller('artworks')
export class ArticController {
  constructor(
    private readonly articService: ArticService,
  ) {}

  // The single artwork
  @Get('/:id')
  async findOne(
    @Param('id') id: string
  ): Promise<Artwork> {
    return this.articService.findOne(id);
  }

  // And the paged
  @Get('')
  async find(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<Artwork[]> {
    return this.articService.find(
      parseInt(page),
      parseInt(limit),
    );
  }
}
