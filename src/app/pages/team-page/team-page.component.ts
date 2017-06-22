import { TeamService } from './../../services/team.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  public team : any = {
    "id": 0,
    "name": "",
    "color": "",
    "description": ""
  }; 

  constructor(private route: ActivatedRoute, public teamService : TeamService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
       let id = parseInt(params['id']);
       this.team = this.teamService.loadTeam(id);
    });
  }

  editTeam(form){
    this.teamService.saveTeam(this.team);
  }

}
