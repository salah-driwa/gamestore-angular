// authentication.service.ts
import { Injectable } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { GoogleAuthProvider, UserCredential, signInWithPopup } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, Auth, signOut } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {


  
  
  auth: Auth;
 
  
  constructor(  ) {
    this.auth = getAuth();
    
  }


  // Sign up with email and password
  async signUp(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Sign-up error:', (error as FirebaseError).message);
      throw error;
    }
  }

  // Sign in with email and password
  async signIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Sign-in error:',(error as FirebaseError).message);
      throw error;
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Sign-out error:', (error as FirebaseError).message);
      throw error;
    }
  }
// Sign in with Google
async signInWithGoogle(): Promise<UserCredential> {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    return result;
  } catch (error) {
    console.error('Google Sign-in error:', (error as any).message);
    throw error;
  }
}


  // Listen for changes in authentication state
  onAuthStateChanged(callback: (user: any) => void): void {
    onAuthStateChanged(this.auth, async (user) => {
      callback(user);
      // Fetch user-specific data from Firestore (for testing purposes)
    
     
    });
  }
  getUserId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }


}
