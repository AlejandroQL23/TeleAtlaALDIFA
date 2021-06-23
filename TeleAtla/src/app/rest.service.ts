import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Supporter } from 'src/app/models/Supporter';

const endpoint = 'https://localhost:44382/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private SupporterSubject: BehaviorSubject<any>;
  public Supporter: Observable<any>;

  constructor(
    private router: Router,
    private http: HttpClient
    ) { 
      this.SupporterSubject = new BehaviorSubject<Supporter>(JSON.parse(localStorage.getItem('Supporter')));
      this.Supporter = this.SupporterSubject.asObservable();
    
  }




  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  login(supportere) {
    return this.http.post<any>(`https://localhost:44382/api/Supporter/PostAuthenticate/`, JSON.stringify(supportere), httpOptions)
    .pipe(
      map(userData => {
        sessionStorage.setItem("email", supportere.email);
        let tokenStr = "Bearer " + userData.token;
        sessionStorage.setItem("token", tokenStr);
        sessionStorage.setItem("Id", userData.id);
        this.SupporterSubject.next(sessionStorage.getItem(supportere.email));
        console.log(userData.name+"ANDO BISCANDO NOMBRE");
        return userData;
        }));
}
logOut() {
  sessionStorage.removeItem("email");
  this.Supporter=null;
}
//------------------------------------------------------------------------------------------------------------------


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
