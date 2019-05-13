//import  components we want to route
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RegistrationComponent } from "./user/registration/registration.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { AuthGuard } from "./authentication/auth-guard";
import { AboutUsPageComponent } from "./about-us-page/about-us-page.component";
import { HowToUsePageComponent } from "./how-to-use-page/how-to-use-page.component";
import { LoginComponent } from "./user/login/login.component";
import { ErrorsComponent } from "./errors/errors/errors.component";
import { AdminComponent } from "./user/admin/admin.component";
import { Role } from "./models/role";
//define routes
const routes: Routes = [
  {
    path: "home", //for Home page
    component: HomePageComponent,
    data: {
      title: "Home page"
    }
  },
  {
    path: "", //-page that loads when app loads - for Home page
    redirectTo: "/home", //when user calls architup.sk it redirects to architup.sk/home
    pathMatch: "full"
  },
  //{ path: "**", component: PageNotFoundComponent }, //any other calls - page not found
  {
    path: "register", // e.g.: architup.sk/register
    component: RegistrationComponent, //component for path
    data: {
      title: "Registration"
    }
  },
  {
    path: "profile",
    component: ProfileComponent,
    //guard is applied to all routes we wish to protect (it's only for users with tokens - so logged)
    canActivate: [AuthGuard],
    data: {
      title: "Profile"
    }
  },
  {
    path: "about-us",
    component: AboutUsPageComponent,
    data: {
      title: "About us page"
    }
  },
  {
    path: "help",
    component: HowToUsePageComponent,
    data: {
      title: "Help page"
    }
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login"
    }
  },
  {
    path: "error",
    component: ErrorsComponent,
    data: {
      title: "Error"
    }
  },
  // { //this could be used for admin access (e.g. reports)
  //   path: 'admin',
  //   component: AdminComponent,
  //   // We can now use this RoleGuardService for any of our routes to protect them. (only user with role admin can access this).
  //   // canActivate is still used to control navigation, but this time object is passed on the data property which has
  //   // that expectedRole key declared in the RoleGuardService.
  //   canActivate: [AuthGuard],
  //   data: {
  //     roles: [Role.Admin]
  //   }
  //  },
  // otherwise redirect to home
  {
    path: "**",
    component: ErrorsComponent,
    data: { error: 404 }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
