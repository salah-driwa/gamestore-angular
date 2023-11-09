import { Component, Input, OnInit  } from '@angular/core';
import { Game } from 'src/app/models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
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
  hoverState: 'initial' | 'hovered' = 'initial';
  zIndex = 0; // 
  currentScreenshotIndex: number = 0;
  public idType: string | undefined;



    ngOnInit():void{

    }

  // In your constructor or wherever appropriate
  
  constructor() {
    this.hoverState = 'initial';
  }
  // Other component logic
  onHover(game: Game) {
    game.hoverState = 'hovered';
    this.zIndex = 10;
    // Set it to 'initial' in the constructor 
   // console.log(`The type of game?.id is: ${typeof this.game?.id}`);

   
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

}
