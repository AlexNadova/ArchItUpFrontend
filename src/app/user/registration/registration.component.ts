import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { User } from "src/app/models/user"; //imports user model
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";


  const httpheaders= new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": "bestsecretever",
    "Access-Control-Allow-Origin": "localhost:4200/register"
  })


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

  constructor(private data: UserService, private http: HttpClient) {}
  user = {
    firstName: "frontend",
    lastName: "user",
    email: "f.user@mail.com",
    password: "faasdeDD5",
    phone: "1111220"
  };

  onSubmit(form: NgForm) {
    this.submitted = true;
    //this.data.register(form);
    return this.http
      .post("localhost:4000/api/user/signup", this.user,{headers:httpheaders})
      .subscribe(err => {
        if (err) console.log(err);
        console.log("Success");
      });
    console.log(form.value);
  }

  newUser() {
    this.model = new User(2, "", "", "", "", "");
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
  }
}
