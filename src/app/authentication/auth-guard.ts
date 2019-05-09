import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import {  AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService, 
    public router: Router
    ) {}

  // returns a boolean indicating whether or not navigation to a route should be allowed. If the user isn’t authenticated,
  //they are re-routed to some other place (we will use login-it's implemented also in app-routing.module.ts)

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    //if(currentUser) {
    if (localStorage.getItem('currentUser')) {
      // check if route is redirected by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === 1) {
        //role not authorised so redirect to home page
        this.router.navigate(["/home"]);
        return false;
      }
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this. router.navigate(["/login"], {queryParams: {returnUrl: state.url}}
    );
    return false;
  }
}
