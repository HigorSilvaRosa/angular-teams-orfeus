import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.css']
})
export class PeoplePageComponent implements OnInit {

  tableSettings: any = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: null
    },
    columns: {
      first_name: {
        title: 'Nome'
      },
      last_name: {
        title: 'Sobrenome'
      },
      email: {
        title: 'E-mail'
      },
      gender: {
        title: 'Sexo'
      },
      level: {
        title: 'Nível'
      }
    }
  };

  people: Array<any> = []

  constructor(public personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.people = this.personService.loadAllPeople();
  }

  generate() {
    this.personService.generatePerson().then(person => {
      this.openPerson(person)
    });
  }

  selectRow(event) {
    this.openPerson(event.data);
  }


  openPerson(person) {
    this.router.navigate(['person/', person.id]);
  }

}
