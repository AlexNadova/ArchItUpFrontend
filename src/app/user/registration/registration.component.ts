import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { NgForm } from "@angular/forms";

import { NavigationBarService } from "src/app/navigation-bar/navigation-bar.service";
import { FooterService } from "src/app/footer/footer.service";
import { Router } from "@angular/router";

//The @Component selector value of "app-registration" means you can drop this form in a parent template with a <app-registration> tag.
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  //when form is submitted hide it
  submitted = false;

  constructor(
    private userService: UserService,
    public router: Router,
    private nav: NavigationBarService,
    private footer: FooterService
  ) {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    this.userService.register(form);
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
