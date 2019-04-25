import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Observable } from 'rxjs'; //to hold data returned from API

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  users$: Object;
  constructor(private data:DataService){}

  //code executed when this component loads
  ngOnInit() {
    //get users example: 
    this.data.getUsers().subscribe(data=> this.users$ =data)  
  }
}
