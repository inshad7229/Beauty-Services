import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {AddEmployee} from '../models/employee'
import  {ENV} from '../env'
  const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable()
export class SaloonService {

  constructor(private http: HttpClient) { }
  SaloonSignup(data): Observable<any> {
    const url = `${ENV.mainApi}/saloonRegistration`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`sallon Signup`)),
        catchError(this.handleError('sallon Signup', []))
      
    );
  }
   
   SaloonUpdate(data): Observable<any> {
    const url = `${ENV.mainApi}/saloonUpdate`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonUpdate`)),
        catchError(this.handleError('saloonUpdate', []))
      
    );
  }

  SaloonProfileUpdate(data): Observable<any> {
    const url = `${ENV.mainApi}/saloonProfileUpdate`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonProfileUpdate`)),
        catchError(this.handleError('saloonProfileUpdate', []))
      
    );
  }

  SaloonPasswordUpdate(data): Observable<any> {
    const url = `${ENV.mainApi}/saloonPassChange`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonPassChange`)),
        catchError(this.handleError('saloonPassChange', []))
      
    );
  }

   SaloonLogin(data): Observable<any> {
    const url = `${ENV.mainApi}/saloonLogIn`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonLogIn`)),
        catchError(this.handleError('saloonLogIn', []))
      
    );
  }


  SaloonForgotPassword(data): Observable<any> {
    const url = `${ENV.mainApi}/saloonForgotPassword`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonForgotPassword`)),
        catchError(this.handleError('saloonForgotPassword', []))
      
    );
  }

 AddEmployee(data): Observable<any> {
    const url = `${ENV.mainApi}/addEmployee`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`addEmployee`)),
        catchError(this.handleError('addEmployee', []))
      
    );
  }

   getEmployeeById(id): Observable<any> {
    const url = `${ENV.mainApi}/employeeList/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`getEmployeeById`)),
        catchError(this.handleError('getEmployeeById', []))
      
    );
  }

  deleteEmployeeById(id): Observable<any> {
    const url = `${ENV.mainApi}/deleteEmployee/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`deleteEmployee`)),
        catchError(this.handleError('deleteEmployee', []))
      
    );
  }

  updateEmployee(data): Observable<any> {
    const url = `${ENV.mainApi}/updateEmployee`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`updateEmployee`)),
        catchError(this.handleError('updateEmployee', []))
      
    );
  }


  //////////////////////services/////////////

   Addservices(data): Observable<any> {
    const url = `${ENV.mainApi}/servicesCreateBySaloon`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`servicesCreateBySaloon`)),
        catchError(this.handleError('servicesCreateBySaloon', []))
      
    );
  }

   getservicesById(id): Observable<any> {
    const url = `${ENV.mainApi}/servicesFindById/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`servicesFindById`)),
        catchError(this.handleError('servicesFindById', []))
      
    );
  }

  deleteservicesById(id): Observable<any> {
    const url = `${ENV.mainApi}/saloonDeleteId/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonDeleteId`)),
        catchError(this.handleError('saloonDeleteId', []))
      
    );
  }

  updateservices(data): Observable<any> {
    const url = `${ENV.mainApi}/saloonServicesUpdate`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonServicesUpdate`)),
        catchError(this.handleError('saloonServicesUpdate', []))
      
    );
  }


  getCategory(): Observable<any> {
    const url = `${ENV.mainApi}/categoryList`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`categoryList`)),
        catchError(this.handleError('categoryList', []))
      
    );
  }


  SaloonImageUpload(data): Observable<any> {
    const url = `${ENV.mainApi}/SaloonImageUpload`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`SaloonImageUpload`)),
        catchError(this.handleError('SaloonImageUpload', []))
      
    );
  }

  SaloonImageEdit(data): Observable<any> {
    const url = `${ENV.mainApi}/saloonImageEdit`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonImageEdit`)),
        catchError(this.handleError('saloonImageEdit', []))
      
    );
  }

    getSaloonProfileData(id): Observable<any> {
    const url = `${ENV.mainApi}/saloonDetailsById/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonDetailsById`)),
        catchError(this.handleError('saloonDetailsById', []))
      
    );
  }
   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('HeroService: ' + message);
    console.log(message)
  }
}
