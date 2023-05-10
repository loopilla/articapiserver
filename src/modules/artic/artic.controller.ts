import { Controller, Get, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ArticService } from './artic.service';
import { Artwork } from './artic.interfaces';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('/artic/artworks')
export class ArticController {
  constructor(
    private readonly articService: ArticService,
  ) {}

  /**
   * This enpoint gets the artwork from the ARTIC API by its id
   * @param id 
   * @param request 
   * @returns Artwork
   */
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @Request() request,
  ): Promise<Artwork> {
    return this.articService.findOne(id);
  }

  /**
   * This enpoint gets the paged artworks from the ARTIC API by page and limit
   * @param page 
   * @param limit 
   * @returns Artwork[]
   */
  @UseGuards(JwtAuthGuard)
  @Get()
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
