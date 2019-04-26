import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/data.service";
import { User } from "src/app/models/user"; //imports user model

//The @Component selector value of "app-registration" means you can drop this form in a parent template with a <app-registration> tag.
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  //users$: Object;
  model = new User(
    1,
    "Alex",
    "Nadova",
    "Password7",
    "alexandranadova@gmail.com",
    "0917 930 891"
  );
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  newUser() {
    this.model = new User(2, '', '', '', '', '');
  }

  // TODO: Remove this when we're done
  //diagnostic property to return a JSON representation of the model. 
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  constructor(private data: DataService) {}

  //code executed when this component loads
  ngOnInit() {
    /*get users example: 
    this.data.getUsers().subscribe(data=> this.users$ =data)
    this would be for one in profile: this.data.getUser().subscribe(data=> this.users$ =data)
    */
  }
}
