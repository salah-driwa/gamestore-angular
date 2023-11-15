import { Injectable } from '@angular/core';
import { Observable, catchError, from, of, switchMap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';

import { arrayRemove, arrayUnion, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { doc, collection } from 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class GameCollecionserviceService {
  constructor(private firestore: AngularFirestore) {}


  async createGame(userId: string, gameId: string, gameData: any): Promise<void> {
    const gameDocRef = this.firestore.collection('users').doc(userId).collection('games').doc('GameCollectionName');
  
    // Fetch the existing data
    const docSnapshot = await getDoc(gameDocRef.ref);
    const existingData = docSnapshot.exists() ? (docSnapshot.data() as any) : {};

    // Update the document with the new game data
    return updateDoc(gameDocRef.ref, {
      games: arrayUnion({
        gameId: gameData.gameId,
        title: gameData.gameName,
        gameImage: gameData.gameImage,
      })
    });
  }
  // Get all games from a user's games subcollection
  getGames(userId: string): Observable<any[]> {
    
      return  this.firestore.collection('users').doc(userId).collection('games').valueChanges();
    
  }

  async deleteGame(userId: string, gameId: string): Promise<void> {
    const gameDocRef = this.firestore.collection('users').doc(userId).collection('games').doc('GameCollectionName');
  
    // Get the current games array
    const docSnapshot = await getDoc(gameDocRef.ref);
    const currentGames = docSnapshot.exists() ? docSnapshot.data()?.['games'] || [] : [];

  
    // Remove the game with the specified gameId from the array
    const updatedGames = currentGames.filter((game: any) => game.gameId !== gameId);
  
    // Update the document with the modified array
    return updateDoc(gameDocRef.ref, { games: updatedGames });
  }
  

 // Helper method to ensure the games collection exists for the user
 
}
