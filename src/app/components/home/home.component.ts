import { Component } from '@angular/core';
import { APIResponse, Game } from 'src/app/models';

import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
 
})
export class HomeComponent {
 public sort: string;
 public platform :string;
 public genres : string ;
 public games: Array<Game>;
 private routeSub: Subscription= new Subscription();
 private gameSub: Subscription = new Subscription();
public currentpage=1;
 public loader = true ;

 constructor(private httpService: HttpService,
  public router: Router,
  private activatedRoute: ActivatedRoute) {
  
  this.sort = '';
  this.games = [];
 this.platform= '';
 this.genres = '';
   // Initialize with an empty string or an appropriate default value
   setTimeout(() => {
    this.loader = false;
  }, 1500);
 
   }
   
   


ngOnInit(): void{
  this.activatedRoute.params.subscribe((params:Params)=>{

    if(params['game-search'] ){
      this.searchGames('metacrit',this.platform,this.genres,params['game-search'] )      ;
    
    }else{
      this.searchGames('metacrit');
    }
   
  }
  )
  //an

}

previewpage(){
  if(this.currentpage>1)
    {this.currentpage--;
      this.searchGames(this.sort, this.platform, this.genres,"",this.currentpage.toString())
      window.scrollTo({ top:300, behavior: 'smooth' });
    }
 
}
    

nextpage(){
  this.currentpage++;
  this.searchGames(this.sort, this.platform, this.genres,"",this.currentpage.toString())
  window.scrollTo({ top:300, behavior: 'smooth' });
}


searchGames(sort: string, platform?: string, genres?: string, search?: string,currentpage?:string): void {
  // Construct the API request based on the selected options
  this.gameSub = this.httpService
    .getGameList(sort, platform? platform : '', genres? genres : '', search? search : '' ,currentpage? currentpage :'1')
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
   console.log(this.games);
      
     
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



 onSubmit(form:NgForm){
  this.router.navigate(['search', form.value.search])
}
}
