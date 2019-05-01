import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthorisationService } from "./authentication.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthorisationService, public router: Router) {}

  // returns a boolean indicating whether or not navigation to a route should be allowed. If the user isn’t authenticated,
  //they are re-routed to some other place (we will use login-it's implemented also in app-routing.module.ts)
  canActivate(): boolean {
    //perhaps use canLoad instead of canActivate??
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
