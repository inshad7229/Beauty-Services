import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import  {ENV} from '../env'
  const httpOptions = {
     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable()
export class CustomerService {

 constructor(private http: HttpClient) { }
  CustomerSignup(data): Observable<any> {
    const url = `${ENV.mainApi}/customerRegistration`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`CustomerSignup`)),
        catchError(this.handleError('CustomerSignup', []))
      
    );
  }

CustomerLogin(data): Observable<any> {
    const url = `${ENV.mainApi}/customerLogin`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`customerLogin`)),
        catchError(this.handleError('customerLogin', []))
      
    );
  }

  CustomerForgotPassword(data): Observable<any> {
    const url = `${ENV.mainApi}/customerForgotPassword`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`customerForgotPassword`)),
        catchError(this.handleError('customerForgotPassword', []))
      
    );
  }

  CustomerProfileUpdate(data): Observable<any> {
    const url = `${ENV.mainApi}/customerProfileUpdate`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`customerProfileUpdate`)),
        catchError(this.handleError('customerProfileUpdate', []))
      
    );
  }

  CustomerPasswordUpdate(data): Observable<any> {
    const url = `${ENV.mainApi}/customerPassChange`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`customerPassChange`)),
        catchError(this.handleError('customerPassChange', []))
      
    );
  }

  CustomerAppointment(id): Observable<any> {
    const url = `${ENV.mainApi}/appointmentByCustomer/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`appointmentByCustomer`)),
        catchError(this.handleError('appointmentByCustomer', []))
      
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
