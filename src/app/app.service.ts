import { throwError as observableThrowError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get<{}>(url)
      .pipe(tap(data => data), catchError(this.errorHandler));
  }
  post(url, postBody) {
    return this.http.post<{}>(url, postBody)
      .pipe(tap(data => data), catchError(this.errorHandler));
  }

  delete(url) {
    return this.http.delete<{}>(url)
      .pipe(tap(data => data), catchError(this.errorHandler));
  }
  put(url, postBody) {
    return this.http.put<{}>(url, postBody)
      .pipe(tap(data => data), catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error');
  }
}
