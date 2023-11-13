import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  gameRating = 0;
  gameId: string | undefined;
  game: Game | undefined;
  routeSub: Subscription | undefined;
  gameSub: Subscription | undefined;
  public videoSource: string | undefined;
  games: Game[] | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,  public router: Router,
  ) { }

  ngOnInit(): void {
   
  
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];
      this.getGameDetails(this.gameId? this.gameId :'' );
      this.getSimilarGames(this.gameId? this.gameId :'' );

      this.gameRating=0;
    });
    if (this.game?.trailers?.length) {
      this.videoSource = this.game.trailers[0].data?.max;
    }
    window.scrollTo({ top:0, behavior: 'smooth' });
  }

  getGameDetails(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        
        setTimeout(() => {
          this.gameRating = this.game? this.game.metacritic : 0;
     
        }, 1000);
        //console.log(this.game);
      }); 
  }

  getGameStore(id: string): void {
    this.gameSub = this.httpService
      .getGameDetails(id)
      .subscribe((gameResp: Game) => {
        this.game = gameResp;
        
        setTimeout(() => {
          this.gameRating = this.game? this.game.metacritic : 0;
     
        }, 1000);
        //console.log(this.game);
      }); 
  }
 navigateToHome(genreid: string): void {
    // Use Angular's Router to navigate to the home page with the selected genre as a query parameter
    this.router.navigate(['/'], { queryParams: { genre: genreid } });
  }
  getSimilarGames(id: string): void {
    this.gameSub = this.httpService
      .getSimilarGame(id)
      .subscribe((apiResponse: APIResponse<Game>) => {
        // Assuming you want the array of games from the API response
        this.games = apiResponse.results;
        console.log(this.games);
      });
  }
  


  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
 
  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
