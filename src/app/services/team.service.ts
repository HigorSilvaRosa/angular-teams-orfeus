import { Utils } from './../helpers/utils';
import { Injectable } from '@angular/core';

@Injectable()
export class TeamService {

  private storageDataKey = "angular-teams-orfeus__teams"
  private data : any = {}

  constructor() {
    let storageData = localStorage.getItem(this.storageDataKey);
    if (storageData){
      this.data = JSON.parse(storageData);
    }
  }

  generateTeam(){
    return new Promise<any>((resolve, reject) => {
      let team : any = {
        id: Utils.generateUniqueId(),
        name: "Equipe sem nome",
        color: Utils.getRandomColor(),
        description: ""
      }
      this.saveTeam(team);
      resolve(team);
    })
  }

  loadTeam(id){
    return this.data[id];
  }

  saveTeam(team){
    this.data[team.id] = team;
    this.saveData();
  }

  deleteTeam(id){
    delete this.data[id];
    this.saveData();
  }

  loadAllTeams(){
    return Utils.objectToArray(this.data);
  }

  private saveData(){
    localStorage.setItem(this.storageDataKey, JSON.stringify(this.data));
  }

}
