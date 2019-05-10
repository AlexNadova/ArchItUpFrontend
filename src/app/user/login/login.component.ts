import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavigationBarService } from "src/app/navigation-bar/navigation-bar.service";
import { FooterService } from "src/app/footer/footer.service";
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  userForm: NgForm;

  constructor(
    private userService: UserService,
     public router: Router,
    private nav: NavigationBarService,
    private footer: FooterService
  ) {}
  showAll() {
    this.nav.show();
    this.footer.show();
  }

  OnSubmit(form: NgForm) {
    this.userService.login(form).subscribe(
      res => {
        localStorage.setItem("token", res.token);
        this.router.navigate(["profile"]);
      },
      err => console.log(err)
    );
  }
  ngOnInit() {
    this.nav.hide();
    this.footer.hide();
  }
}
