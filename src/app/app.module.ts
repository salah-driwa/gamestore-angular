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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
