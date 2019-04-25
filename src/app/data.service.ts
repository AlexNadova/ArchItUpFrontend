//for reusable code that more components can access; e.g. connect to API to get data from DB
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
}
