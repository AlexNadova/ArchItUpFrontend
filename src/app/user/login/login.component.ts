import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { NavigationBarService } from 'src/app/navigation-bar/navigation-bar.service';
import { FooterService } from 'src/app/footer/footer.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //when from is submitted hide it
  submitted = false;

  constructor(
    private userService: UserService,
    public router: Router,
    private nav: NavigationBarService,
    private footer: FooterService
  ) { }

  OnSubmit(form:NgForm) {
    this.submitted = true;
    this.userService.login(form);
  }

  showAll() {
    this.nav.show();
    this.footer.show();
    
  }

  ngOnInit() {
    this.nav.hide();
    this.footer.hide();
  }

}
