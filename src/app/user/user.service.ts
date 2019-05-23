import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";

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
  constructor(private http: HttpClient) {}
  id: string;

  loginUser = {
    email: "",
    password: ""
  };

  register(user: User): Observable<any> {
    return this.http.post<User>(registerUrl, JSON.stringify(user), {
      headers: httpheaders
    });
  }

  getUser(id): Observable<any> {
    return this.http.get<User>(userUrl + id, {
      headers: httpheaders
    });
  }

  login(form: NgForm): Observable<any> {
    this.loginUser = {
      email: form.value.email,
      password: form.value.password
    };
    return this.http.post<any>(loginUrl, JSON.stringify(this.loginUser), {
      headers: httpheaders
    });
  }

  logout() {
    localStorage.clear();
  }

  deleteUser(): Observable<any> {
    this.id = localStorage.getItem("_id");
    return this.http.delete<User>(userUrl + this.id, {
      headers: httpheaders
    });
  }

  updateUser(user): Observable<any> {
    console.log(JSON.stringify(user));
    this.id = localStorage.getItem("_id");
    return this.http.patch<User>(userUrl + this.id, JSON.stringify(user), {
      headers: httpheaders
    });
  }
}
