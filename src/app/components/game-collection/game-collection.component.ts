import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';// Import your authentication service
// Import your game collection service
import { Observable } from 'rxjs';

import { User } from '@angular/fire/auth';
import { Firestore,collection,addDoc } from '@angular/fire/firestore';
import { GameCollecionserviceService } from 'src/app/services/game-collecionservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-collection',
  templateUrl: './game-collection.component.html',
  styleUrls: ['./game-collection.component.css']
})

export class GameCollectionComponent {
  games: any | undefined;
  error: string | null = null;

  user: User | null = null; // Add user property
  gameData: {
    gameId: string;
    gameName: string;
    gameImage: string;
  } = {
    gameId: '123',
  gameName: 'Sample Games',
  gameImage: 'path/to/image.jpgs',
  };
  constructor(private authService: AuthenticationService , private gc:GameCollecionserviceService,private router: Router) {
    
  }
 
  ngOnInit(): void {

    
    this.authService.onAuthStateChanged((user) => {
      this.user = user;
      if (this.user) {
        this.gc.getGames(this.user.uid).subscribe(
          (gamesData) => {
            this.games = gamesData[0].games;
            console.log(this.games);
          },
          (error) => {
            this.error = error; // Handle any potential error
            console.error('Error fetching games:', error);
          }
        );
      }
    });
  }
  // Delete a game
 /* deleteGame(userId: string, gameId: string): void {
    this.gameCollectionService.deleteGame(userId, gameId);
  }*/
  addgame(){
if(this.user)
this.gc.createGame(this.user.uid,"",this.gameData)
  }

  navigateToGameDetails(gameId: string): void {
    this.router.navigate(['/details', gameId]);
  }
  deleteGame(gameId: any): void{
    console.log(gameId)
    if (this.user) {
    this.gc.deleteGame(this.user.uid,gameId)
  
  }
  }
}
