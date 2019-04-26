import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = "assets/config.json";
  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get(this.configUrl);
  }

  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.data = {
          registerUrl: data['heroesUrl'],
          textfile:  data['textfile']
      });
  }
}
