import { Component, OnInit } from "@angular/core";
import { NavigationBarService } from "../navigation-bar/navigation-bar.service";
import { FooterService } from "../footer/footer.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.css"]
})
export class HomePageComponent implements OnInit {
  constructor(
    private nav: NavigationBarService,
    private footer: FooterService
  ) {}

  ngOnInit() {
    this.nav.show;
    this.footer.show;
  }
}
