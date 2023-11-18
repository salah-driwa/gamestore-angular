import { Component, Input, OnInit, SimpleChanges  } from '@angular/core';
import { Game } from 'src/app/models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { GameCollecionserviceService } from 'src/app/services/game-collecionservice.service';
import { AuthenticationService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('scaleOnHover', [
      state('initial', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.03)' })),
      transition('initial => hovered', animate('180ms ease-in')),
      transition('hovered => initial', animate('20ms ease-out')),
    ]),
    trigger('carousel', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  
  ],
})
export class CardComponent  implements OnInit{
  @Input() game: Game | null = null;
  @Input() cardIndex: number = 0;
  @Input() openGameDetails: ((id: string) => void ) =(id: string) => {};;
  @Input() router: Router | undefined;
  @Input() display: string | undefined ;
  @Input() GameCollection:  any ;
  hoverState: 'initial' | 'hovered' = 'initial';
  zIndex = 0; // 
  currentScreenshotIndex: number = 0;
  public idType: string | undefined;
  user: User | null = null;
  gameData: {
    gameId: string | undefined;
    gameName: string  | undefined;
    gameImage: string  | undefined;
  } | undefined 
  IsInCollection = false ;
   

  // In your constructor or wherever appropriate
  
  constructor(private authService: AuthenticationService , private gc:GameCollecionserviceService) {
    
  
    this.hoverState = 'initial';
  }
  ngOnInit():void{
    this.gameData={
        gameId: this.game?.id,
      gameName: this.game?.name,
      gameImage: this.game?.background_image,
      };
      this.authService.onAuthStateChanged((user) => {
        this.user = user;
        
      });
    
      //console.log(this.GameCollection?.some((game: any) => game.gameId === this.game?.id));
      
        
    
    }


    
  // Other component logic
  onHover(game: Game) {
    game.hoverState = 'hovered';
    this.zIndex = 10;
    
  
   
  }

  onLeave(game: Game) {
    game.hoverState = 'initial';
    this.zIndex = 0;
  }
  setimageindex(i:number){
    this.currentScreenshotIndex= i;
  }
  openGamecardDetail(id:string):void{
    if (this.router) {
      this.router.navigate(['details', id]);
    }
  }
  addtocollectiongame(){
  
    if(this.user)
    {this.gc.createGame(this.user.uid,"",this.gameData)
  //console.log( this.user.uid)
}
  }
  //delet the game from the collection
  deletefromcollectiongame(){

    if(this.user)
    {if(this.game)
      this.gc.deleteGame(this.user.uid,this.game?.id)
  console.log( this.user.uid)}
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('GameCollection' in changes) {
      // Update IsInCollection based on the new GameCollection
      this.updateIsInCollection();
    }
  }

  private updateIsInCollection(): void {
    this.IsInCollection = (this.GameCollection?.some((game: any) => game.gameId === this.game?.id)) || false;
  }

    
}
