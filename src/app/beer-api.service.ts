import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Beer, QueryParams } from './beer.type';
import { forkJoin, map, Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class BeerAPIService {

  constructor(private http: HttpClient) {}

  getByID(id: string): Observable<Beer> {
    return this.http
      .get<[Beer]>(`${env.apiURL}/beers/${id}`)
      .pipe(map((res) => res[0]));
  }

  getByIDs(ids: string[]): Observable<Beer[]> {
    return forkJoin(ids.map((id) => this.getByID(id)));
  }

  load(params: QueryParams): Observable<Beer[]> {
    this.normalizeParams(params);
    return this.http.get<Beer[]>(`${env.apiURL}/beers`, { params });
  }

  getSimilars(beer: Beer) {
    return this.http.get<Beer[]>(`${env.apiURL}/beers`, {
      params: {
        abv_gt: beer.abv,
        abv_lt: beer.abv + 1,
        ibu_gt: (beer.ibu - 10 <= 0) ?  0 : beer.ibu - 10,
        ibu_lt: beer.ibu + 10,
      },
    });
  }

  private normalizeParams(params: QueryParams): void {
    for(let key in params) {
      if(!params[key]) {
        delete params[key];
      }
    };

    if (params.brewed_before) {
      params.brewed_before = params.brewed_before?.split('-').reverse().join('-');
    }

    if (params.brewed_after) {
      params.brewed_after = params.brewed_after?.split('-').reverse().join('-');
    }
  }
}
