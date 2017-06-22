import { TeamService } from './services/team.service';
import { PersonService } from './services/person.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersonService, TeamService]
})
export class AppComponent {
  title = 'app';

  constructor() {

  }
}
