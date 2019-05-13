import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";
import { NgForm } from "@angular/forms";

import { NavigationBarService } from "src/app/navigation-bar/navigation-bar.service";
import { FooterService } from "src/app/footer/footer.service";
import { Router } from "@angular/router";
import { NotifierService } from 'angular-notifier';

//The @Component selector value of "app-registration" means you can drop this form in a parent template with a <app-registration> tag.
@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  private readonly notifier: NotifierService;

  constructor(
    private userService: UserService,
    public router: Router,
    private nav: NavigationBarService,
    private footer: FooterService,
    notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  onSubmit(form: NgForm) {
    this.userService.register(form);
    this.notifier.notify( 'success', 'User successfully registered.' );
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
