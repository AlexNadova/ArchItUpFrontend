import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
/*
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
*/

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>('/user/login', { email, password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}