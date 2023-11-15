import { Component } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/auth.service';
import { SignUPPopupComponent } from '../sign-up-popup/sign-up-popup.component';

@Component({
  selector: 'app-sign-up-popup',
  templateUrl: './sign-in-popup.component.html',
  styleUrls: ['./sign-in-popup.component.css']
})
export class SigninPopupComponent {
  
  constructor(private authService: AuthenticationService,private dialog: MatDialog, private dialogRef: MatDialogRef<SigninPopupComponent>) {
    
  }
  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignUPPopupComponent);
    this.closeSignInDialog();
    dialogRef.afterClosed().subscribe(result => {
      // Handle the result if needed
      
    });
  }

  closeSignInDialog(): void {
    this.dialogRef.close();  // Close the dialog
  }

 ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
 

 }

 signInWithGoogle(): void {
  try {
    this.authService.signInWithGoogle();
    this.closeSignInDialog();
  } catch (error) {
    // Handle the error if needed
    console.error('Sign-in with Google error:', (error as FirebaseError).message);
  }
}

  async closeDialog(form:NgForm ): Promise<void> {

   // console.log('hello'+email,password)
    try {
      // Call Firebase authentication method to sign in
      await this.authService.signIn(form.value.email, form.value.password);

      // Optionally, you can close the dialog or perform other actions
      console.log('Sign-in successful!');
      this.closeSignInDialog();

    } catch (error) {
      // Handle authentication error 
       console.error('Sign-in error:',(error as FirebaseError).message);
    }
  }

}
