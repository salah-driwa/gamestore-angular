import { Component } from '@angular/core';
import { APIResponse, Game } from 'src/app/models';

import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent {
 public sort: string;
 public games: Array<Game>;
 private routeSub: Subscription= new Subscription();
 private gameSub: Subscription = new Subscription();



 constructor(private httpService: HttpService,
  public router: Router,
  private activatedRoute: ActivatedRoute) {
  
  this.sort = '';
  this.games = [];
   // Initialize with an empty string or an appropriate default value

 
   }
   
   


ngOnInit(): void{
  this.activatedRoute.params.subscribe((params:Params)=>{

    if(params['game-search']
    ){
      this.searchGames('metacrit',params['game-search']
            )      ;
     
    }else{
      this.searchGames('metacrit');
    }

  }
  )
  //an

}


searchGames(sort: string, search?: string): void {
  this.gameSub = this.httpService
    .getGameList(sort, search? search : '')
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(search);
    });
}

openGameDetail(id:string):void{
  this.router.navigate(['details',id]);
}

 ngOnDestroy():void{
  if(this.gameSub){
    this.gameSub.unsubscribe();
  }
  if(this.routeSub){
    this.routeSub.unsubscribe();
  }
 }
}
