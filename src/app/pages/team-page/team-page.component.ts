import { PersonService } from './../../services/person.service';
import { TeamService } from './../../services/team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

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
      level: {
        title: 'Nível'
      }
    }
  };

  deleteAlertIsVisible = false;

  public team: any = {
    "id": 0,
    "name": "",
    "color": "",
    "description": ""
  };

  teamPeople: Array<any> = [];

  freePeople: Array<any> = [];

  constructor(private route: ActivatedRoute, private router : Router, public teamService: TeamService, public personService: PersonService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = parseInt(params['id']);
      this.team = this.teamService.loadTeam(id);
      this.loadPeople();
    });
  }

  editTeam(form) {
    this.teamService.saveTeam(this.team);
  }


  deleteTeam(){
    this.teamService.deleteTeam(this.team.id);
    this.router.navigate(["teams"])
  }

  selectFreePerson(event) {
    let person = event.data;
    person.team = "" + this.team.id;
    this.personService.savePerson(person);
    this.loadPeople();

  }

  selectTeamPerson(event) {
    let person = event.data;
    person.team = "";
    this.personService.savePerson(person);
    this.loadPeople();
  }

  showDeleteAlert(){
    this.deleteAlertIsVisible = true;
  }

  private loadPeople() {
    this.freePeople = this.personService.loadFreePeople();
    this.teamPeople = this.personService.loadTeamPeople(this.team.id);
  }

  

}
