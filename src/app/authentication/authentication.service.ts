import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root"
})
export class AuthorisationService {
  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    //get token
    //TO DO: implement get token from db
    const token = localStorage.getItem("token");

    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
