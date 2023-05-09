import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Artwork, Fields } from './artic.interfaces';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ArticService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  async findOne(id: string): Promise<Artwork> {
    const { data } = await firstValueFrom(
      this.httpService.get(`/${id}?fields=${Fields.join(',')}`).pipe(
        catchError((error: AxiosError) => {
          throw 'Unable to serve the request!';
        }),
      )
    );
    return data?.data;
  }

  // Paged
  async find(
    page: number,
    limit: number,
  ): Promise<Artwork[]> {
    const { data } = await firstValueFrom(
      this.httpService.get(`?page=${page}&limit=${limit}&fields=${Fields.join(',')}`).pipe(
        catchError((error: AxiosError) => {
          throw 'Unable to serve the request!';
        }),
      )
    );

    return data?.data;
  }
}
