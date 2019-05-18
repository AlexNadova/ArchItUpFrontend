import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { NgForm } from "@angular/forms";

import { NavigationBarService } from "src/app/navigation-bar/navigation-bar.service";
import { FooterService } from "src/app/footer/footer.service";
import { Router } from "@angular/router";
import { NotifierService } from "angular-notifier";
import { User } from "src/app/models/user";

//The @Component selector value of "app-registration" means you can drop this form in a parent template with a <app-registration> tag.
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  private readonly notifier: NotifierService;
  user: User = {
    _id: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    fieldOfFocus: [] = [],
    education: [] = [],
    workExperience: [] = []
  };

  constructor(
    private userService: UserService,
    private nav: NavigationBarService,
    private footer: FooterService,
    public router: Router,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.register(form);
  }

  register(form: NgForm) {
    console.log(form.value);
    this.user = {
      _id: "",
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      country: "",
      city: "",
      fieldOfFocus: [] = [],
      education: [] = [],
      workExperience: [] = []
    };
    console.log(this.user);
    this.userService.register(this.user).subscribe(
      res => {
        this.router.navigate(["/login"]);
        this.notifier.notify("success", "User successfully registered.");
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }

  //used when you click on Login button after registration is done.
  showAll() {
    this.nav.show();
    this.footer.show();
  }
  //code executed when this component loads
  ngOnInit() {
    this.nav.hide();
    this.footer.hide();
  }
}
