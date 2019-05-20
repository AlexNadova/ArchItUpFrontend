import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { FooterService } from "./footer.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  constructor(public footer: FooterService, private router: Router) {
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  public routerLinkVariable = "/home";
  currentUrl: String;

  updateRouterLinkToHelp() {
    return (this.routerLinkVariable = "/help");
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  ngOnInit() {}
}
