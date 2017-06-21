import { PersonService } from './services/person.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PersonService, ]
})
export class AppComponent {
  title = 'app';

  constructor(public personService : PersonService) {

  }
}
