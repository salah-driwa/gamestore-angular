import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SigninPopupComponent } from '../sign-in-popup/sign-in-popup.component';
import { FirebaseError } from '@angular/fire/app';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up-popup',
  templateUrl: './sign-up-popup.component.html',
  styleUrls: ['./sign-up-popup.component.css']
})
export class SignUPPopupComponent {









  constructor(private authService: AuthenticationService,private dialog: MatDialog, private dialogRef: MatDialogRef<SignUPPopupComponent>) {
    
  }
  
 
 // redrect to sign in
  openSigninDialog(): void {
    const dialogRef = this.dialog.open(SigninPopupComponent);
    this.closeSignUpDialog();
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
      
    });
  }

  closeSignUpDialog(): void {
    this.dialogRef.close();  // Close the dialog
  }
  async closeDialog(form:NgForm ): Promise<void> {

    // console.log('hello'+email,password)
     try {
       // Call Firebase authentication method to sign in
       await this.authService.signUp(form.value.email, form.value.password);
 
       // Optionally, you can close the dialog or perform other actions
       console.log('Sign-in successful!');
       this.closeSignUpDialog();
 
     } catch (error) {
       // Handle authentication error 
        console.error('Sign-in error:',(error as FirebaseError).message);
     }
   }
 

}
