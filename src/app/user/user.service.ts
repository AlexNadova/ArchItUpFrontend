import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

const httpheaders = new HttpHeaders({
  "Content-Type": "application/json"
});

const loginUrl = "http://localhost:4000/api/user/login";
const userUrl = "http://localhost:4000/api/user/";
const registerUrl = "http://localhost:4000/api/user/signup";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  id: String;
  user = {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: ""
  };

  loginUser = {
    email: "",
    password: ""
  };

  register(form: NgForm) {
    this.user = {
      id: "",
      firstName: form.value.first_name,
      lastName: form.value.last_name,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone
    };
    console.log(JSON.stringify(this.user));
    return this.http
      .post<User>(registerUrl, JSON.stringify(this.user), {
        headers: httpheaders
      })
      .subscribe(err => {
        if (err) console.log(err);
        console.log("Success");
      });
    //console.log(form.value);
  }

  getUser(): Observable<any> {
    this.id = this.currentUserSubject.value._id;
    //console.log(this.id);
    return this.http.get<User>(userUrl + "5cd7393868b4e90a3c1318a7", {
      headers: httpheaders
    });
  }

  login(form: NgForm): Observable<any> {
    this.loginUser = {
      email: form.value.email,
      password: form.value.password
    };
    return this.http
      .post<any>(loginUrl, JSON.stringify(this.loginUser), {
        headers: httpheaders
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    this.currentUserSubject.next(null);
  }

  deleteUser(): Observable<any> {
    //this.id =
    return this.http.delete<User>(userUrl + "5cd2b7e252528710788d7020", {
      headers: httpheaders
    });
  }
}
