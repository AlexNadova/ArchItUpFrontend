import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavigationBarService } from "src/app/navigation-bar/navigation-bar.service";
import { FooterService } from "src/app/footer/footer.service";
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userForm: NgForm;
  private readonly notifier: NotifierService;

  constructor(
    private userService: UserService,
    public router: Router,
    private nav: NavigationBarService,
    private footer: FooterService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }
  showAll() {
    this.nav.show();
    this.footer.show();
  }
  hideAll() {
    this.nav.hide();
    this.footer.hide();
  } 

  OnSubmit(form: NgForm) {
    this.userService.login(form).subscribe(
      res => {
        localStorage.clear();
        localStorage.setItem("_id", res.id);
        localStorage.setItem("token", res.token);
        this.router.navigate(["/profile",res.id]);
        this.showAll();
        this.notifier.notify("success", "User successfully logged.");
      },
      err => this.notifier.notify("error", "Error occured: " + err.message)
    );
  }
  navigateTo() {
    if (this.router.url === "profile") {
      this.showAll();
    } else {
      this.router.navigate(["login"]);
      this.hideAll();
    }
  }
  ngOnInit() {
    this.nav.hide();
    this.footer.hide();
  }
}
