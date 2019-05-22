//import  components we want to route
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePageComponent } from "./home-page/home-page.component";
import { AuthGuard, NotAuth } from "./authentication/auth-guard";
import { HowToUsePageComponent } from "./how-to-use-page/how-to-use-page.component";
import { RegistrationComponent } from './user/registration/registration.component';
import { OwnerProfileComponent } from './user/owner-profile/owner-profile.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { AccountManagementPageComponent } from './account-management-page/account-management-page.component';

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
    path: "articles",
    loadChildren: "../app/article/article.module#ArticleModule"
  },
  {
    path: "register", // e.g.: architup.sk/register
    component: RegistrationComponent, //component for path
    canActivate:[NotAuth],
    data: {
      title: "Registration"
    }
  },
  {
    path: "profile/:id",
    component: ProfileComponent,
    //guard is applied to all routes we wish to protect (it's only for users with tokens - so logged)
    data: {
      title: "Profile"
    }
  },
  {
    path: "my-profile/:id",
    component: OwnerProfileComponent,
    canActivate: [AuthGuard],
    data: {
      title: "Profile"
    }
  },
  {
    path: "help",
    component: HelpPageComponent,
    data: {
      title: "Help"
    }
  },
  {
    path: "how-to-use",
    component: HowToUsePageComponent,
    data: {
      title: "How to use page"
    }
  },
  {
    path: "account-management",
    component: AccountManagementPageComponent,
    data: {
      title: "Account management page"
    }
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate:[NotAuth],
    data: {
      title: "Login"
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
  // page doesn't exist
  // {
  //   path: "**",
  //   component: ErrorsComponent,
  //   data: { error: 404 }
  // }
    {
    path: "**",
    redirectTo:"/home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
