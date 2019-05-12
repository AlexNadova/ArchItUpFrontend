import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User, FullUser, LoginUser } from "../models/user";
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
  id: String;
  user = {
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
    //this.id = 
    return this.http.get<FullUser>(userUrl + this.id, {
      headers: httpheaders
    });
  }

  login(form: NgForm): Observable<any> {
    this.loginUser = {
      email: form.value.email,
      password: form.value.password
    };
    return this.http.post<LoginUser>(loginUrl, JSON.stringify(this.loginUser), {
      headers: httpheaders
    });
  }

  logout() {
    localStorage.removeItem("token");
  }

  deleteUser(): Observable<any> {
    //this.id = 
    return this.http.delete<LoginUser>(userUrl + this.id, {
      headers: httpheaders
    });
  }
}
