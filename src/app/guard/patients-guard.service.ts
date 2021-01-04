import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientsGuardService implements CanActivate {

  canRouteToPatiensPage: boolean = false;
  alertMassage: boolean = false;

  constructor(public router: Router) { }


  canActivate(): boolean {
    if (localStorage.getItem('accessToken')){
      return true
    }
    this.router.navigate(['/sign-in']);
    return false;
 

  }
}
  

