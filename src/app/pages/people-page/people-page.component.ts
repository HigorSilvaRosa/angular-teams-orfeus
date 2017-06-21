import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.css']
})
export class PeoplePageComponent implements OnInit {

  constructor(public personService : PersonService, private router : Router) { }

  ngOnInit() {
  }

  generate(){
    this.personService.generatePerson().then(person => {
      this.router.navigate(['person/', person.id]);
    });
  }

}
