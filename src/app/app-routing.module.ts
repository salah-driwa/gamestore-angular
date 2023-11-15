import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { GameCollectionComponent } from './components/game-collection/game-collection.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "search/:game-search",
    component: HomeComponent
  },
  {
    path: "details/:id",
    component: DetailsComponent
  },
  {
    path: "collection",
    component: GameCollectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
