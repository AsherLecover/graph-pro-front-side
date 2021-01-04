import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { PatientsComponent } from './components/patients/patients.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WorkInProgressComponent } from './components/work-in-progress/work-in-progress.component';
import { PatientsGuardService} from './guard/patients-guard.service'


const routes: Routes = [
  { path:'sign-in',     component:SignInComponent},
  { path:'sign-up',     component:SignUpComponent},
  { path:'work-in-progress',     component:WorkInProgressComponent},
  { path:'patients',     component:PatientsComponent, canActivate:[PatientsGuardService]},
  { path:'',          redirectTo:'sign-in', pathMatch: 'full'},
  { path:'**',        redirectTo:'sign-in', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
