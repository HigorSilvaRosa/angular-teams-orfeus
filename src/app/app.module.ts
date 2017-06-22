import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ChartsModule } from 'ng2-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PeoplePageComponent } from './pages/people-page/people-page.component';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';
import { PersonPageComponent } from './pages/person-page/person-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'people',      component: PeoplePageComponent },
  { path: 'person/:id',      component: PersonPageComponent },
  { path: 'teams',      component: TeamsPageComponent },
  { path: 'team/:id',      component: TeamPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PeoplePageComponent,
    TeamsPageComponent,
    PersonPageComponent,
    TeamPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    HttpModule,
    FormsModule,
    ChartsModule,
    Ng2SmartTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
