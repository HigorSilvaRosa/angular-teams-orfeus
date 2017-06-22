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

  loadPerson(id): any {
    return this.data[id];
  }

  savePerson(person) {
    this.data[person.id] = person;
    this.saveData();
  }

  loadAllPeople() {
    return Utils.objectToArray(this.data);
  }

  generatePerson() {
    return new Promise<any>((resolve, reject) => {
      let url = "https://randomuser.me/api/?results=" + 1;
      this.http.get(url).subscribe(response => {
        let responsePerson = response.json().results[0];
        let person: any = this.formatPersonFromApi(responsePerson);
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
