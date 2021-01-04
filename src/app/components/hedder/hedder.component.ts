import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servises/auth.service';

@Component({
  selector: 'hedder',
  templateUrl: './hedder.component.html',
  styleUrls: ['./hedder.component.css']
})
export class HedderComponent implements OnInit {
  username:string = ' GUEST'
  userLoggedIn: boolean;

  constructor(private authService: AuthService) {

    if(localStorage.getItem('accessToken')){
      this.authService.userLoggedIn$.next(true)
      this.userLoggedIn = true;
      console.log(this.authService.getDecodedAccessToken(localStorage.getItem('accessToken')).username);
      
      this.username =  this.authService.getDecodedAccessToken(localStorage.getItem('accessToken')).username;
    }
    this.authService.username$.subscribe( (username:string) => {
      this.username = username

    })

    this.authService.userLoggedIn$.subscribe( (userLoggedIn:boolean) => {
      this.userLoggedIn = userLoggedIn;
    })
   }

  ngOnInit(): void {
  }

  sighnOut(){
    localStorage.removeItem('accessToken')
    this.authService.username$.next('GUEST')
    this.authService.userLoggedIn$.next(false);
  }

}
