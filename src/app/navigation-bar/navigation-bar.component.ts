import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { NavigationBarService } from "./navigation-bar.service";
import { UserService } from "../user/user.service";
import { AuthenticationService } from "../authentication/authentication.service";

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.css"]
})
export class NavigationBarComponent implements OnInit {
  public routerLinkVariable = "/home";
  currentUrl: String;

  constructor(
    private router: Router,
    public nav: NavigationBarService,
    private userService: UserService,
    public authService: AuthenticationService,
  ) {
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  ngOnInit() {}

  updateRouterLinkToRegister() {
    return (this.routerLinkVariable = "/register");
  }
  updateRouterLinkToProfile() {
    return (this.routerLinkVariable = "/profile");
  }
  updateRouterLinkToLogin() {
    return (this.routerLinkVariable = "/login");
  }
  updateRouterLinkToHome() {
    return (this.routerLinkVariable = "/home");
  }
  logout() {
    this.userService.logout();
  }
}
