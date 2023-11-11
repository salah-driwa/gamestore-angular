import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment as env } from 'src/environments/environment.prod';
import { APIResponse, Game, Stores } from '../models';
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
    currentpage:string,
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams()
  .set('ordering', ordering).set('metacritic', '60,100').set('page',currentpage) ;

  
    
    
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
            const { gameInfoRequest, gameScreenshotsRequest, gameTrailersRequest } = resp;
             // Assuming results is an array in gameScreenshotsRequest
          const short_screenshots = gameScreenshotsRequest?.results || [];
          return {
            ...gameInfoRequest,
            short_screenshots,
            trailers: gameTrailersRequest?.results || [], // Assuming results is an array in gameTrailersRequest
          };
          })
        );
      }

      getstores() :Observable<APIResponse<Stores>> {
        let params = new HttpParams()
         return this.http.get<APIResponse<Stores>>(`${env.BASE_URL}/stores`, {
            params: params,
          });
      }
     
     
   
}
