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
  public ID;

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
        console.log(userData.name+" ANDO BISCANDO NOMBRE");
        this.ID=userData.id;
        console.log(this.ID);
        return userData;
        }));
}


logOut() {
  sessionStorage.removeItem("email");
  this.Supporter=null;
}
//------------------------------------------------------------------------------------------------------------------
getSupporters(): Observable<any> {
  return this.http.get(endpoint + 'Supporter/GetSupporters').pipe(
    map(this.extractData),
    catchError(this.handleError<any>('GetSupporters'))
    );
}

getSupporter(id): Observable<any> {
  return this.http.get(endpoint + 'Supporter/' + id).pipe(
    map(this.extractData),
    catchError(this.handleError<any>('getSupporter'))
    );
}

addSupporter (supporter): Observable<any> {
  console.log(supporter);
  return this.http.post<any>(endpoint + 'Supporter/', JSON.stringify(supporter), httpOptions).pipe(
    tap((student) => console.log('added supporter')),
    catchError(this.handleError<any>('addSupporter'))
  );
}

deleteSupporter (id): Observable<any> {
  return this.http.delete<any>(endpoint + 'Supporter/DeleteSupporter/' + id, httpOptions).pipe(
    tap(_ => console.log(`deleted supporter id=${id}`)),
    catchError(this.handleError<any>('deleteSupporter'))
  );
}

updateSupporter (supporter): Observable<any> {
  return this.http.put(endpoint + 'Supporter/PutSupporter',JSON.stringify(supporter), httpOptions).pipe(
    tap((student) => console.log('updated supporter')),
    catchError(this.handleError<any>('updateSupporter'))
  );
}

//------------------------------------------------------------------------------------------------------------------

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}


}



