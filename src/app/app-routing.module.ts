//import  components we want to route
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent} from './user/registration/registration.component';
import { ProfileComponent} from './user/profile/profile.component';
import { LoginComponent} from './user/login/login.component';
//define routes 
const routes: Routes = [
  // {
  //   path: '', //-page that loads when app loads - for Home page
  //   component: HomeComponent,
  //   data:{
  //     title:'Home page'
  //   },
  {
    path: 'register', // e.g.: architup.sk/register
    component: RegistrationComponent, //component for path
    data:{
      title:'Registration'
    },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    data:{
      title:'Profile'
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    data:{
      title:'Login'
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
