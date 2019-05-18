import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NavigationBarService } from '../navigation-bar/navigation-bar.service';
import { FooterService } from '../footer/footer.service';

@Component({
  selector: 'app-how-to-use-page',
  templateUrl: './how-to-use-page.component.html',
  styleUrls: ['./how-to-use-page.component.css']
})
export class HowToUsePageComponent implements OnInit {

  constructor(
    public router: Router,
    private nav: NavigationBarService,
    private footer: FooterService,
  ) { 
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  public routerLinkVariable = "/home";
  currentUrl: String;

  ngOnInit() {
  }

}
