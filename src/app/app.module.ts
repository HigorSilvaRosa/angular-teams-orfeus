import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'people',      component: PeoplePageComponent },
  { path: 'person/:id',      component: PersonPageComponent },
  { path: 'teams',      component: TeamsPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PeoplePageComponent,
    TeamsPageComponent,
    PersonPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
