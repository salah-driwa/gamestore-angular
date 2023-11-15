import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';


import { MatDialog } from '@angular/material/dialog';

import { SigninPopupComponent } from './sign-in-popup/sign-in-popup.component';
import { User } from '@angular/fire/auth';

import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
 
    error: string | null = null;

    user: User | null = null; // Add user property
  
    constructor(private authService: AuthenticationService, private dialog: MatDialog ,public router: Router) {}

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.authService.onAuthStateChanged((user) => {
        this.user = user;
        console.log( this.user)
      });
    }
  
 
    openGameCollection():void{
      if (this.router) {
        this.router.navigate(['collection']);
      }
    }

  
    async openLoginDialog(): Promise<void> {
      try {
        this.error = null;
        const dialogRef = this.dialog.open(SigninPopupComponent);
  
        // You can subscribe to the afterClosed event to handle actions after the dialog is closed
        dialogRef.afterClosed().subscribe(result => {
          // Handle the result if needed
        });
  
      } catch (error) {
        this.error = (error as any).message;
      }
    }
  


    signOut(): void {
      this.authService.signOut().catch(error => {
        console.error('Sign-out error:', error.message);
      });
    }


}
