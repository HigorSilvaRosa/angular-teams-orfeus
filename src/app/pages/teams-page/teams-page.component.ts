import { Router } from '@angular/router';
import { TeamService } from './../../services/team.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css']
})
export class TeamsPageComponent implements OnInit {

  teams : Array<any> = []

  constructor(public teamService : TeamService, private router : Router) { }

  ngOnInit() {
    this.teams = this.teamService.loadAllTeams();
  }

  generate(){
    this.teamService.generateTeam().then(team => {
      this.openTeam(team);
    });
  }

  openTeam(team){
    this.router.navigate(['team/', team.id]);
  }

}
