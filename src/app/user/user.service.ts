import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User, FullUser } from '../models/user';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { from, Observable } from 'rxjs';

const httpheaders = new HttpHeaders({
  "Content-Type": "application/json",
  "Authorization": "bestsecretever"
});

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  user={    
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: ""};

  register(form: NgForm) {
    this.user = {
      firstName: form.value.first_name,
      lastName: form.value.last_name,
      email: form.value.email,
      password: form.value.password,
      phone: form.value.phone
    }
    console.log(JSON.stringify(this.user));
    return this.http
      .post<User>("http://localhost:4000/api/user/signup", JSON.stringify(this.user), {
        headers: httpheaders
      })
      .subscribe(err => {
        if (err) console.log(err);
        console.log("Success");
      });
    //console.log(form.value);
  }

  getUser(): Observable<any>{
    return this.http.get<FullUser>("http://localhost:4000/api/user/5cd2ad96272be528989dcb9b");
  }
  
  login(form: NgForm) {
    this.http.post("http://localhost:4000/api/user/login", form.value);
    console.log(form.value);
  }
  
  getAll() {
    return this.http.get<User[]>(`http://localhost:4000/api/user/users`);
}

}
