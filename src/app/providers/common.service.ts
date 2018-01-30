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
export class CommonService {

  constructor(private http: HttpClient) { }

    getCategory(): Observable<any> {
    const url = `${ENV.mainApi}/categoryList`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`categoryList`)),
        catchError(this.handleError('categoryList', []))
      
    );
  }

    getServices(): Observable<any> {
    const url = `${ENV.mainApi}/servicesList`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`servicesList`)),
        catchError(this.handleError('servicesList', []))
      
    );
  }

   getCategoryWithServices(): Observable<any> {
    const url = `${ENV.mainApi}/categorywithservices`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`categorywithservices`)),
        catchError(this.handleError('categorywithservices', []))
      
    );
  }



   getAllSaloonList(): Observable<any> {
    const url = `${ENV.mainApi}/AllSaloonList`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`AllSaloonList`)),
        catchError(this.handleError('AllSaloonList', []))
      
    );
  }


   getAllSaloonData(id): Observable<any> {
    const url = `${ENV.mainApi}/saloonDetailsById/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`saloonDetailsById`)),
        catchError(this.handleError('saloonDetailsById', []))
      
    );
  }

  getAllServiceBySaloon(id): Observable<any> {
    const url = `${ENV.mainApi}/findAllServiceBySaloon/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`findAllServiceBySaloon`)),
        catchError(this.handleError('findAllServiceBySaloon', []))
      
    );
  }

  createAppointment(data): Observable<any> {
    const url = `${ENV.mainApi}/createAppointment`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
        tap(heroes => this.log(`createAppointment`)),
        catchError(this.handleError('createAppointment', []))
      
    );
  }


  updatePaymentStatusByCash(id): Observable<any> {
    const url = `${ENV.mainApi}/updatePaymentStatusByCash/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`updatePaymentStatusByCash`)),
        catchError(this.handleError('updatePaymentStatusByCash', []))
      
    );
  }

   deleteAppointmentById(id): Observable<any> {
    const url = `${ENV.mainApi}/deleteAppointmentById/${id}`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`deleteAppointmentById`)),
        catchError(this.handleError('deleteAppointmentById', []))
      
    );
  }

  allAppointment(id): Observable<any> {
    const url = `${ENV.mainApi}/allAppointment`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`allAppointment`)),
        catchError(this.handleError('allAppointment', []))
      
    );
  }

  homePageContent(): Observable<any> {
    const url = `${ENV.mainApi}/homePageContent`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`homePageContent`)),
        catchError(this.handleError('homePageContent', []))
      
    );
  }

  // -------------------------------------------------11-1-2018----------------------------------------------------

  contactUs(data): Observable<any> {
    const url = `${ENV.mainApi}/ContactUs`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
      tap(heroes => this.log(`ContactUs`)),
      catchError(this.handleError('ContactUs', []))
    );
  }

   faqList(): Observable<any> {
    const url = `${ENV.mainApi}/faqList`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`faqList`)),
        catchError(this.handleError('faqList', []))
      
    );
  }

  couponList(): Observable<any> {
    const url = `${ENV.mainApi}/couponCodes`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`couponCodes`)),
        catchError(this.handleError('couponCodes', []))
    );
  }

  sendCoupon(data): Observable<any> {
    const url = `${ENV.mainApi}/sendCoupons`;
    return this.http.post<any>(url,data,httpOptions)
    .pipe(
      tap(heroes => this.log(`SendCoupons`)),
      catchError(this.handleError('SendCoupons', []))
    );
  }

  getTrendingStyles(): Observable<any> {
    const url = `${ENV.mainApi}/trendingStyles`;
    return this.http.get<any>(url,httpOptions)
    .pipe(
        tap(heroes => this.log(`trendingStyles`)),
        catchError(this.handleError('trendingStyles', []))
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
