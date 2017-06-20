import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'people',      component: PeoplePageComponent },
  { path: 'teams',      component: TeamsPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PeoplePageComponent,
    TeamsPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
