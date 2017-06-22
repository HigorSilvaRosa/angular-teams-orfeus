import { TeamService } from './../../services/team.service';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css']
})
export class PersonPageComponent implements OnInit {

  public person : any;
  public genders : Array<any> [];
  public levels : Array<any> [];
  public teams : Array<any> [];

  constructor(private route: ActivatedRoute, public personService : PersonService, public teamService : TeamService) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       let id = parseInt(params['id']);
       this.person = this.personService.loadPerson(id);
       this.genders = this.personService.getGenderArray();
       this.levels = this.personService.getLevelArray();
       this.teams = this.teamService.loadAllTeams();
    });
  }

  editPerson(form){
    this.personService.savePerson(this.person);
  }

}
