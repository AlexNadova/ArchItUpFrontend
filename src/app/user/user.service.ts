import { Injectable } from '@angular/core';
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  register(form: NgForm) {
    this.http.post("http://localhost:4000/api/user/signup", form.value);
    console.log(form.value);
  }
}
