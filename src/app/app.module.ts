//app.module.ts defines the application's root module. In it you identify the external modules you'll use
//in the application and declare the components that belong to this module
import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
//Because template-driven forms are in their own module, you need to add the FormsModule to the array of imports
//for the application module before you can use forms.
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavigationBarComponent } from "./navigation-bar/navigation-bar.component";
import { FooterComponent } from "./footer/footer.component";
import { RegistrationComponent } from "./user/registration/registration.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { LoginComponent } from "./user/login/login.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HomePageComponent } from "./home-page/home-page.component";
import { AboutUsPageComponent } from "./about-us-page/about-us-page.component";
import { HowToUsePageComponent } from "./how-to-use-page/how-to-use-page.component";
import { AdminComponent } from "./user/admin/admin.component";

import { TokenInterceptorService } from "./authentication/token-interceptor.service";
import { AuthGuard, NotAuth } from "./authentication/auth-guard";
import { UserService } from "./user/user.service";
import { AuthenticationService } from "./authentication/authentication.service";
import { NotifierModule } from "angular-notifier";
import { HelpPageComponent } from './help-page/help-page.component';
import { AccountManagementPageComponent } from './account-management-page/account-management-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    RegistrationComponent,
    ProfileComponent,
    HomePageComponent,
    AboutUsPageComponent,
    HowToUsePageComponent,
    LoginComponent,
    AdminComponent,
    HelpPageComponent,
    AccountManagementPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NotifierModule
  ],
  providers: [
    AuthGuard,
    NotAuth,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
