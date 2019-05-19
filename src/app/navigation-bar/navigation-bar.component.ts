import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { NavigationBarService } from "./navigation-bar.service";
import { UserService } from "../user/user.service";
import { AuthenticationService } from "../authentication/authentication.service";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.css"]
})
export class NavigationBarComponent implements OnInit {
  private readonly notifier: NotifierService;
  id = localStorage.getItem("_id");
  constructor(
    private router: Router,
    public nav: NavigationBarService,
    private userService: UserService,
    public authService: AuthenticationService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
  }

  ngOnInit() {}

  logout() {
    this.userService.logout();
    this.router.navigate(["login"]);
    this.notifier.notify("success", "Logged off.");
  }
}
