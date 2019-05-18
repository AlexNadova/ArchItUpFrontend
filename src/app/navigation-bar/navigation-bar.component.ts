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
  public routerLinkVariable = "/home";
  currentUrl: String;
  private readonly notifier: NotifierService;

  constructor(
    private router: Router,
    public nav: NavigationBarService,
    private userService: UserService,
    public authService: AuthenticationService,
    private notifierService: NotifierService
  ) {
    this.notifier = notifierService;
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
  updateRouterLinkToArticles() {
    return (this.routerLinkVariable = "/articles");
  }
  logout() {
    this.userService.logout();
    this.router.navigate(["login"]);
    this.notifier.notify("success", "Logged off.");
  }
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
