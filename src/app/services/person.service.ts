import { Utils } from './../helpers/utils';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PersonService {

  private levels: any = {
    junior: "Junior",
    pleno: "Pleno",
    senior: "senior",
  }

  private genders: any = {
    male: "Masculino",
    female: "Feminino"
  }

  private storageDataKey = "angular-teams-orfeus__people"
  private data: any = {}

  constructor(private http: Http) {
    let storageData = localStorage.getItem(this.storageDataKey);
    if (storageData) {
      this.data = JSON.parse(storageData);
    }
  }

  getTotal() : number{
    return Object.keys(this.data).length
  }

  loadPerson(id): any {
    return this.data[id];
  }

  savePerson(person) {
    this.data[person.id] = person;
    this.saveData();
  }

  deletePerson(id){
    delete this.data[id];
    this.saveData();
  }

  loadAllPeople() {
    return Utils.objectToArray(this.data);
  }

  loadFreePeople() : Array<any>{
    let all = this.loadAllPeople();
    let result = []
    for (var i in all){
     let person = all[i];
     if (!person.team || person.team == null || person.team == "" || person.team == "0" || person.team == 0 ){
       result.push(person)
     }
    }
    return result;
  }

  loadTeamPeople(teamId) : Array<any>{
    let all = this.loadAllPeople();
    let result = []
    teamId = ""+teamId;
    for (var i in all){
     let person = all[i];
     if (person.team == teamId){
       result.push(person)
     }
    }
    return result;
  }

  loadTeamGroupPeople() : any{
    let all = this.loadAllPeople();
    let result = {}
    for (var i in all){
     let person = all[i];
     if (!person.team || person.team == ""){
       person.team = "0"
     }
     if(!result[person.team]){
       result[person.team] = []
     }
     result[person.team].push(person)
    }
    return result;
  }

  loadLevelGroupPeople() : any{
    let all = this.loadAllPeople();
    let result = {}
    for (var i in all){
     let person = all[i];
     if(!result[person.level]){
       result[person.level] = []
     }
     result[person.level].push(person)
    }
    return result;
  }

  loadGenderGroupPeople() : any{
    let all = this.loadAllPeople();
    let result = {}
    for (var i in all){
     let person = all[i];
     if(!result[person.gender]){
       result[person.gender] = []
     }
     result[person.gender].push(person)
    }
    return result;
  }
  

  generatePerson() {
    return new Promise<any>((resolve, reject) => {
      let url = "https://randomuser.me/api/?results=" + 1;
      this.http.get(url).subscribe(response => {
        let responsePerson = response.json().results[0];
        let person: any = this.formatPersonFromApi(responsePerson);
        person.first_name = Utils.capitalizeFirstLetter(person.first_name);
        person.last_name = Utils.capitalizeFirstLetter(person.last_name);
        person.id = Utils.generateUniqueId();
        person.level = Utils.getRandomValueFromArray(this.getLevelArray());
        this.savePerson(person);
        resolve(person);
      })
    })
  }

  getLevelArray(): Array<any> {
    let list: Array<any> = []
    for (var i in Object.keys(this.levels)) {
      let key = Object.keys(this.levels)[i]
      list.push(key);
    }
    return list;
  }

  getGenderArray(): Array<any> {
    let list: Array<any> = []
    for (var i in Object.keys(this.genders)) {
      let key = Object.keys(this.genders)[i]
      list.push(key);
    }
    return list;
  }

  getGenderDisplay(gender){
    return this.genders[gender]
  }

  getLevelDisplay(level){
    return this.levels[level]
  }

  private formatPersonFromApi(apiPerson): any {
    return {
      id: null,
      email: apiPerson.email,
      first_name: apiPerson.name.first,
      last_name: apiPerson.name.last,
      gender: apiPerson.gender,
      phone: apiPerson.phone,
      team: null,
      image: apiPerson.picture.large,
      level: null
    }
  }

  private saveData() {
    localStorage.setItem(this.storageDataKey, JSON.stringify(this.data));
  }
}
