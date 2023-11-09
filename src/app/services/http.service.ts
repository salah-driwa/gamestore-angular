import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment as env } from 'src/environments/environment.prod';
import { APIResponse, Game } from '../models';
import { forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient ) {
   
    
  }
   
  getGameList(
    ordering: string,
    platform: string,
     genres: string,
    search: string ,
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams()
  .set('ordering', ordering).set('metacritic', '60,100');


    if (platform) {
      params = params.set('parent_platforms', platform);
    }
    
    if (genres) {
      params = params.set('genres', genres);
    }
    console.log(search)
    if (search){
      params = params.set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }


      getGameDetails(id: string): Observable<Game> {
        const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
        const gameTrailersRequest = this.http.get(
          `${env.BASE_URL}/games/${id}/movies`
        );
        const gameScreenshotsRequest = this.http.get(
          `${env.BASE_URL}/games/${id}/screenshots`
        );
    
        return forkJoin({
          gameInfoRequest,
          gameScreenshotsRequest,
          gameTrailersRequest,
        }).pipe(
          map((resp: any) => {
            return {
              ...resp['gameInfoRequest'],
              screenshots: resp['gameScreenshotsRequest']?.results,
              trailers: resp['gameTrailersRequest']?.results,
            };
          })
        );
      }
     

   
}
