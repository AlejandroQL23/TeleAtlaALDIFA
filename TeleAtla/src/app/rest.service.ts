import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";

import { Supporter } from "src/app/models/Supporter";
import { Supervisor } from "./models/Supervisor";

const endpoint = "https://localhost:44382/api/";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class RestService {
  private SupporterSubject: BehaviorSubject<any>;
  public Supporter: Observable<any>;
  public ID;
  public myName;
  public myNameSupervisor;

  private SuperSubject: BehaviorSubject<any>;
  public Super: Observable<any>;
  public IDsuper;

  constructor(private router: Router, private http: HttpClient) {
    this.SupporterSubject = new BehaviorSubject<Supporter>(
      JSON.parse(localStorage.getItem("Supporter"))
    );
    this.Supporter = this.SupporterSubject.asObservable();


    /////////////////////////////////////////////////////////////////////
    this.SuperSubject = new BehaviorSubject<Supervisor>( //AQUI HICE UN CAMBIO CUIDADO
      JSON.parse(localStorage.getItem("Supervisor"))
    );
    this.Super = this.SuperSubject.asObservable();
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  
  login(supportere) {
    console.log(JSON.stringify(supportere)+ " DESDE REST");
    return this.http
      .post<any>(
        `https://localhost:44382/api/Supporter/PostAuthenticate/`,
        JSON.stringify(supportere),
        httpOptions
        
      )
      
      .pipe(
        map((userData) => {
          sessionStorage.setItem("email", supportere.email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("Id", userData.id);
          this.SupporterSubject.next(sessionStorage.getItem(supportere.email));
          console.log(userData.name + " ANDO BISCANDO NOMBRE");
          this.ID = userData.id;
          this.myName = userData.name;
          console.log(this.ID + "mi id");
          console.log(this.myName + "mi no");
          return userData;
        })
      );
  }

  logOut() {
    sessionStorage.removeItem("email");
    this.Supporter = null;
  }

  loginS(supervisor) {
    console.log(JSON.stringify(supervisor)+ " DESDE REST");
    return this.http
      .post<any>(
        `https://localhost:44382/api/Supervisor/PostAuthenticate/`,
        JSON.stringify(supervisor),
        httpOptions
      )
      .pipe(
        map((userData) => {
          sessionStorage.setItem("email", supervisor.email);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          sessionStorage.setItem("Id", userData.id);
          this.SuperSubject.next(sessionStorage.getItem(supervisor.email));
          console.log(userData.name + " ANDO BISCANDO NOMBRE");
          this.IDsuper = userData.id;
          this.myNameSupervisor= userData.name;
          console.log(this.IDsuper);
          console.log(this.myNameSupervisor);
          return userData;
        })
      );
  }

  logOutS() {
    sessionStorage.removeItem("email");
    this.Super = null;
  }
  //------------------------------------------------------------------------------------------------------------------
  getSupporters(): Observable<any> {
    return this.http
      .get(endpoint + "Supporter/GetSupporters")
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("GetSupporters"))
      );
  }

  getSupporter(id): Observable<any> {
    return this.http
      .get(endpoint + "Supporter/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getSupporter"))
      );
  }

  addSupporter(supporter, array): Observable<any> {
    console.log(supporter);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'array': array.isArray,
      })
    };
    return this.http
      .post<any>(endpoint + "Supporter/", JSON.stringify(supporter), httpOptions)
      .pipe(tap((supporter) => console.log("added supporter")),
        catchError(this.handleError<any>("addSupporter"))
      );
  }

  deleteSupporter(id): Observable<any> {
    return this.http
      .delete<any>(endpoint + "Supporter/DeleteSupporter/" + id, httpOptions)
      .pipe(
        tap((_) => console.log(`deleted supporter id=${id}`)),
        catchError(this.handleError<any>("deleteSupporter"))
      );
  }

  updateSupporter(supporter, id): Observable<any> {
    return this.http
      .put(
        endpoint + "Supporter/" + id,
        JSON.stringify(supporter),
        httpOptions
      )
      .pipe(
        tap((supporter) => console.log("updated supporter")),
        catchError(this.handleError<any>("updateSupporter"))
      );
  }
  //------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------------
  getSupervisors(): Observable<any> {
    return this.http
      .get(endpoint + "Supervisor/GetSupervisor")
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getSupervisors"))
      );
  }

  getSupervisor(id): Observable<any> {
    return this.http
      .get(endpoint + "Supervisor/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getSupervisor"))
      );
  }

  addSupervisor(supervisor): Observable<any> {
    console.log(supervisor);
    return this.http
      .post<any>(
        endpoint + "Supervisor/",
        JSON.stringify(supervisor),
        httpOptions
      )
      .pipe(
        tap((supervisor) => console.log("added supervisor")),
        catchError(this.handleError<any>("addSupervisor"))
      );
  }

  deleteSupervisor(id): Observable<any> {
    return this.http
      .delete<any>(endpoint + "Supervisor/DeleteSupervisor/" + id, httpOptions)
      .pipe(
        tap((_) => console.log(`deleted supervisor id=${id}`)),
        catchError(this.handleError<any>("deleteSupervisor"))
      );
  }

  updateSupervisor(supervisor, id): Observable<any> {
    return this.http
      .put(
        endpoint + "Supervisor/" +id,
        JSON.stringify(supervisor),
        httpOptions
      )
      .pipe(
        tap((supervisor) => console.log("updated supervisor")),
        catchError(this.handleError<any>("updateSupervisor"))
      );
  }

  //------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------------
  getIssues(): Observable<any> {
    return this.http
      .get(endpoint + "Issues")
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getIssues"))
      );
  }

  getIssue(id): Observable<any> {
    return this.http
      .get(endpoint + "Issues/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getIssue"))
      );
  }

  getIssueBySupporter(id): Observable<any> {
    return this.http
      .get(endpoint + "Issues/GetIssueBySupport/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getIssueBySupporter"))
      );
  }

  deleteIssue(id): Observable<any> {
    return this.http
      .delete<any>(endpoint + "Issues/" + id, httpOptions)
      .pipe(
        tap((_) => console.log(`deleted issue id=${id}`)),
        catchError(this.handleError<any>("deleteIssue"))
      );
  }

  // updateIssue(issue): Observable<any> {
  //   return this.http
  //     .put(endpoint + "Issues/", JSON.stringify(issue), httpOptions)
  //     .pipe(
  //       tap((issue) => console.log("updated issue")),
  //       catchError(this.handleError<any>("updateIssue"))
  //     );
  // }


  updateIssue(issue, id): Observable<any> {
    return this.http
      .put(
        endpoint + "Issues/" +id,
        JSON.stringify(issue),
        httpOptions
      )
      .pipe(
        tap((issue) => console.log("updated issue")),
        catchError(this.handleError<any>("updateIssue"))
      );
  }


  getClientDataIssue(id): Observable<any> {
    return this.http
      .get(endpoint + "Issues/informationFromClient/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getClientDataIssue"))
      );
  }


  updateIssueStart(issue): Observable<any> {
    return this.http
      .put(endpoint + "Issues/putUpdateIssueStartFromClient", JSON.stringify(issue), httpOptions)
      .pipe(
        tap((issue) => console.log("updated issue")),
        catchError(this.handleError<any>("updateIssue"))
      );
  }


  updateIssueEnd(issue): Observable<any> {
    return this.http
      .put(endpoint + "Issues/putUpdateIssueEndFromClient", JSON.stringify(issue), httpOptions)
      .pipe(
        tap((issue) => console.log("updated issue")),
        catchError(this.handleError<any>("updateIssueEnd"))
      );
  }

  //------------------------------------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------------------------------------
  getNotes(): Observable<any> {
    return this.http
      .get(endpoint + "Notes/GetNotes")
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getNotes"))
      );
  }

  getNote(id): Observable<any> {
    return this.http
      .get(endpoint + "Notes/" + id)
      .pipe(
        map(this.extractData),
        catchError(this.handleError<any>("getNote"))
      );
  }

  addNote(note): Observable<any> {
    console.log(note);
    return this.http
      .post<any>(endpoint + "Notes/", JSON.stringify(note), httpOptions)
      .pipe(
        tap((note) => console.log("added note")),
        catchError(this.handleError<any>("addNote"))
      );
  }

  deleteNote(id): Observable<any> {
    return this.http
      .delete<any>(endpoint + "Notes/DeleteNotes/" + id, httpOptions)
      .pipe(
        tap((_) => console.log(`deleted note id=${id}`)),
        catchError(this.handleError<any>("deleteNote"))
      );
  }

  updateNote(issue): Observable<any> {
    return this.http
      .put(endpoint + "Notes/PutNotes", JSON.stringify(issue), httpOptions)
      .pipe(
        tap((issue) => console.log("updated note")),
        catchError(this.handleError<any>("updateNote"))
      );
  }

  //------------------------------------------------------------------------------------------------------------------

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
