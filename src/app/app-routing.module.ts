//import  components we want to route
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent} from './user/registration/registration.component';
import { ProfileComponent} from './user/profile/profile.component';

//define routes
//path:'',   -page that loads when app loads - for Home page
const routes: Routes = [
  {
    path: 'register', // e.g.: architup.sk/register
    component: RegistrationComponent //component for path
  },
  {
    path: 'profile/:id',
    component: ProfileComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
