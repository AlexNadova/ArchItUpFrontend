import { Component, OnInit } from "@angular/core";
import { NavigationBarService } from "src/app/navigation-bar/navigation-bar.service";
import { FooterService } from "src/app/footer/footer.service";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  constructor(
    private nav: NavigationBarService,
    private footer: FooterService,
    public router: Router,
  ) {
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  public routerLinkVariable = "/home";
  currentUrl: String;

  ngOnInit() {
    this.nav.show();
    this.footer.show();
  }
}
