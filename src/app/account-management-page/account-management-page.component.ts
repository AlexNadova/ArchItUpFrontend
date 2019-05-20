import { Component, OnInit } from '@angular/core';
import { FooterService } from '../footer/footer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-management-page',
  templateUrl: './account-management-page.component.html',
  styleUrls: ['./account-management-page.component.css']
})
export class AccountManagementPageComponent implements OnInit {

  constructor(
    private footer: FooterService,
    public router: Router
  ) { }
 
  ngOnInit() {
    this.footer.hide();
  }

}
