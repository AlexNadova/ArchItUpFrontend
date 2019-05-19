import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor() {}

  public isAuthenticated(): boolean {
    let jwtHelper: JwtHelperService = new JwtHelperService();
    //get token
    const token = localStorage.getItem("token");

    if (
      localStorage.getItem("token") === null ||
      jwtHelper.isTokenExpired(token)
    ) {
      localStorage.clear();
      return false;
    }
    // Check whether the token is expired and return true or false
    return true;
  }

  public getToken() {
    return localStorage.getItem("token");
  }
}
