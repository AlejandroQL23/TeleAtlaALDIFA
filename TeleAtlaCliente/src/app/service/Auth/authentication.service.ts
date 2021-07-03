import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  
  
  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('email')));
        this.user = this.userSubject.asObservable();
  }

  public get userValue(): any {
    return this.userSubject.value;
}


  authenticate(email, password) {
    return this.httpClient
      .post<any>(`https://localhost:44382/api/Supporter/PostAuthenticate`, { email, password })
      .pipe(
        map(userData => {
          sessionStorage.setItem("email", email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("Id", userData.id);
          this.userSubject.next(sessionStorage.getItem("email"));
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("email");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("email");
    this.user=null;
  }
}
