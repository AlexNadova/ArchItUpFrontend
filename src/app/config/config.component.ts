import { Component, OnInit } from "@angular/core";
import { Config, ConfigService } from "./config.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  providers: [ConfigService],
  styleUrls: ["./config.component.css"]
})
export class ConfigComponent implements OnInit {
  error: any;
  headers: string[];
  //The callback in the updated component method receives a typed data object, which is easier and safer to consume:
  config: Config;

  constructor(private configService: ConfigService) {}

  ngOnInit() {}

  //inject ConfigService and call getConfig from config.service
  // Because the service method (getConfig) returns an Observable of configuration data, the component subscribes to the method's return value. The
  // subscription callback copies the data fields into the component's config object, which is data-bound in the component template for display.
  showConfig() {
    this.configService.getConfig().subscribe(
      (data: Config) =>
        (this.config = {
          registerUrl: data["registerUrl"],
          textfile: data["textfile"]
        })
    );
  }

  //The component's showConfigResponse() method displays the response headers as well as the configuration:
  showConfigResponse() {
    this.configService
      .getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key => `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body };
      });
  }
}
