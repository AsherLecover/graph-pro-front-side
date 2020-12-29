import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, switchMap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  test() {
    return this.http.get<any>(`${environment.apiUrl}/auth/test`)

  }

  signup(username: string, email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signup`, { username,email, password })
  }

  signin(email: string, password: string) {

    let headers = new HttpHeaders()
    headers = headers.set(`Authorization`,`Bearer ${localStorage.getItem("accessToken")}` )
    
     return  this.http.post<any>(`${environment.apiUrl}/auth/signin`,

    { headers , email, password }).pipe( 
      map ( (token) => {
        console.log('token !!!', token);
        localStorage.setItem('accessToken', token.accessToken); 
        return token
      } )
    )
  }
}
