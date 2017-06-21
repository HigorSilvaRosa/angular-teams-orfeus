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

  constructor(private route: ActivatedRoute, public personService : PersonService) {
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       let id = parseInt(params['id']);
       this.person = this.personService.getPerson(id);
       console.log(this.person);
    });
  }

}
