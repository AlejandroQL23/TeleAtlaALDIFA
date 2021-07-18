import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Client } from 'src/app/models/Client';

const endpoint = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private ClientSubject: BehaviorSubject<any>;
  public Client: Observable<any>;
  public ID;
  constructor(
    private router: Router,
    private http: HttpClient
    ) { 
      this.ClientSubject = new BehaviorSubject<Client>(JSON.parse(localStorage.getItem('Client')));
      this.Client = this.ClientSubject.asObservable();
    
  }

  login(client) {
    return this.http
      .post<any>( endpoint+`client/auth`,
        JSON.stringify(client),
        httpOptions
      )
      .pipe(
        map((userData) => {
          sessionStorage.setItem("email", client.email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("Id", userData.id);
          this.ClientSubject.next(sessionStorage.getItem(client.email));
          console.log(userData.name + " ANDO BISCANDO NOMBRE");
          this.ID = userData.id; 
          console.log(this.ID);
          return userData;
        })
      );
  }

  logOut() {
    sessionStorage.removeItem("email");
    this.Client = null;
  }



  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


//------------------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------

  getClients(): Observable<any> {
    return this.http
      .get(endpoint + "client/clients")
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list clients"))
      );
  }

  getClient(id): Observable<any> {
    return this.http
      .get(endpoint + "client/clients/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list clients"))
      );
  }


    addClient(clients, array): Observable<any> {
    console.log(clients);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'array': array.isArray,
      })
    };
    return this.http
      .post<any>(endpoint +  "client/add/", JSON.stringify(clients), httpOptions)
      .pipe(tap((clients) => console.log("added clients")),
        catchError(this.handleError<any>("addClient"))
      );
  }
  

  deleteClient(id): Observable<any> {
    return this.http
      .delete<any>(endpoint + "client/delete/" + id, httpOptions)
      .pipe(
        tap((_) => console.log(`deleted client id=${id}`)),
        catchError(this.handleError<any>("deleteClient"))
      );
  }

  updateClient(client, id): Observable<any> {
    return this.http
      .put(
        endpoint + "client/update/" + id,
        JSON.stringify(client),
        httpOptions
      )
      .pipe(
        tap((client) => console.log("updated client")),
        catchError(this.handleError<any>("updateClient"))
      );
  }

  //----------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------

  getComments(): Observable<any> {
    return this.http
      .get(endpoint + "comment/comments")
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list comment"))
      );
  }

  getComment(id): Observable<any> {
    return this.http
      .get(endpoint + "comment/comments/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list comment"))
      );
  }

  addComment(comment): Observable<any> {
    console.log(comment);
    return this.http
      .post<any>(endpoint + "comment/add/", JSON.stringify(comment), httpOptions)
      .pipe(
        tap((comment) => console.log("added comment")),
        catchError(this.handleError<any>("addComment"))
      );
  }

  deleteComment(id): Observable<any> {
    return this.http
      .delete<any>(endpoint + "comment/delete/" + id, httpOptions)
      .pipe(
        tap((_) => console.log(`deleted comment id=${id}`)),
        catchError(this.handleError<any>("deleteComment"))
      );
  }

  updateComment(comment, id): Observable<any> {
    return this.http
      .put(
        endpoint + "comment/update/" + id,
        JSON.stringify(comment),
        httpOptions
      )
      .pipe(
        tap((comment) => console.log("updated comment")),
        catchError(this.handleError<any>("updateComment"))
      );
  }


  getCommentById(id): Observable<any> {
    return this.http
      .get(endpoint + "comment/listById/" +id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list comment"))
      );
  }

  //----------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------

  getIssues(): Observable<any> {
    return this.http
      .get(endpoint + "issue/issues")
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list issue"))
      );
  }

  getIssue(id): Observable<any> {
    return this.http
      .get(endpoint + "issue/issues/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list issue"))
      );
  }

  addIssue(issue): Observable<any> {
    console.log(issue);
    return this.http
      .post<any>(endpoint + "issue/add/", JSON.stringify(issue), httpOptions)
      .pipe(
        tap((issue) => console.log("added issue")),
        catchError(this.handleError<any>("addIssue"))
      );
  }

  deleteIssue(id): Observable<any> {
    return this.http
      .delete<any>(endpoint + "issue/delete/" + id, httpOptions)
      .pipe(
        tap((_) => console.log(`deleted issue id=${id}`)),
        catchError(this.handleError<any>("deleteIssue"))
      );
  }

  updateIssue(issue, id): Observable<any> {
    return this.http
      .put(
        endpoint + "issue/update/" + id,
        JSON.stringify(issue),
        httpOptions
      )
      .pipe(
        tap((issue) => console.log("updated issue")),
        catchError(this.handleError<any>("updateIssue"))
      );
  }

  getIssuesById(id): Observable<any> {
    return this.http
      .get(endpoint + "issue/listById/" +id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list issue"))
      );
  }

  //----------------------------------------------------------------------------------------------------------
  //------------------------------------------------------------------------------------------------------------------

  getServices(): Observable<any> {
    return this.http
      .get(endpoint + "service/services")
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list service"))
      );
  }

  getService(id): Observable<any> {
    return this.http
      .get(endpoint + "service/services/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("list service"))
      );
  }

  addService(service): Observable<any> {
    console.log(service);
    return this.http
      .post<any>(endpoint + "service/add/", JSON.stringify(service), httpOptions)
      .pipe(
        tap((service) => console.log("added service")),
        catchError(this.handleError<any>("addService"))
      );
  }

  deleteService(id): Observable<any> {
    return this.http
      .delete<any>(endpoint + "service/delete/" + id, httpOptions)
      .pipe(
        tap((_) => console.log(`deleted service id=${id}`)),
        catchError(this.handleError<any>("deleteService"))
      );
  }

  updateService(service, id): Observable<any> {
    return this.http
      .put(
        endpoint + "service/update/" + id,
        JSON.stringify(service),
        httpOptions
      )
      .pipe(
        tap((service) => console.log("updated service")),
        catchError(this.handleError<any>("updateService"))
      );
  }
//--------------------------------------------------

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

  //------------------------------------------------------------------------------------


}
