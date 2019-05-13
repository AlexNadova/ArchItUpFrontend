import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../models/user";
import { Observable} from "rxjs";

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
  }

  getUser(): Observable<any> {
    this.id = localStorage.getItem("_id");
    return this.http.get<User>(userUrl + this.id, {
      headers: httpheaders
    });
  }

  login(form: NgForm): Observable<any> {
    this.logout();
    this.loginUser = {
      email: form.value.email,
      password: form.value.password
    };
    return this.http
      .post<any>(loginUrl, JSON.stringify(this.loginUser), {
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
}
