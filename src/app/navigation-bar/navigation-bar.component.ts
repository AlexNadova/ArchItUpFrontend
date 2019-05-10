import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { NavigationBarService } from "./navigation-bar.service";
import {UserService} from '../user/user.service'

@Component({
  selector: "app-navigation-bar",
  templateUrl: "./navigation-bar.component.html",
  styleUrls: ["./navigation-bar.component.css"]
})
export class NavigationBarComponent implements OnInit {
  public routerLinkVariable = "/home";
  currentUrl: String;
  public id = 1; //need fix

  constructor(private router: Router, public nav: NavigationBarService, private userService:UserService) {
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
  logout(){
    this.userService.logout();
    this.router.navigate(['home']);
  }
}
