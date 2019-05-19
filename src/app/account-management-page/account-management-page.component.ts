import { Component, OnInit } from '@angular/core';
import { FooterService } from '../footer/footer.service';
import { NavigationBarService } from '../navigation-bar/navigation-bar.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-account-management-page',
  templateUrl: './account-management-page.component.html',
  styleUrls: ['./account-management-page.component.css']
})
export class AccountManagementPageComponent implements OnInit {

  constructor(
    private nav: NavigationBarService,
    private footer: FooterService,
    public router: Router
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
