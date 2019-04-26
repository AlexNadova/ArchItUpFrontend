//separate data access logic. component will be easier to test and understand. this code can be reused
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";

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
}
