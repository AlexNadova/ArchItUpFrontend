import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  public routerLinkVariable = "/home";
  public id = 0;
  constructor() { }

  ngOnInit() {
  }

  updateRouterLinkToRegister(){
    this.routerLinkVariable = '/register';
  }

  updateRouterLinkToProfile(){
    this.routerLinkVariable = '/profile';
  }
}
