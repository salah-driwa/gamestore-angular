import { Component } from '@angular/core';
import { APIResponse, Game } from 'src/app/models';

import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent {
 public sort: string;
 public games: Array<Game>;

 constructor(private httpService: HttpService,
  private activatedRoute: ActivatedRoute) {
  
  this.sort = '';
  this.games = [];
   // Initialize with an empty string or an appropriate default value
   
 
   }
   
   


ngOnInit(): void{
  this.activatedRoute.params.subscribe((params:Params)=>{
    if(params ['game-search']){
      this.searchGames('metacrit',params['game-serach']);
    }else{
      this.searchGames('metacrit');
    }

  }
  )
  //an

}



searchGames(sort:string, search?:string):void{
  this.httpService.getGameList(sort,search).subscribe((gameList: APIResponse<Game>)=>{
    this.games= gameList.results;
    //console.log(this.games[0].short_screenshots[3].image);
  })

}




}
