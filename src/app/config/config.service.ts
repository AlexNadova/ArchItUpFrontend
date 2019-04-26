//separate data access logic. component will be easier to test and understand. this code can be reused
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";

export interface Config {
  registerUrl: string;
  textfile: string;
}

/**@Injectable({
  providedIn: 'root'
}) */
@Injectable()
export class ConfigService {
  configUrl = "assets/config.json";

  constructor(private http: HttpClient) {}

  //get config.js file; with <Config> we can tell HttpClient the type of response to make consuming the output easier and more obvious.
  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  //The response body doesn't return all the data you may need. Sometimes servers return special headers or status codes to indicate 
  //certain conditions that are important to the application workflow. Tell HttpClient that you want the full response with the observe option:
  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(this.configUrl, { observe: "response" });
  } //Now HttpClient.get() returns an Observable of typed HttpResponse rather than just the JSON data.

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
