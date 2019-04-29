//app.module.ts defines the application's root module. In it you identify the external modules you'll use
//in the application and declare the components that belong to this module
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
//Because template-driven forms are in their own module, you need to add the FormsModule to the array of imports
//for the application module before you can use forms.
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    FooterComponent,
    RegistrationComponent,
    ProfileComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
