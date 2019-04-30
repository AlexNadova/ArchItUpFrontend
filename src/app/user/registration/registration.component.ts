import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { User } from "src/app/models/user"; //imports user model
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { NavigationBarService } from "src/app/navigation-bar/navigation-bar.service";

//The @Component selector value of "app-registration" means you can drop this form in a parent template with a <app-registration> tag.
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  //users$: Object;
  model = new User("", "", "", "", "");
  submitted = false;

  constructor(
    private data: UserService,
    private http: HttpClient,
    private nav: NavigationBarService
  ) {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.data.register(form);
  }

  newUser() {
    this.model = new User("", "", "", "", "");
  }

  // TODO: Remove this when we're done
  //diagnostic property to return a JSON representation of the model.
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  //code executed when this component loads
  ngOnInit() {
    /*get users example: 
    this.data.getUsers().subscribe(data=> this.users$ =data)
    this would be for one in profile: this.data.getUser().subscribe(data=> this.users$ =data)
    */
    this.nav.hide();
  }
}
