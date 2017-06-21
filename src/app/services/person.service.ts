import { Utils } from './../helpers/utils';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PersonService {

  private levels : any = {
    junior: "Junior",
    pleno: "Pleno",
    senior: "senior",
  }
  
  private storageDataKey = "angular-teams-orfeus__people"
  private data : any = {}

  constructor(private http : Http) {
    let storageData = localStorage.getItem(this.storageDataKey);
    if (storageData){
      this.data = JSON.parse(storageData);
    }
  }

  getPerson(id) : any{
    return this.data[id];
  }

  generatePerson(){
    return new Promise<any>((resolve, reject) => {
      let url = "https://randomuser.me/api/?results="+1;
      this.http.get(url).subscribe( response => {
        let responsePerson = response.json().results[0];
        let person : any  = this.formatPersonFromApi(responsePerson);
        person.id = Utils.generateUniqueId();
        person.level = Utils.getRandomValueFromArray(this.getLevelArray());
        this.data[person.id] = person;
        resolve(person);
      })
    })
  }

  getLevelArray() : Array<any>{
    let list : Array<any> = []
    for (var i in Object.keys(this.levels)){
     list.push(i);
    }
    return list;
  }

  private formatPersonFromApi(apiPerson) : any{
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
}
