import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { GaugeModule } from 'angular-gauge';
// Import Angular Material modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HomeComponent } from './components/home/home.component';
import { HttpheaderInterceptor } from './interceptors/http-header.interceptors';
import { HttpErrorsInterceptor } from './interceptors/http-errors.interceptors';
import { CardComponent } from './components/card/card.component';
import { DetailsComponent } from './components/details/details.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HerosectionComponent } from './components/herosection/herosection.component';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';
import { SimilargamecardComponent } from './components/similargamecard/similargamecard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

// auth firebase

import { environment } from 'src/environments/environment';
import { ScreenTrackingService, UserTrackingService, getAnalytics, provideAnalytics } from '@angular/fire/analytics';
import { SignInComponent } from './components/AuthButton/sign-in.component';
import { SigninPopupComponent } from './components/AuthButton/sign-in-popup/sign-in-popup.component';
import { SignUPPopupComponent } from './components/AuthButton/sign-up-popup/sign-up-popup.component';
import { GameCollectionComponent } from './components/game-collection/game-collection.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CardComponent,
    DetailsComponent,
    HerosectionComponent,
    GameTabsComponent,
    SimilargamecardComponent,
    SignInComponent,
    SigninPopupComponent,
    SignUPPopupComponent,
    GameCollectionComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GaugeModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()), 
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp({"projectId":"gamestore-8ecaf","appId":"1:113195888999:web:96d0e11f81604fa5e6bfc2","storageBucket":"gamestore-8ecaf.appspot.com","apiKey":"AIzaSyAjD9LKBsvibGTtK7-3GBp0twQ7uxyGXLc","authDomain":"gamestore-8ecaf.firebaseapp.com","messagingSenderId":"113195888999","measurementId":"G-HSX6T6KW68"})),
    provideAnalytics(() => getAnalytics()),
   
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: HttpheaderInterceptor,
      multi: true,
    },
    {provide:HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
    ScreenTrackingService,
    UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
