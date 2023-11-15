import { Component } from '@angular/core';
import { APIResponse, Game, Geners } from 'src/app/models';

import { HttpService } from 'src/app/services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AuthenticationService } from 'src/app/services/auth.service';
import { GameCollecionserviceService } from 'src/app/services/game-collecionservice.service';
import { User } from 'firebase/auth';

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
 public isLoadingData = true ;
  search: any;
public count: number ;
public isNextPage: string;

  public allGeners :Array<Geners> | undefined;

  public DisplayOption ="";
  user: User | null = null; 
  error: any;
  collectiongame: any;
 constructor(private httpService: HttpService, private authService: AuthenticationService , private gc:GameCollecionserviceService,
  public router: Router,
  private activatedRoute: ActivatedRoute) {
    this.DisplayOption = localStorage.getItem('DisplayOption') || 'option1';
  this.sort = '';
  this.games = [];
 this.platform= '';
 this.genres = '';
 this.count = 0;
 this.isNextPage= '';
   // Initialize with an empty string or an appropriate default value
  // all geners and platform
  

   }
   
displayoption(option :string){

 this.DisplayOption = option;
  // Save the DisplayOption to localStorage
  localStorage.setItem('DisplayOption', option);
}
skeletonIndexes = Array.from({ length: 20 }, (_, index) => index);

ngOnInit(): void{
  
  this.activatedRoute.params.subscribe((params:Params)=>{
    
    if(params['game-search']  ){
      this.searchGames('metacrit',this.platform,this.genres,params['game-search'] ) ;
      this.search =params['game-search'] ; 
      //console.log(params['game-search'] + " first condtion")    
    
    }else{
     
      this.activatedRoute.queryParams.subscribe(params => {
        if(params['genre'])
         {this.genres = params['genre'];
       //  console.log(params['game-search'] + " first condtion")
         this.searchGames('metacrit',this.platform,this.genres);
        }else{
          this.searchGames('metacrit');
        }
    
      });
    }
    
   
  }
  )
  this.getallgeners();
 // genre filter your game list
  

 this.authService.onAuthStateChanged((user) => {
  this.user = user;
  if (this.user) {
    this.gc.getGames(this.user.uid).subscribe(
      (gamesData) => {
        this.collectiongame = gamesData[0].games;
        console.log(this.collectiongame);
      },
      (error) => {
        this.error = error; // Handle any potential error
        console.error('Error fetching games:', error);
      }
    );
  }

  });

}

getallgeners(){
  this.gameSub = this.httpService.getgenersList()
  .subscribe((gameList: APIResponse<Geners>) => {
    this.allGeners=gameList.results
    
  });
}



generatePagesArray(): number[] {
  const itemsPerPage = 20; // Adjust this value based on your requirement
  const totalPages = Math.ceil(this.count / itemsPerPage);

  // Ensure that the displayed page numbers don't exceed 9
  const startPage = Math.max(1, this.currentpage - Math.floor(9 / 2));
  const endPage = Math.min(totalPages, startPage + 8);

  // Generate an array of page numbers
  return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
}

previewpage(){
  if(this.currentpage>1)
    {this.currentpage--;
      this.isLoadingData = true ;
      this.searchGames(this.sort, this.platform, this.genres,this.search,this.currentpage.toString())
      window.scrollTo({ top:300, behavior: 'smooth' });
    }
 
}
    

nextpage(){
  if(this.isNextPage)
   {this.currentpage++;
  this.isLoadingData = true ;
  this.searchGames(this.sort, this.platform, this.genres,this.search,this.currentpage.toString())
  window.scrollTo({ top:300, behavior: 'smooth' });}
}


searchGames(sort: string, platform?: string, genres?: string, search?: string,currentpage?:string): void {
  // Construct the API request based on the selected options
 
  this.gameSub = this.httpService
  
    .getGameList(sort, platform? platform : '', genres? genres : '', search? search : '' ,currentpage? currentpage :'1')
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      this.count =gameList.count;
      this.isNextPage=gameList.next;
      //console.log(gameList.next)
    
   this.isLoadingData = false;
 
    });
}

setpage(id:number){
  this.currentpage =id ;
   this.searchGames(this.sort, this.platform, this.genres,this.search,this.currentpage.toString())
  window.scrollTo({ top:300, behavior: 'smooth' });
  this.isLoadingData = true ;
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
