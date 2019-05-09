import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationBarService } from 'src/app/navigation-bar/navigation-bar.service';
import { FooterService } from 'src/app/footer/footer.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //when from is submitted hide it
  submitted = false;

  userForm: NgForm;
  loading = false;
  returnUrl: string;
  error= '';

  constructor(
    private userService: UserService,
    public router: Router,
   private route: ActivatedRoute,
    private nav: NavigationBarService,
    private footer: FooterService,
    private authenticationService: AuthenticationService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
   }

  ngOnInit() {
    this.nav.hide();
    this.footer.hide();
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }
  showAll() {
    this.nav.show();
    this.footer.show();
  }

  OnSubmit(userForm: NgForm) {
    this.submitted = true;

     // stop here if form is invalid
     if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.userForm.controls.email.value, this.userForm.controls.password.value)
        .pipe(first())
        .subscribe(
            data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
              this.error = error;
              this.loading = false;
            });
  }
}
