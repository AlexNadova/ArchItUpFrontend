import { Component, OnInit } from '@angular/core';
import { FooterService } from '../footer/footer.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrls: ['./help-page.component.css']
})
export class HelpPageComponent implements OnInit {

  constructor(
    private footer: FooterService,
    public router: Router
  ) { 
    router.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
  }

  public routerLinkVariable = "/home";
  currentUrl: String;

  updateRouterLinkToHowToUse() {
    return (this.routerLinkVariable = "/how-to-use");
  }

  updateRouterLinkToAccountManagement() {
    return (this.routerLinkVariable = "/account-management");
  }
  // When the user clicks on the button, scroll to the top of the document (fx. "/how-to-use-page").
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  ngOnInit() {
    this.footer.hide();
  }
}
