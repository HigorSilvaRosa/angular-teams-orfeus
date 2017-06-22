import { TeamService } from './../../services/team.service';
import { PersonService } from './../../services/person.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(public personService: PersonService, public teamService: TeamService) { }

  peopleTotal: number = 0;

  public chartPeopleTeamLabels: Array<string> = [];
  public chartPeopleTeamData: Array<number> = [];

  public chartPeopleLevelLabels: Array<string> = [];
  public chartPeopleLevelData: Array<number> = [];

  public chartPeopleGenderLabels: Array<string> = [];
  public chartPeopleGenderData: Array<number> = [];

  public chartTeamsLevelLabels: Array<string> = [];
  public chartTeamsLevelData: Array<any> = [];

  ngOnInit() {
    this.peopleTotal = this.personService.getTotal();
    let teamGroupPeople = this.personService.loadTeamGroupPeople();
    for (var i in Object.keys(teamGroupPeople)) {
      let key = Object.keys(teamGroupPeople)[i];
      let label = "(sem equipe)";
      if (key != "0") {
        let team = this.teamService.loadTeam(key);
        label = team.name;
      }
      this.chartPeopleTeamLabels.push(label);
      this.chartPeopleTeamData.push(teamGroupPeople[key].length);
    }

    let levelGroupPeople = this.personService.loadLevelGroupPeople();
    for (var i in Object.keys(levelGroupPeople)) {
      let key = Object.keys(levelGroupPeople)[i];
      let label = this.personService.getLevelDisplay(key);
      this.chartPeopleLevelLabels.push(label);
      this.chartPeopleLevelData.push(levelGroupPeople[key].length);
    }

    let genderGroupPeople = this.personService.loadGenderGroupPeople();
    for (var i in Object.keys(genderGroupPeople)) {
      let key = Object.keys(genderGroupPeople)[i];
      let label = this.personService.getGenderDisplay(key);
      this.chartPeopleGenderLabels.push(label);
      this.chartPeopleGenderData.push(genderGroupPeople[key].length);
    }

    let teamsData = {}
    for (var i in Object.keys(teamGroupPeople)) {
      let key = Object.keys(teamGroupPeople)[i];
      let label = "(sem equipe)";
      if (key != "0") {
        let team = this.teamService.loadTeam(key);
        label = team.name;
      }
      this.chartTeamsLevelLabels.push(label);
      if (!teamsData[key]) {
        teamsData[key] = {}
      }
      for (var i in teamGroupPeople[key]) {
        let person = teamGroupPeople[key][i];
        if (!teamsData[key][person.level]) {
          teamsData[key][person.level] = 0;
        }
        teamsData[key][person.level] += 1;
      }
    }

    let levels = this.personService.getLevelArray();
    for (var i in levels) {
      let key = levels[i];
      let chartData = {
        label: this.personService.getLevelDisplay(key),
        data: []
      }
      for (var i in Object.keys(teamsData)) {
        let teamKey = Object.keys(teamsData)[i];
        let value = 0;
        if (teamsData[teamKey][key]) {
          value = teamsData[teamKey][key];
        }
        chartData.data.push(value);
      }
      this.chartTeamsLevelData.push(chartData);
    }
  }

}
