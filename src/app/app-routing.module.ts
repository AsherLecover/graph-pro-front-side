import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  { path:'sign-in',     component:SignInComponent},
  { path:'sign-up',     component:SignUpComponent},
  { path:'',          redirectTo:'sign-in', pathMatch: 'full'},
  { path:'**',        redirectTo:'sign-in', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }