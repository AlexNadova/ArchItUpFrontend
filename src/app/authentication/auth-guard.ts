import { Injectable } from "@angular/core";
import { Router, CanActivate, CanLoad } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this.authenticationService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
}
export class NotAuth implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authenticationService.isAuthenticated()) {
      return true;
    }
    this.router.navigate([""]);
    return false;
  }
}
