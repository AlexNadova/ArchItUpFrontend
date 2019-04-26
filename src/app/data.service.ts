//for reusable code that more components can access; e.g. connect to API to get data from DB
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //getting code example:
  /*getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users')
  }*/
  //for profile comp.
  /*getUser(userId){
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+userId)
  }*/
}
