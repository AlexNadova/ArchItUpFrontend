import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthorisationService } from "./authorisation.service";
import decode from "jwt-decode";

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthorisationService, public router: Router) {}

  // ActivatedRouteSnapshot give us access to the data property for a given route. This data property is useful because we
  //can pass an object with some custom properties to it from our route configuration. We can then pick up that custom data
  //in the guard to help with making routing decisions.
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config on the data property
    const expectedRole = route.data.expectedRole;

    const token = localStorage.getItem("token");

    // decode the token to get its payload
    const tokenPayload = decode(token);
    //we’re looking for a role that we expect the user to have to check if they are to be allowed access to the route.
    //If the user isn’t authenticated or if they don’t have the role we expect them to have in their token payload,
    // we cancel navigation and have them log in. Otherwise, they are free to proceed.
    if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}
